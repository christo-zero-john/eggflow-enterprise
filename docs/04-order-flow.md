# Order flow and operations runbook

Payment is manual. That makes this document operationally important rather than
merely descriptive — the system depends on a person doing these steps.

## The flow end to end

```
CUSTOMER                        SITE                          YOU
   |                             |                             |
1. taps Order now ------------> /order                         |
2. fills form ---------------> POST /api/orders                |
                                | validate, price, persist     |
3. sees confirmation <--------- /order/EF-7QK4M2               |
   "we will contact you"        |                              |
                                |  status: new ------------> 4. see it in /admin/orders
                                |                              |
5. gets your call/WhatsApp <----|--------------------------- you contact them
                                |  status: accepted <------- 6. mark accepted
                                |                              |
7. pays by UPI ---------------->|--------------------------- 8. verify, paste txn id
                                |  status: payment_received    |
                                |                           9. place order with supplier
                                |  status: relayed <---------- paste supplier ref
                                |                              |
                                |  status: shipped <-------- 10. paste tracking number
11. receives it                 |  status: delivered <------ 12. mark delivered
```

## What the customer sees

### The form — `/order`

One screen, no steps, no account.

| Field | Required | Validation |
|---|---|---|
| Full name | yes | 2–80 chars |
| Phone | yes | Indian mobile: 10 digits starting 6–9, optional +91 |
| Email | no | valid if present |
| Address line 1 | yes | 4–120 chars |
| Address line 2 | no | |
| Landmark | no | |
| City | yes | |
| State | yes | select, 36 states and UTs |
| Pincode | yes | exactly 6 digits, not starting 0 |
| Colour | yes | grey or white |
| Quantity | yes | 1–10 |
| Note | no | 500 chars |
| `company` | — | **honeypot.** Hidden. Non-empty means a bot. |

Email is optional and phone is required, because the follow-up is a phone call
or WhatsApp. Making email mandatory would cost real orders for no operational
gain.

### The confirmation — `/order/[code]`

The wording here is the most important copy on the site:

> ## Order request received
> ### EF-7QK4M2
>
> **Nothing has been charged.** This is a request, not a completed purchase.
>
> We will contact you on **+91 98765 43210** within one working day to confirm
> availability and arrange payment. Once payment is confirmed, your rack is
> dispatched.
>
> Keep this code — it is how you can check the status of this order, and how we
> will refer to it when we call.

Then: items, quantity, total, delivery address, and a link back to the page.

**Why it is worded that way.** A form that looks like a checkout but takes no
money leaves people genuinely unsure whether they have bought something. Saying
"nothing has been charged" in bold, unprompted, converts confusion into
confidence. It also pre-empts the single most likely support message.

### Checking status later

The same URL. The customer bookmarks it or finds it in your message. Status
renders as a plain sentence, never as jargon:

| Status | Shown to the customer |
|---|---|
| `new` | We have your request and will call you shortly. |
| `accepted` | Confirmed. We are arranging payment with you. |
| `payment_received` | Payment received. Preparing your dispatch. |
| `relayed` | Handed over for dispatch. |
| `shipped` | On its way. Tracking: `<number>` via `<courier>`. |
| `delivered` | Delivered. |
| `cancelled` | Cancelled. Contact us if this is unexpected. |

## Your runbook

### Daily: work the queue

Open `/admin/orders`. It is sorted with `new` first, oldest at the top. Anything
in `new` older than 24 hours is highlighted, because that is the promise on the
confirmation page.

### Step 4 → 5: contacting the customer

Phone first, WhatsApp if unanswered. What to confirm, in this order:

1. They placed the order and still want it.
2. The address and pincode as shown.
3. Availability and the honest dispatch window from your supplier.
4. The total, including delivery if you charge it.
5. Send the UPI ID or QR. Ask them to use the order code as the payment note.

Then mark **accepted** in `/admin/orders/[id]`, with a note recording what was
agreed. If they decline, mark **cancelled** with the reason. The reason matters:
after twenty orders, the cancellation notes tell you exactly what is broken.

### Step 7 → 8: recording payment

Verify the money has actually arrived in your account. Not a screenshot, not a
"sent it" — the credit in your app.

Paste the UPI transaction reference into `payment_ref` and mark
**payment_received**. That field is the entire audit trail for a payment that
happened outside the system, so it is not optional.

### Step 9: relaying to the supplier

The order detail page renders a copy-ready block:

```
EggFlow order EF-7QK4M2
Item:     EggFlow 4-Tier Egg Rack — Grey × 1
Ship to:  Full Name
          Address line 1
          Address line 2, Landmark
          City, State 560001
Phone:    +91 98765 43210
```

Copy it, place the order with your supplier, paste their reference into
`supplier_ref`, mark **relayed**.

### Step 10: shipping

When the supplier gives you a tracking number, paste it with the courier name
and mark **shipped**. Both appear on the customer's `/order/[code]` page
immediately, so they can stop asking.

Message the customer with the code and tracking number.

### Step 12: delivered

Mark it. It clears the queue and, more importantly, gives you a real
order-to-delivery time. After ten orders you will know your actual delivery
window and can put a truthful number on `/shipping` instead of a range.

## Failure cases

| Situation | What to do |
|---|---|
| Customer never answers | Two attempts over two days, then `cancelled` with a note. Do not leave it in `new`. |
| Customer pays before you call | Fine. `accepted` → `payment_received`, with the txn ref. Never skip states in the database. |
| Supplier is out of stock | Tell them immediately, refund in full the same day if paid, `cancelled` with the reason. |
| Wrong address discovered late | Before `relayed`: edit and note it. After: contact the courier; if it fails, treat as a return. |
| Package arrives damaged | Photos from the customer, replacement or refund, `cancelled` with the reason and a note against the supplier. Track this — it is how you find out whether the supplier is worth keeping. |
| Duplicate order from the same person | Confirm on the call, `cancelled` on the duplicate. The rate limiter reduces this but does not prevent it. |
| Obviously fake order | `cancelled`. If a pattern appears, phone OTP is the escalation. |

## Refunds

Manual, because payment is manual. UPI back to the same number that paid,
same-day where possible, with the transaction reference recorded in
`admin_note`. `/refunds` states this and must stay true.

## The numbers worth watching

From `orders` and `order_events`, without any analytics tooling:

- Orders in `new` older than 24 hours — the promise you are breaking.
- `cancelled` as a share of all orders — if above roughly 30%, either the
  contact step is too slow or you have a junk-order problem.
- Median `new` → `payment_received` time — the real cost of manual payment, and
  the number that tells you when Razorpay is worth the work.
- Cancellation reasons, read as text. At this volume, reading them beats
  counting them.
