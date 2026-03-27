# Peaceful Abodes Realty PWA

## Project Overview
- **Name**: Peaceful Abodes Realty
- **Owner**: Abubakr Abdul-Latif, Owner/CEO, Licensed Real Estate Salesperson
- **Tagline**: "Helping you find your Peaceful Abode... Here and around the world"
- **Contact**: 585.210.8001 | peacefulabodes@gmail.com

## URLs
- **Production**: https://webapp-ap9.pages.dev
- **Sandbox**: [Generated on start]

## Completed Features

### Pages
| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero section, featured properties, services, neighborhoods |
| Properties | `/properties` | Property listings with filters |
| Property Detail | `/properties/:id` | Full property info with agent contact |
| Neighborhoods | `/neighborhoods` | NY area exploration |
| About | `/about` | Abubakr Abdul-Latif bio and services |
| Contact | `/contact` | Contact form and info |
| Client Portal | `/portal` | Supabase Auth login/signup + profile |
| Investor Dashboard | `/dashboard` | Command Center overview and KPI preview |
| Agent Portal | `/agent` | Agent login/signup |
| Agent Dashboard | `/agent-dashboard` | Lead intake, deal tracker, offer checklist, partner directory, vendor/compliance tracker (lite) |

**Auth Behavior**: `/dashboard` and `/agent-dashboard` require an active Supabase session and redirect to `/portal` or `/agent` when signed out. A Dashboard link (lock icon) is available in the top navigation for quick access.

### Design System
Based on "Twilight Amber" theme:
- **Deep Twilight Blue** (#1a2332) - Navigation, headers, footer
- **Warm Amber** (#d4a574) - CTAs, accents, hover states
- **Soft Cream** (#f8f6f2) - Backgrounds
- **Typography**: Playfair Display (headings), Inter (body)

### Services Highlighted
- Investment Property Acquisition
- Property Management
- Financial Guidance

## Current Entry URIs
- `GET /`
- `GET /properties`
- `GET /properties/:id`
- `GET /neighborhoods`
- `GET /contact`
- `GET /about`
- `GET /portal`
- `GET /dashboard`
- `GET /agent`
- `GET /agent-dashboard`

## Tech Stack
- **Framework**: Hono
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome
- **Deployment**: Cloudflare Pages
- **PWA**: Service Worker enabled
- **Backend (wired)**: Supabase Auth + Storage

## Supabase Backend Setup
- **Supabase URL** and **Anon Key** are stored in `/home/user/webapp/.dev.vars` for local development.
- Schema file: `supabase/schema.sql`
- Storage bucket: `command-center`

### Supabase Setup Steps
1. In Supabase, enable **Email/Password** auth.
2. Open the SQL Editor and run `supabase/schema.sql` (includes profile trigger + RLS policies).
3. Confirm the `command-center` storage bucket exists.
4. Add the same `SUPABASE_URL` and `SUPABASE_ANON_KEY` as Cloudflare Pages secrets when deploying.

## Data Architecture
**Primary tables**:
- `profiles` (extends `auth.users`, role-based access)
- `agent_leads` (agent CRM)
- `offer_checklist` (agent checklist)
- `partner_directory` (agent vendor contacts)
- `vendor_compliance` (vendor/compliance tracker lite)
- `properties`, `property_images`
- `transactions`, `transaction_milestones`
- `communications_log` (audit trail)
- `dossiers`, `dossier_exports`

**Storage**:
- `command-center` bucket for property images and dossier exports

## User Guide
- Browse properties on `/properties`.
- View details on `/properties/:id`.
- Use `/contact` to submit a message (frontend only).
- Use `/portal` to sign up or sign in and create a profile.
- Signed-in investors are redirected to `/dashboard` for the Command Center overview.
- Signed-in agents are redirected to `/agent-dashboard` for Lead Intake, Deal Tracker, Offer Checklist, Partner Directory, and Vendor/Compliance Tracker Lite.

## Development
```bash
# Build
npm run build

# Local development
npm run dev:sandbox

# Deploy to Cloudflare
npm run deploy:prod
```

## Features Not Yet Implemented
- CRUD flows for properties and transactions
- Unified Communications Log persistence
- Transaction Pulse milestone updates
- Deep Intel Dossier (Gemini API)
- Dossier email delivery (Resend)

## Recommended Next Steps
1. Apply `supabase/schema.sql` in Supabase.
2. Implement property CRUD with RLS-aware Supabase client.
3. Add audit log writes for milestone status changes.
4. Integrate Gemini + Resend when API keys are ready.

## Scope (Tier-1 Only Boundary Checklist)
### ✅ Allowed (Tier-1)
- Basic maintenance triage (request intake + simple categorization + routing)
- Section 8 FMR alerts by zip code (alerts only)
- Vendor repository (W9 + insurance uploads) + expiration reminders
- Monthly capacity/savings report (estimated values; manual inputs allowed)

### ✅ Allowed UI
- Public marketing website (home, listings, contact, about)
- Client portal login
- Lightweight dashboard with summary tiles
- Simple triage activity list

### 🚫 Out of Scope (Tier-2+)
- Automated HAP processing or rent-increase document drafting
- Utility leak detection integrations
- Vendor batching optimization logic
- Live ROI/Gains Ledger dashboards
- Forensic audits of 12–24 months of financials
- Revenue-share or performance-fee calculations

### ✅ Safe Wording
- “Estimated savings”
- “Capacity gains”
- “Labor efficiency report”
- “Administrative load reduced”
- “Alerts & reminders”

### 🚫 Wording to Avoid
- “New money found”
- “Revenue recovered automatically”
- “Live ROI”
- “Profit center”
- “Automated compliance enforcement”

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Tech Stack**: Hono + Vite + Tailwind (CDN)
- **Last Updated**: 2026-02-23
