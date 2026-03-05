# Teardown AI — Website

The customer-facing web application for Teardown AI. Features a demo page, pricing, contact form, and the supplement generation tool.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS 3
- **PDF:** jsPDF for document generation
- **API:** Anthropic Claude API for AI supplement generation
- **CRM:** Zoho CRM integration for lead capture
- **Language:** TypeScript
- **Deployment:** Vercel

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version, 20+)
- npm (comes with Node.js)

## Local Setup

1. **Clone the repo:**
   ```bash
   gh repo clone FlowAgile/supplement-ai-website
   cd supplement-ai-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` — see `.env.example` for details on each variable.

4. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js linting |

## Project Structure

```
src/
  app/
    api/
      contact/              Contact form API route
      generate-supplement/  AI supplement generation API
    contact/    Contact page
    demo/       Demo page
    pricing/    Pricing page
    try-it/     Interactive supplement tool
    layout.tsx  Root layout
    page.tsx    Homepage
  components/
    Footer.tsx
    Header.tsx
    SupplementViewer.tsx
  data/
    sample-supplements.ts
  lib/          Utility functions
```
