# DIAT Website — Complete Implementation Plan

## Current State Analysis

### Project Stack
- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (project: `jvtwqssovvjazhuwgcpa`)
- **Auth**: NextAuth.js with JWT strategy + CAPTCHA
- **Legacy**: Prisma (needs removal)

### Issues Found
1. **7 files with merge conflicts** (public pages)
2. **Prisma references** in FacultyForm.tsx and faculty/columns.tsx
3. **prisma/ directory** with schema.prisma and dev.db (legacy)
4. **Dashboard uses hardcoded data** instead of live Supabase data
5. **No rate limiting** on login
6. **No IP blocking** mechanism
7. **No login location tracking**
8. **No audit log viewer** in admin
9. **Demo user hardcoded** in auth.ts
10. **Missing admin sections**: Contacts, Alumni, Students, Pages, Audit Logs

### Database Tables (Supabase - all RLS enabled)
User, Faculty, Event, Announcement, PageContent, Program, Research,
Gallery, Placement, Settings, AuditLog, Captcha

---

## Phase 1: Fix Merge Conflicts (7 files)
- about/page.tsx
- events/page.tsx
- research/page.tsx
- page.tsx (home)
- gallery/page.tsx
- alumni/page.tsx
- placements/page.tsx

## Phase 2: Remove Legacy Prisma
- Delete prisma/ directory
- Remove @prisma/client import from FacultyForm.tsx
- Remove "Prisma model" comment from faculty/columns.tsx
- Remove @prisma/client and prisma from package.json
- Remove DATABASE_URL and DIRECT_URL from .env comments

## Phase 3: Database Schema Enhancements
Add new tables:
- `RateLimit` - for login rate limiting
- `BlockedIP` - for IP blocking
- `LoginLog` - for location-based login tracking
- `Contact` - for contact form submissions

Update AuditLog to include location data.

## Phase 4: Security System
1. Rate limiting on auth routes
2. IP blocking middleware
3. Login location tracking (IP geolocation)
4. Enhanced audit logging with IP/location
5. Dev tools disabling script

## Phase 5: Enhanced Admin Panel
1. Live dashboard with real Supabase counts
2. Role-based sidebar (filter items by role)
3. Audit Logs viewer (SUPER_ADMIN only)
4. Contact submissions viewer
5. Alumni management
6. Students management
7. Pages/Content management

## Phase 6: Build & Test
1. Fix all TypeScript errors
2. Successful production build
3. Test all admin CRUD operations
