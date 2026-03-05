# Teardown AI — Website

## Project Overview
Customer-facing website for Teardown AI, an AI-powered supplement generation tool for auto body shops. Features marketing pages, a live demo/try-it tool, pricing, and contact form with Zoho CRM integration.

## Tech Stack
- Next.js 14 (App Router) with React 18 and TypeScript
- Tailwind CSS 3
- jsPDF for PDF document generation
- Anthropic Claude API for AI supplement generation
- Zoho CRM webhook integration for lead capture

## Architecture
- **App Router**: Pages under `src/app/` using Next.js App Router
- **API Routes**: `src/app/api/generate-supplement/` for AI calls, `src/app/api/contact/` for form submissions
- **Components**: `src/components/` for shared UI (Header, Footer, SupplementViewer)
- **Data**: `src/data/sample-supplements.ts` for demo content

## Key Pages
- `/` — Homepage / landing page
- `/try-it` — Interactive supplement generation tool (calls Claude API)
- `/demo` — Product demo page
- `/pricing` — Pricing tiers
- `/contact` — Contact form (posts to Zoho CRM webhook)

## API Routes
- `POST /api/generate-supplement` — Sends vehicle/damage data to Claude API, returns supplement text
- `POST /api/contact` — Submits contact form data to Zoho CRM

## Environment Variables
- `FLOW_TEARDOWN_KEY` — Anthropic API key for Claude
- `ZOHO_CRM_*` — Zoho CRM webhook configuration values

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run linting

## Conventions
- Use Tailwind CSS utility classes for styling
- Keep API keys server-side only (API routes, not client components)
- Use TypeScript for all new files
- Components go in `src/components/`
- Utility functions go in `src/lib/`

## Important Notes
- The .env.local file contains API keys — never commit it
- The Zoho CRM integration requires valid webhook URLs and field IDs
- The Claude API call is in the generate-supplement route — be careful with prompt changes
- Deployed on Vercel with automatic deployments from the main branch
