import { z } from 'zod';

// Hero Section Schema - ultra-relaxed validation for AI compatibility
export const heroSectionSchema = z.object({
  headline: z.string().optional().default("Welcome to Our Product"),
  subheadline: z.string().optional().default("Discover amazing features that will transform your experience"),
  ctaText: z.string().optional().default("Get Started"),
  ctaLink: z.string().optional(),
  backgroundImage: z.string().optional(),
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;

// Feature Schema
export const featureSchema = z.object({
  title: z.string().optional().default("Feature Title"),
  description: z.string().optional().default("Feature description goes here"),
  icon: z.string().optional(),
});

// Feature Grid Schema
export const featureGridSchema = z.object({
  title: z.string().optional(),
  features: z.array(featureSchema).optional().default([]),
  columns: z.enum(["2", "3", "4"]).optional().default("3"),
});

export type Feature = z.infer<typeof featureSchema>;
export type FeatureGridProps = z.infer<typeof featureGridSchema>;

// Pricing Tier Schema
export const pricingTierSchema = z.object({
  name: z.string().optional().default("Plan"),
  price: z.string().optional().default("$0"),
  period: z.string().optional(),
  features: z.array(z.string()).optional().default([]),
  highlighted: z.boolean().optional().default(false),
  ctaText: z.string().optional().default("Get Started"),
});

// Pricing Table Schema
export const pricingTableSchema = z.object({
  title: z.string().optional(),
  tiers: z.array(pricingTierSchema).optional().default([]),
});

export type PricingTier = z.infer<typeof pricingTierSchema>;
export type PricingTableProps = z.infer<typeof pricingTableSchema>;

// Call to Action Schema
export const callToActionSchema = z.object({
  headline: z.string().optional().default("Ready to Get Started?"),
  description: z.string().optional(),
  primaryButton: z.object({
    text: z.string().optional().default("Get Started"),
    link: z.string().optional(),
  }).optional().default({}),
  secondaryButton: z.object({
    text: z.string().optional().default("Learn More"),
    link: z.string().optional(),
  }).optional(),
  backgroundColor: z.enum(["primary", "secondary", "accent"]).optional().default("primary"),
});

export type CallToActionProps = z.infer<typeof callToActionSchema>;