# Conversational UI Starter Template

A Next.js starter template for building conversational interfaces with Tambo AI's generative UI capabilities. Generate professional landing pages from natural language prompts using pre-built React components.

## 🚀 What You'll Build

This template demonstrates how to create a conversational interface that:
- Takes natural language prompts from users
- Uses Tambo AI to compose UI components intelligently
- Renders professional, responsive landing pages instantly
- Includes four production-ready components: Hero, Features, Pricing, and Call-to-Action

## ✨ Features

- **🎯 Complete Generative UI Workflow**: Prompt → AI → Components → Preview
- **🧩 Four Professional Components**: Hero sections, feature grids, pricing tables, and CTAs
- **🔒 Type Safety**: Full TypeScript support with Zod schema validation
- **🎨 Beautiful Design**: Responsive components styled with Tailwind CSS
- **📱 Mobile-First**: All components work perfectly on any device
- **⚡ Fast Setup**: Get running in under 5 minutes

## 🏗️ Template Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Tambo provider
│   ├── page.tsx            # Main conversational interface
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # Four landing page components
│   │   ├── HeroSection.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── PricingTable.tsx
│   │   └── CallToAction.tsx
│   └── providers/
│       └── TamboProvider.tsx
├── lib/
│   ├── schemas.ts          # Zod schemas for type safety
│   └── tambo-config.ts     # Component registry
└── types/
    └── index.ts            # TypeScript definitions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Tambo AI API key ([Get one here](https://tambo.co))

### 1. Clone and Install

```bash
# Clone this template
git clone <your-repo-url>
cd conversational-ui-starter

# Install dependencies
npm install
```

### 2. Configure Tambo AI

```bash
# Copy environment template
cp .env.example .env.local

# Add your Tambo API key
echo "NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here" >> .env.local
```

### 3. Set Up System Prompt

In your [Tambo dashboard](https://tambo.co), configure your project with this system prompt:

```
You are a UI composer for landing pages. You have access to exactly four components:

1. HeroSection - Use for primary landing page headers with headlines and CTAs
2. FeatureGrid - Use for displaying multiple features in a grid layout  
3. PricingTable - Use for showing pricing tiers and comparisons
4. CallToAction - Use for conversion-focused sections

IMPORTANT RULES:
- Only use these four registered components
- Do not invent or suggest other components
- Prefer fewer components unless the user specifically asks for more
- Do not repeat the same component type more than once unless explicitly requested
- Always provide realistic, professional content
- Ensure all required props are included
- Use appropriate component combinations for complete landing pages

When composing landing pages:
- Start with HeroSection for most pages
- Use FeatureGrid to highlight key benefits
- Include PricingTable when pricing is relevant
- End with CallToAction for conversion focus
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start generating landing pages!

## 🎯 Example Prompts

Try these prompts to see the template in action:

### SaaS Product
```
Create a landing page for TaskFlow, a productivity SaaS app that helps teams manage projects better. Include a hero section with a compelling headline, a feature grid showing 3 key benefits (collaboration, automation, and analytics), and a call-to-action section encouraging users to start their free trial.
```

### E-commerce
```
Build a landing page for "EcoWear", a sustainable clothing brand. Start with a hero section about eco-friendly fashion, add a feature grid highlighting sustainability, quality, and style, include a pricing table with 3 product tiers (Basic, Premium, Luxury), and end with a strong call-to-action.
```

### Service Business
```
Generate a landing page for "Digital Marketing Pro", a consulting agency. Create a professional hero section, feature grid with 4 services (SEO, PPC, Social Media, Content Marketing), pricing packages for different business sizes, and a consultation call-to-action.
```

## 🧩 Components Overview

### HeroSection
Primary landing page hero with headline, subheadline, and call-to-action button. Supports optional background images and custom styling.

### FeatureGrid
Responsive grid layout for showcasing features. Supports 2-4 columns, optional icons, and automatic mobile adaptation.

### PricingTable
Professional pricing comparison table with tier highlighting, feature lists, and customizable CTAs for each pricing option.

### CallToAction
Conversion-focused section with primary and optional secondary action buttons. Multiple background color themes available.

## 🔧 Customization

### Adding New Components

1. Create your component in `components/landing/`
2. Define the Zod schema in `lib/schemas.ts`
3. Register it in `lib/tambo-config.ts`
4. Update the system prompt to include the new component

### Styling

The template uses Tailwind CSS. Customize:
- Colors and themes in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component-specific styles in individual files

### Type Safety

All components use Zod schemas for runtime validation:
- Props are validated before rendering
- AI responses are checked against schemas
- TypeScript provides compile-time safety

## 📚 Learning Resources

- [Tambo AI Documentation](https://docs.tambo.co)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Schema Validation](https://zod.dev)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Add `NEXT_PUBLIC_TAMBO_API_KEY` environment variable
4. Deploy!

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway  
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

Found a bug or want to improve the template? Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this template for any project!

---

**Built with ❤️ using [Tambo AI](https://tambo.co) and [Next.js](https://nextjs.org)**

*This template demonstrates the power of conversational interfaces for UI generation. Start building your own generative UI applications today!*