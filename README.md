# Agonis Partners

**Bringing global consumer brands to Türkiye.**

Marketing website for Agonis Partners — an Istanbul-based import & distribution company that brings high-potential international consumer brands to the Turkish market and grows them through leading e-commerce and marketplace channels (Amazon Türkiye, Trendyol, Hepsiburada, N11).

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` design tokens)
- **Framer Motion** for subtle, premium scroll/hover animations
- **Lucide React** icons
- Google Fonts via `next/font` — **Poppins** (headings/UI) + **Lora** (body)
- `next/image` with AVIF/WebP optimization

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, metadata, header/footer shell
│   ├── globals.css           # Tailwind v4 theme (navy + champagne gold)
│   ├── page.tsx              # Home
│   ├── for-brands/           # "For Brands" landing page
│   ├── what-we-do/           # Service detail page
│   ├── categories/           # Focus categories
│   ├── partnership-model/    # 5-step partnership process
│   ├── about/                # About Us
│   └── contact/              # Contact + brand submission form
├── components/
│   ├── layout/               # Header (mega menu), Footer, BackToTop
│   ├── sections/             # Reusable homepage/page sections
│   ├── ui/                   # Button, SectionHeading, Reveal, BrandModal …
└── lib/
    ├── data.ts               # Categories, channels, steps, FAQ, testimonials
    └── utils.ts              # cn() class helper
```

## Design system

Tokens live in `src/app/globals.css` under `@theme`:

- **Navy** `#102a4c` (brand) · **Ink** `#0b1a30` (headings) · **Navy-900** `#07111f` (dark sections)
- **Champagne gold** `#c7a45a` (accent) · **Steel blue** `#3f5e80`
- **Sand / beige** backgrounds, warm hairline borders
- 16px default radius, soft shadows, 8px spacing grid

## Accessibility & performance

- Semantic HTML, ARIA labels, keyboard-navigable menus, skip link, visible focus rings
- `prefers-reduced-motion` respected
- AVIF/WebP images, font `display: swap`, lazy/below-the-fold reveals

## Notes

- Imagery uses curated Unsplash URLs (configured in `next.config.ts`). Swap for licensed brand photography before launch.
- The contact form is wired to client-side validation only — connect it to your email/CRM endpoint (e.g. Resend, Formspree, or a custom API route) before going live.
