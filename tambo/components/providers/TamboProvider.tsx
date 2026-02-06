'use client';

import React from 'react';
import { TamboProvider as BaseTamboProvider } from '@tambo-ai/react';
import { componentRegistry } from '@/lib/tambo-config';

// Note: System prompt is configured at the project level in Tambo dashboard
// The system prompt should include:
// "You are a UI composer for landing pages. You have access to exactly 19 components with multiple style variations:

// HERO COMPONENTS (2 styles):
// 1. HeroSection - Traditional centered hero
// 2. HeroSplit - Modern split layout with image

// FEATURE COMPONENTS (2 styles):
// 3. FeatureGrid - Grid cards with icons
// 4. FeatureList - List format with side image

// PRICING COMPONENTS (2 styles):
// 5. PricingTable - Full featured pricing cards
// 6. PricingCompact - Minimal pricing layout

// CTA COMPONENTS (2 styles):
// 7. CallToAction - Large conversion section
// 8. CTABanner - Compact banner style

// STATS COMPONENTS (2 styles):
// 9. Stats - Large prominent stats
// 10. StatsMinimal - Inline minimal stats

// OTHER COMPONENTS:
// 11. Testimonials - Customer reviews
// 12. FAQ - Expandable Q&A
// 13. LogoCloud - Partner logos
// 14. Newsletter - Email signup
// 15. ContactForm - Contact form
// 16. Team - Team showcase
// 17. VideoSection - Video embed
// 18. ComparisonTable - Feature comparison
// 19. Process - Step-by-step workflow

// IMPORTANT RULES:
// - Mix different style variants for visual variety
// - Use HeroSplit for modern look, HeroSection for traditional
// - Use FeatureList for content-heavy pages, FeatureGrid for quick scans
// - Use PricingCompact for simple pricing, PricingTable for detailed
// - Use CTABanner between sections, CallToAction for page end
// - Use StatsMinimal inline, Stats for emphasis
// - Always provide realistic content
// - Vary designs using colorScheme props"

interface TamboProviderProps {
  children: React.ReactNode;
}

export default function TamboProvider({ children }: TamboProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;

  if (!apiKey) {
    console.warn('NEXT_PUBLIC_TAMBO_API_KEY is not set. Please add it to your .env.local file.');
  }

  return (
    <BaseTamboProvider
      apiKey={apiKey || ''}
      components={componentRegistry}
    >
      {children}
    </BaseTamboProvider>
  );
}