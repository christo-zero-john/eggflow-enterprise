# Setup and deployment

## Local development

```bash
pnpm install
cp .env.example .env.local     # then fill it in, see below
pnpm dev                       # http://localhost:3000
```

Node 20+. This repo uses pnpm; a `pnpm-workspace.yaml` is present.

## Environment variables

`.env.example` is committed. `.env.local` is git-ignored and never committed.

```bash
# Supabase — project settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# SERVER ONLY. Bypasses RLS. Never prefix with NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Canonical origin — drives metadataBase, sitemap.xml, robots.txt, OG tags
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# The single account permitted into /admin
ADMIN_EMAIL=you@yourdomain.com
```

**On the service-role key.** It bypasses every RLS policy. If it reaches the
browser, every order in the database is readable by anyone. Two safeguards are
built in: it has no `NEXT_PUBLIC_` prefix, so Next will not inline it into client
code; and `src/lib/supabase/admin.ts` begins with `import "server-only"`, so
importing it from a client component fails the build rather than shipping the
key.

## Supabase setup

1. Create a project. Choose a region close to your customers —
   `ap-south-1` (Mumbai) for India.
2. SQL Editor → paste the schema from
   [03-data-model.md](03-data-model.md) → run. It creates the enum, three
   tables, indexes, the `updated_at` trigger, and enables RLS.
3. Confirm RLS: Table Editor → each table shows "RLS enabled" with **no
   policies**. That is correct. No policies plus RLS on means the anon key is
   denied everything.
4. Authentication → Users → **Add user**, using `ADMIN_EMAIL`. Set a strong
   password. This is the only account.
5. Authentication → Providers → disable **email signups**. Otherwise anyone can
   create an account, and `/admin` is gated on being authenticated.
6. Copy the URL, anon key and service-role key into `.env.local`.

### A note on step 5

It is the easiest thing on this list to skip and the most expensive to skip. If
public signup is on, `/admin` is protected by nothing more than knowing the URL.

## Deploying to Vercel

1. Push to GitHub.
2. Import the repository in Vercel. Framework is detected as Next.js; no build
   settings to change.
3. Add all five environment variables under Settings → Environment Variables,
   for **Production**, **Preview** and **Development**.
4. Set `NEXT_PUBLIC_SITE_URL` to the production origin — the real one, not the
   `*.vercel.app` preview URL. Canonicals, `sitemap.xml`, `robots.txt` and OG
   tags all derive from it, and a wrong value here quietly poisons SEO.
5. Add the custom domain and let Vercel issue the certificate.
6. Redeploy after adding the variables. Vercel does not apply new env vars to an
   existing build.

## Verifying a deploy

```bash
pnpm build      # must pass with no type errors
pnpm lint
pnpm test
```

Then, against the deployed URL:

- [ ] Home, product, how-it-works, faq, contact all render
- [ ] `/privacy`, `/terms`, `/shipping`, `/refunds` render real content
- [ ] Submitting the order form returns a code and redirects to `/order/[code]`
- [ ] That order appears in Supabase, with `order_items` and one `order_events` row
- [ ] `/order/[code]` renders the correct status and address
- [ ] `/admin/orders` redirects to login when signed out
- [ ] Signing in as `ADMIN_EMAIL` reaches the queue
- [ ] A status transition writes a new `order_events` row
- [ ] `/sitemap.xml` and `/robots.txt` use the real origin
- [ ] Lighthouse: performance and accessibility both ≥ 95 on mobile
- [ ] No marketplace is named anywhere on the site

## Go-live checklist

Beyond the technical checks, from
[08-legal-and-compliance.md](08-legal-and-compliance.md):

- [ ] Real contact email, phone and postal address in `site.ts`
- [ ] Manufacturer / packer details from the supplier
- [ ] `dimensionsCm` and `weightG` measured and filled in `product.ts`
- [ ] Real photography in `public/images/product/`, placeholders deleted
- [ ] OG image renders correctly — test with a real share
- [ ] A test order placed end to end, through to `delivered`, by you
- [ ] Supplier has confirmed the relay channel and a realistic dispatch window

## Operating it

**Backups.** Supabase free tier keeps daily backups for a limited window. Orders
are the only irreplaceable data here. Export monthly:

```sql
select o.*, i.*
from orders o
join order_items i on i.order_id = o.id
order by o.created_at desc;
```

Download as CSV, keep it somewhere that is not Supabase.

**Data retention.** `/privacy` states 3 years from delivery. That is a promise,
so it needs honouring — a quarterly deletion of `delivered` and `cancelled`
orders older than 3 years, run by hand, recorded in a note.

**When something breaks.** Vercel → Deployments → Functions for server logs.
Supabase → Logs for database errors. The most likely failure is a missing or
stale environment variable after a redeploy.
