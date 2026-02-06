import { z } from 'zod';

// Hero Section Schema - with style props for design variety
export const heroSectionSchema = z.object({
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  backgroundImage: z.string().optional(),
  // NEW: Style props for design variety
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;

// Feature Schema
export const featureSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

// Feature Grid Schema - with style props
export const featureGridSchema = z.object({
  title: z.string().optional(),
  features: z.array(featureSchema).optional(),
  columns: z.string().optional(),
  // NEW: Style props for design variety
  colorScheme: z.string().optional(),
  style: z.string().optional(),
});

export type Feature = z.infer<typeof featureSchema>;
export type FeatureGridProps = z.infer<typeof featureGridSchema>;

// Pricing Tier Schema
export const pricingTierSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  period: z.string().optional(),
  features: z.array(z.string()).optional(),
  highlighted: z.boolean().optional(),
  ctaText: z.string().optional(),
});

// Pricing Table Schema - with style props
export const pricingTableSchema = z.object({
  title: z.string().optional(),
  tiers: z.array(pricingTierSchema).optional(),
  // NEW: Style props for design variety
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type PricingTier = z.infer<typeof pricingTierSchema>;
export type PricingTableProps = z.infer<typeof pricingTableSchema>;

// Call to Action Schema - with style props
export const callToActionSchema = z.object({
  headline: z.string().optional(),
  description: z.string().optional(),
  primaryButton: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
  }).optional(),
  secondaryButton: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
  }).optional(),
  // NEW: Style props for design variety
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type CallToActionProps = z.infer<typeof callToActionSchema>;