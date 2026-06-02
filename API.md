# StyleAfrique API Documentation v1.0

Base URL: `https://api.styleafrique.com/v1`
Auth: `Authorization: Bearer <jwt_token>`

---

## AUTH ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user (customer or business) |
| POST | `/auth/login` | Login with email + password |
| POST | `/auth/google` | OAuth login via Google |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Invalidate refresh token |
| POST | `/auth/forgot-password` | Request password reset email |
| POST | `/auth/reset-password` | Reset password with token |

---

## BUSINESS ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/businesses` | List businesses (with geo, filter, sort) |
| GET | `/businesses/:id` | Get business profile |
| POST | `/businesses` | Create business (auth: business owner) |
| PUT | `/businesses/:id` | Update business profile |
| GET | `/businesses/:id/services` | List services for a business |
| POST | `/businesses/:id/services` | Add service |
| PUT | `/businesses/:id/services/:serviceId` | Update service |
| DELETE | `/businesses/:id/services/:serviceId` | Delete service |
| GET | `/businesses/:id/staff` | List staff members |
| POST | `/businesses/:id/staff` | Add staff member |
| GET | `/businesses/:id/availability` | Get available slots |
| GET | `/businesses/:id/reviews` | Get reviews |
| GET | `/businesses/:id/analytics` | Get dashboard analytics (auth: owner) |

### Query Parameters for `/businesses`
```
?city=nairobi
&category=barbershop
&lat=-1.2921&lng=36.8219&radius=5
&sort=rating|distance|price
&open=true
&badge=verified|premium|elite
&min_price=500&max_price=5000
&page=1&limit=20
```

---

## APPOINTMENTS ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/appointments` | Create booking |
| GET | `/appointments` | List user's appointments |
| GET | `/appointments/:id` | Get appointment details |
| PUT | `/appointments/:id/confirm` | Confirm appointment (business) |
| PUT | `/appointments/:id/cancel` | Cancel appointment |
| PUT | `/appointments/:id/complete` | Mark as completed (business) |
| POST | `/appointments/:id/review` | Submit review |

### Book Appointment Request
```json
{
  "business_id": "uuid",
  "service_id": "uuid",
  "staff_id": "uuid | null",
  "date": "2026-06-15",
  "start_time": "10:00",
  "notes": "Optional notes",
  "payment_method": "mpesa | card | airtel"
}
```

---

## PAYMENTS ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/mpesa/stk-push` | Initiate M-Pesa STK push |
| POST | `/payments/mpesa/callback` | M-Pesa callback (Safaricom → server) |
| POST | `/payments/stripe/intent` | Create Stripe PaymentIntent |
| GET | `/payments/:id/status` | Check payment status |
| POST | `/payments/:id/refund` | Process refund (admin) |

---

## LOYALTY ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/loyalty/balance` | Get user's points balance |
| GET | `/loyalty/history` | Points transaction history |
| GET | `/loyalty/rewards` | Available rewards |
| POST | `/loyalty/redeem` | Redeem a reward |
| POST | `/loyalty/referral` | Submit referral code |
| GET | `/loyalty/referral-code` | Get user's referral code |

---

## SEARCH ENDPOINT

```
GET /search?q=barber&city=nairobi&category=barbershop&lat=...&lng=...
```

Returns unified results: businesses, services, and professionals ranked by relevance + distance.

---

## ADMIN ENDPOINTS (auth: admin role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | List all users |
| PUT | `/admin/users/:id/suspend` | Suspend user |
| GET | `/admin/businesses/pending` | Pending verifications |
| PUT | `/admin/businesses/:id/verify` | Approve verification |
| PUT | `/admin/businesses/:id/badge` | Set badge level |
| GET | `/admin/analytics/platform` | Platform-wide stats |
| POST | `/admin/notifications/broadcast` | Send push to all users |

---

## WEBHOOK EVENTS

| Event | Trigger |
|-------|---------|
| `appointment.confirmed` | Business confirms booking |
| `appointment.completed` | Service marked complete |
| `appointment.cancelled` | Either party cancels |
| `payment.succeeded` | Payment confirmed |
| `payment.failed` | Payment declined |
| `business.verified` | Admin approves verification |
| `review.created` | Customer leaves review |
