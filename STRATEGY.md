# StyleAfrique — Complete Platform Strategy

> Africa's Beauty Marketplace · Build Document v1.0 · June 2026

---

## 1. BRAND STRATEGY

### Name Analysis & Recommendation

| Name | Score | Reason |
|------|-------|--------|
| **HairAfrique** | 6/10 | Too narrow — "Hair" excludes nails, makeup, grooming |
| **StyleAfrique** | 8/10 | Clear category, pan-African, scalable beyond hair |
| **Zuri** ⭐ | 9.5/10 | Swahili "beautiful/wonderful", one word, global appeal, clean domain |
| **AfroGlam** | 7.5/10 | Energetic, but limits perception to Afrocentric styles |
| **Pamoja Beauty** | 7/10 | "Together" — great community feel, slightly long |

### **Recommended Primary Name: StyleAfrique**
**Tagline:** *Africa's Beauty Marketplace*
**Alt tagline:** *Find. Book. Glow.*
**Domain targets:** styleafrique.com · styleafrique.africa · styleafrique.co.ke

### **Future Rebrand Candidate: "Zuri"**
When scaling beyond East Africa, consider rebranding to `Zuri` — cleaner, more global, already used in app store descriptions. Domain: `zuri.africa`, `getzuri.com`, `zuribeauty.com`.

---

## 2. LOGO DESIGN CONCEPTS

### Concept 1 — Premium Luxury
- **Colors:** Gold `#C9A84C`, Deep Black `#0A0A0A`, Ivory `#F0EDE8`
- **Elements:** Scissors integrated into letter "S", Playfair Display serif wordmark, thin gold border
- **Feel:** Timeless. High-end. The Rolls-Royce of beauty booking.
- **Use:** Hero branding, business cards, luxury tier badge

### Concept 2 — Modern Tech
- **Colors:** Gradient emerald `#1A7A4A→#22A863`, Dark charcoal `#111111`, White
- **Elements:** Map pin fused with hair strand, rounded sans-serif (Inter), mobile-first icon
- **Feel:** Smart. Fast. Digital-native.
- **Use:** App icon, tech-forward contexts, partnership decks

### Concept 3 — Global Marketplace
- **Colors:** Gold + Black only (maximum contrast, WCAG AAA)
- **Elements:** Abstract "S" mark — a single flowing curve suggesting a hair strand and a location pin
- **Feel:** Minimal. Confident. App-store ready.
- **Use:** Primary app icon (1024×1024), favicon, social avatar

---

## 3. PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Problem Statement
Africa's beauty industry generates $5B+ annually yet remains almost entirely offline. Consumers waste 45+ minutes per week calling salons, facing no-shows, and discovering bad services through word-of-mouth. Professionals lose 30–40% of potential revenue from missed bookings and no digital presence.

### Solution
StyleAfrique is a two-sided marketplace with:
- **Customer side:** Discover → Book → Pay → Reward in <60 seconds
- **Business side:** List → Verify → Manage → Grow with full analytics

### Core User Journeys

**Customer Flow (3 taps to book):**
1. Open app → Search or browse home feed
2. Select salon → Choose service + staff + time
3. Confirm & pay (M-Pesa/Card) → Receive confirmation + Beauty Points

**Business Onboarding (< 10 minutes):**
1. Register → Choose business type → Fill profile
2. Upload services + pricing + gallery
3. Go live → Receive first booking notification

---

## 4. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│   Next.js 14 Web App    │    Flutter Mobile App     │
│   (SSR + App Router)    │    (iOS + Android)        │
└────────────────┬────────────────────────────────────┘
                 │ HTTPS / WebSocket
