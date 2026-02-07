# Landing Page Generator - Next.js + Tambo Starter Template

A minimal Next.js starter template for building AI-powered landing page generators with Tambo AI.

## What This Template Demonstrates

This template shows how to build a conversational interface that generates landing pages from natural language prompts. It includes:

- **4 Landing Page Components**: HeroSection, FeatureGrid, PricingTable, CallToAction
- **Tambo AI Integration**: Proper component registration with schemas
- **Type-Safe Props**: Zod schemas for runtime validation
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Prompt Enhancement**: Smart prompt analysis and suggestions

## Screenshot

![Landing Page Generator](https://via.placeholder.com/1200x600/1e293b/ffffff?text=Add+Your+Screenshot+Here)

*Replace this with your actual screenshot showing the app with Tambo UI visible*

## Video Demo

🎥 [Watch the demo video](https://your-video-link-here.com)

*Upload a video to GitHub by dragging it into a comment, then paste the link here*

## Prerequisites

- Node.js 18+
- npm or yarn
- [Tambo AI API key](https://tambo.co) - Sign up for free

## Setup Instructions

1. **Clone and install**
   ```bash
   git clone <your-repo-url>
   cd tambo-starter-template
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your Tambo API key to `.env.local`**
   ```bash
   NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## What's Included

- **Next.js 14+** - React framework with App Router
- **Tambo AI** - Generative UI SDK for conversational interfaces
- **TypeScript** - Full type safety with strict mode enabled
- **Tailwind CSS** - Utility-first styling
- **Zod** - Runtime schema validation
- **ESLint** - Code linting with Next.js config

## Project Structure

```
tambo-starter-template/
├── app/
│   ├── layout.tsx          # Root layout with TamboProvider
│   ├── page.tsx            # Main app with prompt input
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # 4 landing page components
│   │   ├── HeroSection.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── PricingTable.tsx
│   │   └── CallToAction.tsx
│   ├── providers/
│   │   └── TamboProvider.tsx
│   └── ErrorBoundary.tsx
├── lib/
│   ├── tambo-config.ts     # Component registry
│   ├── schemas.ts          # Zod schemas
│   └── prompt-enhancer.ts  # Prompt analysis utilities
└── types/
    └── index.ts            # TypeScript types
```

## Example Usage

Try these prompts:

```
Create a landing page for a SaaS productivity app with a hero section, 
feature grid showing 3 key benefits, pricing table with 3 tiers, 
and a call-to-action section.
```

```
Build a landing page for an e-commerce store with a compelling hero, 
features highlighting fast shipping and quality products, and a 
strong call-to-action.
```

## Customization

### Adding New Components

1. Create component in `components/landing/`
2. Define Zod schema in `lib/schemas.ts`
3. Register in `lib/tambo-config.ts`

### Styling

- Modify Tailwind config in `tailwind.config.ts`
- Update global styles in `app/globals.css`
- Customize component styles directly in component files

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check (if you add this script)
npm run typecheck
```

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

---

Built with [Tambo AI](https://tambo.co) and [Next.js](https://nextjs.org)
