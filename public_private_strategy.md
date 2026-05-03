# Nextfolio: Public Demo + Private Code Strategy

This document outlines the deployment and environment strategy for Nextfolio to maintain absolute code privacy while delivering a highly optimized, public-facing SaaS platform.

## 1. Code Repository Setup (Private Code)
*   **Git Repository:** Host your codebase on a private repository (e.g., GitHub, GitLab). Do NOT use public repositories.
*   **`.gitignore` Configuration:** We have explicitly configured `.gitignore` to:
    *   Ignore all `.env*` files automatically (safeguarding your keys).
    *   Allow only `.env.example` to be committed, which serves as a template without exposing real credentials.
    *   Ignore `.next`, `node_modules`, and `dist` build folders.

## 2. Infrastructure & Deployment (Public Demo)
*   **Hosting:** Deploy Nextfolio on **Vercel** or **AWS Amplify** for global edge networking. Next.js applications inherently split into:
    *   **Public Edge:** Static assets (landing, pricing, templates) are cached at the edge CDN for sub-100ms load times.
    *   **Serverless APIs:** Your internal Next.js API routes run on lambda functions automatically, never exposing code to the browser.
*   **Environment Variables:** Provide your Supabase, Stripe, and n8n keys directly into your hosting provider's dashboard (e.g., Vercel Environment Variables). Never commit these to Git.
    *   *Safe:* `NEXT_PUBLIC_SUPABASE_URL` (exposed to client for auth).
    *   *Secret:* `SUPABASE_SERVICE_ROLE_KEY` (never prefixed with `NEXT_PUBLIC_`).

## 3. SEO & Public Accessibility
*   **Dynamic Sitemap:** We have added an automated `sitemap.ts` that provides web crawlers with your public pages (`/pricing`, `/templates`, `/faq`, `/contact`).
*   **Robots.txt:** The newly added `robots.ts` explicitly tells Search Engines to crawl your public features but explicitly blocks indexing of `/dashboard`, `/admin`, and internal `/api` routes.
*   **Metadata:** Global metadata in `layout.tsx` is fully optimized for organic ranking.

## 4. Security & Internal Protection
*   **Edge Middleware:** We have introduced `middleware.ts` running at the edge. It uses `@supabase/auth-helpers-nextjs` to strictly verify authentication tokens *before* a request hits your dashboard or admin routes.
*   **Admin Route Hardening:** `/admin/*` routes are protected. The middleware validates the user's active session, meaning those routes are invisible and inaccessible to unauthenticated traffic.
*   **Database (Supabase):** Use Row Level Security (RLS) on all Supabase tables so that even if the public Anon Key is used, users can only read/write their own portfolio records.

## 5. Launch Checklist
1. [ ] Push your code to a Private GitHub Repository.
2. [ ] Connect the Repository to Vercel.
3. [ ] Copy the variables from `.env.example` into Vercel's Environment Settings and populate them with production keys.
4. [ ] Run `npm run build` locally to verify zero type errors (which we have successfully done).
5. [ ] Deploy to production and map `nextfolio.ai` via Vercel Domains.