┌────────────────▼────────────────────────────────────┐
│                  API GATEWAY (AWS)                   │
│        Rate Limiting · Auth · Load Balancer          │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│              MICROSERVICES (NestJS)                  │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Auth    │ │Bookings  │ │Payments  │            │
│  │ Service  │ │ Service  │ │ Service  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Search  │ │ Loyalty  │ │Notifs    │            │
│  │ Service  │ │ Service  │ │ Service  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐                          │
│  │  AI/ML   │ │ Admin    │                          │
│  │ Service  │ │ Service  │                          │
│  └──────────┘ └──────────┘                          │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│                 DATA LAYER                           │
│                                                      │
│  PostgreSQL (RDS)     │  Redis (ElastiCache)        │
│  Primary DB           │  Cache + Sessions           │
│                       │                             │
│  Elasticsearch        │  Cloudinary                 │
│  Full-text search     │  Images + Videos            │
│                       │                             │
│  Firebase             │  S3                         │
│  Push notifications   │  Document storage          │
└─────────────────────────────────────────────────────┘
```

### Tech Stack Decision Matrix

| Layer | Choice | Reason |
|-------|--------|--------|
| Web Frontend | Next.js 14 | SSR for SEO, App Router, edge-ready |
| Mobile | Flutter | Single codebase, iOS + Android, high performance |
| Backend | NestJS (Node.js) | TypeScript-native, modular, scales well |
| Database | PostgreSQL | ACID compliance, complex queries, proven |
| Cache | Redis | Sub-ms session lookup, rate limiting, queues |
| Search | Elasticsearch | Geo-search, full-text, faceted filtering |
| Storage | Cloudinary | Auto image optimization, transformations |
| Auth | JWT + OAuth2 | Stateless, refresh tokens, Google/Apple SSO |
| Payments | M-Pesa + Stripe | M-Pesa = 85% of Kenya transactions |
| Notifications | Firebase FCM | Cross-platform push, reliable delivery |
| Maps | Google Maps API | Accurate African geo-data |
| Hosting | Vercel (web) + AWS ECS (API) | Best of both worlds |
| CDN | Cloudflare | Edge caching, DDoS protection, Africa PoPs |

---

## 5. DATABASE SCHEMA (ERD)

```sql
-- USERS
users (
  id UUID PK,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  avatar_url TEXT,
  role ENUM('customer','business','staff','admin'),
  city_id UUID FK,
  loyalty_points INT DEFAULT 0,
  loyalty_tier ENUM('bronze','silver','gold','platinum'),
  google_id VARCHAR(100),
  is_verified BOOLEAN,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- BUSINESSES
businesses (
  id UUID PK,
  owner_id UUID FK → users,
  name VARCHAR(200),
  type ENUM('barbershop','hair_salon','nail_studio','makeup_studio','beauty_parlour','grooming_lounge'),
  description TEXT,
  short_description VARCHAR(300),
  cover_image_url TEXT,
  logo_url TEXT,
  badge ENUM('none','verified','premium','elite'),
  address TEXT,
  city_id UUID FK,
  neighborhood VARCHAR(100),
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  phone VARCHAR(20),
  email VARCHAR(255),
  price_range ENUM('$','$$','$$$','$$$$'),
  plan_tier ENUM('free','premium','elite'),
  response_time_minutes INT,
  is_active BOOLEAN,
  is_open BOOLEAN,
  total_bookings INT DEFAULT 0,
  repeat_customer_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- SERVICES
services (
  id UUID PK,
  business_id UUID FK → businesses,
  name VARCHAR(200),
  category ENUM('haircut','hair_styling','braiding','color','beard','makeup','nails','skincare','locs','weave'),
  description TEXT,
  price DECIMAL(10,2),
  duration_minutes INT,
  is_popular BOOLEAN,
  is_active BOOLEAN,
  image_url TEXT,
  created_at TIMESTAMPTZ
)

-- STAFF
staff_members (
  id UUID PK,
  business_id UUID FK → businesses,
  user_id UUID FK → users NULL,
  name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(100),
  specialties TEXT[], -- array of service categories
  is_available BOOLEAN,
  created_at TIMESTAMPTZ
)

-- APPOINTMENTS
appointments (
  id UUID PK,
  customer_id UUID FK → users,
  business_id UUID FK → businesses,
  staff_id UUID FK → staff_members,
  service_id UUID FK → services,
  date DATE,
  start_time TIME,
  end_time TIME,
  status ENUM('pending','confirmed','in_progress','completed','cancelled','no_show'),
  price DECIMAL(10,2),
  notes TEXT,
  payment_method VARCHAR(50),
  payment_status ENUM('pending','paid','refunded'),
  transaction_id VARCHAR(200),
  loyalty_points_earned INT,
  cancelled_by ENUM('customer','business','system'),
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- REVIEWS
reviews (
  id UUID PK,
  appointment_id UUID FK → appointments,
  customer_id UUID FK → users,
  business_id UUID FK → businesses,
  staff_id UUID FK → staff_members,
  rating DECIMAL(2,1), -- 1.0-5.0
  comment TEXT,
  photos TEXT[],
  owner_reply TEXT,
  owner_replied_at TIMESTAMPTZ,
  is_visible BOOLEAN,
  created_at TIMESTAMPTZ
)

-- LOYALTY TRANSACTIONS
loyalty_transactions (
  id UUID PK,
  user_id UUID FK → users,
  appointment_id UUID FK → appointments NULL,
  type ENUM('earned','redeemed','bonus','referral','review'),
  points INT,
  balance_after INT,
  description TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)

-- REWARDS
loyalty_rewards (
  id UUID PK,
  name VARCHAR(200),
  description TEXT,
  points_cost INT,
  value_description VARCHAR(100),
  category ENUM('discount','free_service','product','vip_access'),
  business_id UUID FK → businesses NULL,
  max_redemptions INT,
  redemption_count INT DEFAULT 0,
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN,
  image_url TEXT,
  created_at TIMESTAMPTZ
)

-- PROMOTIONS
promotions (
  id UUID PK,
  business_id UUID FK → businesses,
  title VARCHAR(200),
  description TEXT,
  type ENUM('percentage','fixed_amount','free_service','happy_hour'),
  discount_value DECIMAL(10,2),
  min_booking_amount DECIMAL(10,2),
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  max_uses INT,
  use_count INT DEFAULT 0,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ
)

-- NOTIFICATIONS
notifications (
  id UUID PK,
  user_id UUID FK → users,
  type ENUM('booking_confirmed','booking_reminder','booking_cancelled','review_request','loyalty_update','promotion','system'),
  title VARCHAR(200),
  body TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)

-- AUDIT LOG
audit_logs (
  id UUID PK,
  user_id UUID FK → users NULL,
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ
)
```

---

## 6. SECURITY FRAMEWORK

### Authentication & Authorization
- **JWT** with 15-minute access tokens + 7-day refresh tokens (stored in httpOnly cookies)
- **OAuth2** via Google — never store social passwords
- **MFA** — TOTP via Google Authenticator for business accounts
- **RBAC** — 4 roles: Customer, Business, Staff, Admin with granular permissions

### API Security
- **Rate limiting:** 100 req/min (public), 1000 req/min (authenticated), 10 req/min (auth endpoints)
- **CORS** — strict allowlist of origins
- **Helmet.js** — sets all security headers (CSP, HSTS, X-Frame-Options)
- **Input validation** — Zod/class-validator on all request bodies
- **SQL injection** — Parameterized queries via TypeORM, never raw SQL with user input
- **XSS** — DOMPurify on all user-generated content, Content-Security-Policy header

### Data Protection
- **Passwords** — bcrypt (cost factor 12) — never stored in plain text
- **PII encryption** — phone numbers, addresses encrypted at rest (AES-256)
- **HTTPS everywhere** — TLS 1.3, HSTS with preload, enforced on all endpoints
- **Database** — private VPC, no public access, encrypted at rest (AWS RDS)

### Payment Security
- **M-Pesa** — STK Push via Daraja API, all callbacks verified with Safaricom certificate
- **Card payments** — PCI DSS compliant via Stripe (never touch card numbers)
- **Fraud detection** — Velocity checks, geo-anomaly detection, ML-based fraud scoring

### Infrastructure
- **DDoS protection** — Cloudflare Pro (challenge/block suspicious traffic)
- **WAF** — Cloudflare WAF rules for OWASP Top 10
- **Secrets** — AWS Secrets Manager (never in .env files in production)
- **Audit logs** — All admin actions, payment events, and auth events logged immutably

---

## 7. MONETIZATION MODEL

### Revenue Streams

| Stream | Description | Est. Revenue |
|--------|-------------|-------------|
| **Booking Commission** | 5% on every completed booking | ~60% of revenue |
| **Premium Plan** | KSh 4,999/month per business | ~20% of revenue |
| **Elite Plan** | KSh 9,999/month per business | ~10% of revenue |
| **Sponsored Listings** | Pay-per-impression featured placement | ~7% of revenue |
| **Loyalty Partnerships** | Brand-funded reward sponsorships | ~3% of revenue |

### Financial Projections (Year 1)

| Quarter | GMV | Revenue (5% take rate + subscriptions) |
|---------|-----|---------|
| Q1 | KSh 4M | KSh 280K |
| Q2 | KSh 12M | KSh 860K |
| Q3 | KSh 28M | KSh 2.1M |
| Q4 | KSh 52M | KSh 4.2M |
| **Total Y1** | **KSh 96M (~$750K)** | **KSh 7.4M (~$57K)** |

### Year 2 (Lagos + Accra expansion)
- GMV target: KSh 480M (~$3.7M)
- Revenue target: KSh 42M (~$325K)
- Path to profitability: Q3 Year 2

---

## 8. MVP ROADMAP

### Phase 1 — Launch (Days 1–60)
**Goal:** 50 verified businesses, 500 bookings, 1,000 users

| Week | Milestone |
|------|-----------|
| 1–2 | Infrastructure setup (AWS, DB, domains) |
| 3–4 | Core auth, business onboarding, service listings |
| 5–6 | Customer search, salon profiles, booking flow |
| 7–8 | M-Pesa payment integration, confirmations |
| 9–10 | Reviews, ratings, basic notifications |
| 11–12 | Beta test with 20 Nairobi businesses, QA |
| **Week 13** | **🚀 Public launch — Nairobi** |

### Phase 2 — Growth (Months 3–6)
- Beauty Passport loyalty system
- Business analytics dashboard
- Promotions & dynamic deals
- Kampala + Dar es Salaam launch
- Flutter mobile app (iOS + Android)
- Style Match AI (v1 — face shape detection)

### Phase 3 — Scale (Months 7–12)
- Lagos, Accra launch
- AI-powered smart scheduling
- Dynamic pricing engine
- Beauty marketplace (products)
- Business API for enterprise chains
- Seed funding raise ($500K–$1.5M)

---

## 9. TEAM REQUIREMENTS

### MVP Team (6 people)
| Role | Type | Focus |
|------|------|-------|
| CTO / Lead Engineer | Full-time | Architecture, backend |
| Frontend Engineer | Full-time | Next.js, mobile |
| Backend Engineer | Full-time | NestJS, APIs, payments |
| Product Designer | Full-time | UI/UX, brand |
| Operations Lead | Full-time | Business onboarding, city ops |
| Growth / Marketing | Full-time | SEO, partnerships, community |

### Phase 2 Additions
- DevOps / Infrastructure Engineer
- 2× City Operations Associates (Kampala, DSM)
- Customer Success Agent
- Data Analyst

---

## 10. MARKETING & GROWTH STRATEGY

### Launch Strategy — Nairobi
1. **Pre-launch:** Partner with 20–50 top-rated Westlands/Karen businesses
2. **Waitlist:** Landing page → 1,000 email signups before launch
3. **Influencer seeding:** 5–10 Nairobi beauty influencers get early access
4. **Press:** Feature in Business Daily, Nation Media tech desk
5. **Launch event:** "StyleAfrique Launch Night" at a premium salon

### Customer Acquisition
- **Referral:** Customer gets 200 points, referred friend gets 100 points
- **SEO:** Target "best barber in Nairobi", "braids Karen", "nail salon Westlands" etc.
- **Instagram/TikTok:** Before/after content, "Book via StyleAfrique"
- **Google Ads:** High-intent search terms (€200/week budget initially)
- **WhatsApp:** Share-to-WhatsApp booking confirmation cards

### Business Acquisition
- **Direct outreach:** Sales rep visits 10–15 businesses/day in target neighborhoods
- **Business owner WhatsApp groups:** Partner with beauty association networks
- **Free Premium trial:** First 3 months free for founding businesses
- **Case studies:** Track & publish revenue growth of early partners

---

## 11. SEO STRATEGY

### Target Keywords (Kenya)
- `book barber Nairobi` (1,200/mo)
- `hair salon near me Nairobi` (2,800/mo)
- `best braiding salon Nairobi` (890/mo)
- `nail salon Westlands` (450/mo)
- `makeup artist Nairobi wedding` (720/mo)

### Technical SEO
- Server-side rendering (Next.js) for all public pages
- Dynamic sitemaps for every business profile (thousands of indexed pages)
- Schema.org LocalBusiness markup on every salon page
- Core Web Vitals optimized (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- City landing pages: `/nairobi/barbers`, `/kampala/salons`, etc.

---

## 12. INVESTOR PITCH OUTLINE

### The Opportunity
- African beauty market: $5B+ and growing at 8% CAGR
- 90%+ of bookings still via phone call or walk-in
- No dominant digital platform in East/West Africa
- Mobile money (M-Pesa) penetration enables frictionless payments

### Our Traction (12-month target)
- 1,200+ verified business listings
- 15,000+ registered users
- 8,000+ monthly bookings
- KSh 7.4M annual revenue run-rate

### The Ask
- **Seed Round:** $500K–$1.5M
- **Use of funds:** 40% engineering, 30% growth, 20% operations, 10% legal/compliance
- **Runway:** 18 months
- **Milestones:** Pan-African expansion, Series A readiness

### Why Us
- Deep local knowledge of African beauty culture
- Mobile-first, M-Pesa-native from day one
- Beauty Passport creates powerful lock-in and retention
- Marketplace flywheel: more businesses → more customers → more data → better AI → better matches

---

*Built with ❤️ for Africa's beauty professionals and the communities they serve.*
