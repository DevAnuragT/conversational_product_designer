# Conversational Product Designer with Tambo AI

A Next.js application that generates professional landing pages from natural language prompts using Tambo AI's generative UI capabilities.

## Overview

This application demonstrates how to build a conversational interface for generating landing pages. Users can describe their desired landing page in natural language, and the AI will compose it using four predefined React components: HeroSection, FeatureGrid, PricingTable, and CallToAction.

## Features

- **Natural Language Interface**: Describe your landing page in plain English
- **Real-time Generation**: See your landing page generated instantly
- **Professional Components**: Four polished, responsive React components
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Export Ready**: Stub implementation for future code export functionality

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Tambo AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tambo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Tambo AI API key to `.env.local`:
```bash
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key_here
```

5. Configure your Tambo project with the system prompt (see Configuration section below)

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Tambo AI Setup

1. Create a project at [tambo.co](https://tambo.co)
2. Get your API key from the project settings
3. Configure the system prompt in your Tambo project dashboard with:

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

## Architecture

### Component Registry

The application registers four React components with Tambo AI:

- **HeroSection**: Primary landing page hero with headline, subheadline, and CTA
- **FeatureGrid**: Grid layout displaying multiple features with icons and descriptions  
- **PricingTable**: Comparative pricing display with multiple tiers and features
- **CallToAction**: Conversion-focused section with primary and secondary actions

### Technology Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Tambo AI**: Generative UI SDK for React
- **Zod**: Schema validation for component props

### Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # Landing page components
│   │   ├── HeroSection.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── PricingTable.tsx
│   │   └── CallToAction.tsx
│   └── providers/
│       └── TamboProvider.tsx
├── lib/
│   ├── schemas.ts          # Zod schemas for components
│   └── tambo-config.ts     # Tambo configuration
└── types/
    └── index.ts            # TypeScript type definitions
```

## Usage

### Example Prompts

Try these example prompts to generate different types of landing pages:

1. **SaaS Product**:
   "Create a landing page for a productivity SaaS app with a hero section, feature grid showing 3 key benefits, pricing table with 3 tiers, and a call-to-action section."

2. **E-commerce**:
   "Build a landing page for an online store with a compelling hero, features highlighting fast shipping and quality products, and a strong call-to-action."

3. **Service Business**:
   "Generate a landing page for a consulting service with a professional hero section, grid of 4 service offerings, pricing packages, and contact call-to-action."

### Tips for Effective Prompts

- Be specific about the type of business or product
- Mention which components you want (hero, features, pricing, CTA)
- Include details about the number of features or pricing tiers
- Specify the tone (professional, friendly, modern, etc.)
- Mention any specific content themes or industries

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

To add a new component to the registry:

1. Create the component in `components/landing/`
2. Define the Zod schema in `lib/schemas.ts`
3. Add the component to the registry in `lib/tambo-config.ts`
4. Update the system prompt to include the new component

### Customizing Styles

The application uses Tailwind CSS. You can customize:

- Colors and themes in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component-specific styles in individual component files

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `NEXT_PUBLIC_TAMBO_API_KEY` environment variable
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Make sure to set the `NEXT_PUBLIC_TAMBO_API_KEY` environment variable.

## Troubleshooting

### Common Issues

**Build Errors**
- Ensure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run build`
- Verify environment variables are set correctly

**API Key Issues**
- Verify your Tambo API key is correct
- Check that the key is set in `.env.local`
- Ensure the key starts with `NEXT_PUBLIC_`

**Component Not Rendering**
- Check browser console for errors
- Verify component is registered in `lib/tambo-config.ts`
- Ensure Zod schema matches component props

**Generation Failures**
- Check your Tambo project system prompt configuration
- Verify your API key has sufficient credits
- Try simpler prompts to test basic functionality

### Getting Help

- Check the [Tambo AI Documentation](https://docs.tambo.co)
- Review the component schemas in `lib/schemas.ts`
- Look at example prompts in this README

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using [Tambo AI](https://tambo.co) and [Next.js](https://nextjs.org)
