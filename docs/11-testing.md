# Testing

## What gets tested

Vitest, on the code where being wrong costs money, loses an order, or leaks
data. That is a small, specific set of files — and it is not the UI.

| Unit | Why it is tested |
|---|---|
| `lib/pricing.ts` | Wrong totals cost real money and destroy trust in one step. |
| `lib/orders/status.ts` | An illegal transition means dispatching an unpaid order or cancelling a shipped one. |
| `lib/orders/schema.ts` | Bad addresses become failed deliveries. The honeypot lives here. |
| `lib/orders/code.ts` | Collisions or ambiguous characters break phone conversations. |
| `POST /api/orders` | The trust boundary. Everything hostile arrives here. |

## What is not tested, on purpose

- **Visual appearance.** Snapshot tests on markup break on every design tweak
  and catch nothing that matters. Layout is checked by looking at it.
- **The Supabase client.** Testing that a library inserts a row tests the
  library. `service.ts` is thin on purpose so there is little to test.
- **Framer Motion.** Animation correctness is not unit-testable in any useful way.
- **Third-party rendering.** Next's routing is Next's problem.

Adding tests for these would raise the coverage number and lower the value of
the suite.

## The cases that matter

### `lib/pricing.ts`

```
✓ single unit at ₹222 is 22200 paise
✓ quantity 3 is 66600 paise, exactly
✓ quantity 0 and negative quantity throw
✓ quantity above the cap (10) throws
✓ totals stay integers — no float drift at any quantity 1..10
✓ shipping of 0 does not change the total
✓ total always equals subtotal + shipping
```

The float-drift case is the one worth writing by hand. It is the classic money
bug and it only appears in production, on an invoice, in front of a customer.

### `lib/orders/status.ts`

```
✓ new -> accepted, new -> cancelled allowed
✓ accepted -> payment_received, accepted -> cancelled allowed
✓ payment_received -> relayed allowed
✓ relayed -> shipped allowed
✓ shipped -> delivered allowed
✓ shipped -> cancelled REJECTED        (it is a return, not a cancellation)
✓ delivered -> anything REJECTED       (terminal)
✓ cancelled -> anything REJECTED       (terminal)
✓ new -> shipped REJECTED              (no skipping states)
✓ any status -> itself REJECTED        (a no-op would still write an event)
```

Written as an exhaustive matrix over every status pair, so a new status added
later cannot silently be legal from everywhere.

### `lib/orders/schema.ts`

```
✓ a complete valid order parses
✓ phone: 9876543210, +919876543210, 91 9876543210 all accepted
✓ phone: 1234567890 rejected (Indian mobiles start 6-9)
✓ phone: 987654321 rejected (9 digits)
✓ pincode: 560001 accepted; 56001, 5600012, 060001 rejected
✓ email absent is valid; email present and malformed is rejected
✓ name shorter than 2 or longer than 80 rejected
✓ quantity outside 1..10 rejected
✓ colour id not in product.colors rejected
✓ honeypot field non-empty is flagged
✓ leading and trailing whitespace is trimmed before validation
```

### `POST /api/orders`

```
✓ valid body returns 201 with a code matching /^EF-[2-9A-HJKMNP-Z]{6}$/
  (the alphabet excludes I, L and O — see 03-data-model.md)
✓ creates exactly one order, one item, one event
✓ the created event has from_status null and to_status 'new'
✓ a body containing a price field is ignored — total comes from product.ts
✓ a body claiming total 1 paise still produces the correct total
✓ invalid body returns 400 with per-field errors
✓ honeypot filled returns 202 and writes NOTHING to the database
✓ exceeding the rate limit returns 429
✓ order codes are unique across 1000 sequential creations
```

The two lines that matter most:

- **A body containing a price field is ignored.** This is the whole security
  model of the order route, asserted directly.
- **Honeypot writes nothing.** A honeypot that returns success but still saves
  the row is worse than no honeypot, because it looks like it works.

## Running

```bash
pnpm test          # once
pnpm test:watch    # during development
```

Tests sit beside their subject: `lib/pricing.test.ts` next to `lib/pricing.ts`.
No parallel `__tests__` tree — a test that is hard to find is a test that stops
being maintained.

## Manual test script

Some things only a person can check. Run this before every deploy that touches
the order flow.

1. Place an order with a real address. Confirm the code appears and the
   confirmation says **nothing has been charged**.
2. Reload `/order/[code]`. The status must persist.
3. Open the same URL in a private window. It must still render — the code is the
   capability, and if it does not work here it will not work for a customer.
4. Guess a neighbouring code. It must 404, not leak.
5. Visit `/admin/orders` signed out. It must redirect to login.
6. Sign in, move the order through every status. Each transition writes an
   event; the customer page reflects each change.
7. Submit the form with an empty required field. Errors must be announced,
   attached to their inputs, and describe the fix.
8. Do the whole thing again on a phone, on mobile data, one-handed. That is how
   a ₹222 purchase is actually made.
9. Turn on OS-level reduce-motion and reload. The scroll sequence must render as
   static frames with its text intact, and nothing may be pinned.
10. Tab through the whole page. Every interactive element must show a visible
    focus ring, in a sensible order.
