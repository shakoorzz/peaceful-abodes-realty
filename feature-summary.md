# Peaceful Abodes Realty PWA — Feature Summary

## Current Features, Components, and Functionality

### Public Website
- **Homepage (/)**: hero, featured properties, services overview, neighborhoods preview, CTA.
- **Properties (/properties)**: property grid with filters and property cards.
- **Property Detail (/properties/:id)**: image gallery, pricing, specs, amenities, description, contact CTA.
- **Neighborhoods (/neighborhoods)**: area overview and highlights.
- **About (/about)**: agent profile, services, and story.
- **Contact (/contact)**: contact form and info.

### PWA + UI System
- **PWA manifest** with standalone mode, theme colors, icon, and shortcuts.
- **Service worker** for offline caching with fresh HTML fetching.
- **Design system**: Twilight Amber palette, Playfair Display + Inter, consistent cards/buttons.

### Authentication & Role Routing (Supabase)
- **Client Portal (/portal)**: email/password sign‑up + sign‑in.
- **Agent Portal (/agent)**: email/password sign‑up + sign‑in.
- **Role‑based routing**: agent users → /agent-dashboard, investors → /dashboard.
- **Profile bootstrap**: auto‑create profile record on signup.

### Investor Dashboard (/dashboard)
- **Tier‑1 KPI preview tiles** (non‑functional placeholders).
- **Triage queue** and **Monthly Capacity Report** (display only).

### Agent Dashboard (/agent-dashboard)
- **Lead Intake**
  - Create, edit, delete, cancel edit
  - Stores: lead name, budget, target area, timeline, stage, next action, notes
- **Deal Tracker**
  - List view with View Details panel, Edit, Delete
  - Side panel shows full lead details and actions
- **Offer Checklist**
  - Add, toggle complete, delete
  - Persistent via Supabase table `offer_checklist`
- **Partner Directory**
  - Add, edit, delete vendor contacts
  - Fields: name, role, email, phone, notes
  - Persistent via Supabase table `partner_directory`
- **Vendor & Compliance Tracker (Lite)**
  - Add, edit, delete vendors
  - Fields: vendor name, trade type, status, expiration date, notes
  - UI explicitly notes **Enterprise Tier** for automation, document vault, reminders
  - Persistent via Supabase table `vendor_compliance`

### Current Data (Listings)
- **Sample listings replaced** with a real listing:
  - 101 Rauber St, Rochester, NY (price, beds, baths, sqft, description, features, hero image)

### Storage/DB (Supabase)
- **Tables in use**: profiles, agent_leads, offer_checklist, partner_directory, vendor_compliance
- **RLS**: owner‑only policies for agent‑scoped tables

---

## Planned Features and Components (Discussed, Not Yet Implemented)

### Remaining Listings Import (Near‑term)
- Add remaining Rochester properties:
  - 204 Salisbury St
  - 388 Smith St
  - 27 Leavenworth St
  - 103 Garfield St
  - 94 Kosciusko St
- Include all photos and listing details per property PDF

### Tier‑1 Command Center (Investor)
- **Maintenance triage intake** with status filtering
- **Section 8 FMR alerts** (zip‑based alerts)
- **Vendor compliance** in full mode (document uploads, reminders)
- **Monthly capacity/savings report** with manual inputs

### Property & Transaction Management
- Full CRUD for properties and transactions
- Transaction milestones and status progression
- Communications log with audit trail

### AI / Automation (Future)
- Dossier generation (market intel)
- Email delivery / reports
- Optional integrations (Gemini + Resend)

---

## Notes on Tiering / Demo Boundaries
- **Lite features**: manual tracking, no automation, no document vault.
- **Enterprise tier**: automation, compliance scoring, reminders, file uploads.
- Copy should use positive framing: “Available in Enterprise Tier.”

---

## Next Suggested Steps
1. Provide individual property PDFs + photo URLs for the remaining 5 listings.
2. Add each listing to the site (one at a time) and deploy a single batch.
3. Implement Tier‑1 investor features after property listings are complete.
4. Optionally connect property CRUD to Supabase for dynamic listing updates.
