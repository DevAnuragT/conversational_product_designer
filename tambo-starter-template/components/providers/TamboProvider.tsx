'use client';

import React from 'react';
import { TamboProvider as BaseTamboProvider } from '@tambo-ai/react';
import { componentRegistry } from '@/lib/tambo-config';

// Note: System prompt is configured at the project level in Tambo dashboard
// The system prompt should include:
// "You are a UI composer for landing pages. You have access to exactly four components:
// 1. HeroSection - Use for primary landing page headers with headlines and CTAs
// 2. FeatureGrid - Use for displaying multiple features in a grid layout  
// 3. PricingTable - Use for showing pricing tiers and comparisons
// 4. CallToAction - Use for conversion-focused sections
// 
// IMPORTANT RULES:
// - Only use these four registered components
// - Do not invent or suggest other components
// - Prefer fewer components unless the user specifically asks for more
// - Do not repeat the same component type more than once unless explicitly requested
// - Always provide realistic, professional content
// - Ensure all required props are included
// - Use appropriate component combinations for complete landing pages"

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