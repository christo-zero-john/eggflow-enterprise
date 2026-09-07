# Data model

Postgres, on Supabase. Three tables. Money in integer paise.

## Principles

1. **Money is `integer` paise, never `float` or `numeric`.** ₹222 is `22200`.
   Floats accumulate error and Postgres `numeric` invites accidental float
   arithmetic in JavaScript. Formatting happens at the edge, in `ui/Money`.
2. **Price is copied onto the order, not referenced.** `order_items` stores
   `unit_price_paise` as it was at the moment of ordering. Changing the price in
   `product.ts` next month must not rewrite what a customer was quoted in
   September.
3. **History is append-only.** `orders.status` is the current state;
   `order_events` is how it got there. Events are never updated or deleted.
4. **The anon key can do nothing.** Every write goes through a server route
   holding the service-role key. RLS denies the anon role outright.

## Schema

```sql
-- ---------------------------------------------------------------------------
-- enums
-- ---------------------------------------------------------------------------
create type order_status as enum (
  'new',               -- request submitted, nobody has looked at it
  'accepted',          -- we confirmed availability and contacted the customer
  'payment_received',  -- money is in our account, recorded manually
  'relayed',           -- passed to the supplier for dispatch
  'shipped',           -- supplier has handed it to a courier
  'delivered',
  'cancelled'
);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
create table orders (
  id                uuid primary key default gen_random_uuid(),
  code              text not null unique,          -- EF-7QK4M2, shown to the customer
  status            order_status not null default 'new',

  -- contact
  customer_name     text not null,
  phone             text not null,                 -- E.164-ish, +91XXXXXXXXXX
  email             text,                          -- optional

  -- shipping address, denormalised on purpose: one address per order, forever
  address_line1     text not null,
  address_line2     text,
  city              text not null,
  state             text not null,
  pincode           text not null,                 -- 6 digits, stored as text
  landmark          text,

  -- money, in paise
  subtotal_paise    integer not null check (subtotal_paise >= 0),
  shipping_paise    integer not null default 0 check (shipping_paise >= 0),
  total_paise       integer not null check (total_paise >= 0),
  currency          text not null default 'INR',

  -- operations
  customer_note     text,                          -- written by the customer
  admin_note        text,                          -- internal, never shown to them
  payment_ref       text,                          -- UPI txn id, typed in by hand
  supplier_ref      text,                          -- the supplier's own order number
  tracking_number   text,
  courier           text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index orders_status_created_idx on orders (status, created_at desc);
create index orders_code_idx           on orders (code);
create index orders_phone_idx          on orders (phone);

-- ---------------------------------------------------------------------------
-- order_items
-- One row today. An array from day one so a cart is additive, not a migration.
-- ---------------------------------------------------------------------------
create table order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references orders(id) on delete cascade,
  sku               text not null,                 -- 'eggflow-4tier'
  product_name      text not null,                 -- copied at order time
  colour_id         text not null,                 -- 'grey' | 'white'
  colour_label      text not null,
  unit_price_paise  integer not null check (unit_price_paise >= 0),
  quantity          integer not null check (quantity > 0 and quantity <= 10),
  line_total_paise  integer not null check (line_total_paise >= 0)
);

create index order_items_order_idx on order_items (order_id);

-- ---------------------------------------------------------------------------
-- order_events — append-only audit trail
-- ---------------------------------------------------------------------------
create table order_events (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders(id) on delete cascade,
  from_status   order_status,                      -- null on creation
  to_status     order_status not null,
  actor         text not null,                     -- 'customer' | 'admin:<email>' | 'system'
  note          text,
  created_at    timestamptz not null default now()
);

create index order_events_order_idx on order_events (order_id, created_at);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger orders_touch_updated_at
  before update on orders
  for each row execute function touch_updated_at();
```

## Row Level Security

```sql
alter table orders       enable row level security;
alter table order_items  enable row level security;
alter table order_events enable row level security;

-- No policies are created for the anon or authenticated roles.
-- With RLS enabled and no policy, every request through the anon key is denied.
-- The service-role key bypasses RLS and is used only in server code that has
-- already authorised the caller.
```

This is intentionally the most restrictive posture available. The browser never
reads or writes an order directly — `/order/[code]` is a server component and
`/admin` is session-gated — so there is nothing to loosen.

If a future feature needs browser-side reads, add a policy scoped to `code`
rather than opening the table.

## Order codes

Format `EF-` + 6 characters from `23456789ABCDEFGHJKMNPQRSTUVWXYZ` — digits and
letters that cannot be confused when read aloud over a phone call, which is
exactly how these will be used. `0/O` and `1/I/L` are excluded.

That is 31^6 ≈ 887 million combinations. Uniqueness is enforced by the unique
constraint, and `service.create` retries on collision.

Codes are random, not sequential. A sequential code would let anyone read every
order by counting, and would leak total order volume to competitors.

## Status machine

```
                 ┌──────────────────────────────────────┐
                 v                                      │
new ──> accepted ──> payment_received ──> relayed ──> shipped ──> delivered
 │          │                │                │
 └──────────┴────────────────┴────────────────┴──────> cancelled
```

Encoded in `lib/orders/status.ts`:

```ts
export const TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  new:              ["accepted", "cancelled"],
  accepted:         ["payment_received", "cancelled"],
  payment_received: ["relayed", "cancelled"],
  relayed:          ["shipped", "cancelled"],
  shipped:          ["delivered"],
  delivered:        [],
  cancelled:        [],
};
```

Two rules worth stating:

- **`shipped` cannot be cancelled.** Once it is with a courier it is a return,
  not a cancellation, and those are different processes with different money.
- **`delivered` and `cancelled` are terminal.** Correcting a mistake means a new
  order, so the audit trail stays honest.

## What is deliberately not modelled

| Not here | Why |
|---|---|
| `customers` table | No accounts. An order carries its own contact details. |
| `products` table | One SKU, and `product.ts` is the source of truth. A table would create a second one. |
| `inventory` | Supplier drop-ships; we hold no stock and cannot count it. |
| `payments` table | No gateway. `payment_ref` on the order is enough for a manual UPI reference. When Razorpay lands, this becomes a real table. |
| `addresses` table | One address per order, never reused, because there are no accounts. |
