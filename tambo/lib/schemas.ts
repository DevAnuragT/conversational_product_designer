import { z } from 'zod';

// Hero Section Schema - relaxed validation for AI compatibility
export const heroSectionSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  subheadline: z.string().min(1, "Subheadline is required"),
  ctaText: z.string().min(1, "CTA text is required"),
  ctaLink: z.string().optional(), // Relaxed validation for AI compatibility
  backgroundImage: z.string().optional(), // Relaxed validation for AI compatibility
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;

// Feature Schema
export const featureSchema = z.object({
  title: z.string().min(1, "Feature title is required"),
  description: z.string().min(1, "Feature description is required"),
  icon: z.string().optional(), // Relaxed validation for AI compatibility
});

// Feature Grid Schema
export const featureGridSchema = z.object({
  title: z.string().optional(),
  features: z.array(featureSchema).min(1, "At least one feature is required"),
  columns: z.enum(["2", "3", "4"]).optional().default("3"),
});

export type Feature = z.infer<typeof featureSchema>;
export type FeatureGridProps = z.infer<typeof featureGridSchema>;

// Pricing Tier Schema
export const pricingTierSchema = z.object({
  name: z.string().min(1, "Tier name is required"),
  price: z.string().min(1, "Price is required"),
  period: z.string().optional(),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  highlighted: z.boolean().optional().default(false),
  ctaText: z.string().optional().default("Get Started"),
});

// Pricing Table Schema
export const pricingTableSchema = z.object({
  title: z.string().optional(),
  tiers: z.array(pricingTierSchema).min(1, "At least one tier is required"),
});

export type PricingTier = z.infer<typeof pricingTierSchema>;
export type PricingTableProps = z.infer<typeof pricingTableSchema>;

// Call to Action Schema
export const callToActionSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  description: z.string().optional(),
  primaryButton: z.object({
    text: z.string().min(1, "Button text is required"),
    link: z.string().optional(), // Relaxed validation for AI compatibility
  }),
  secondaryButton: z.object({
    text: z.string().min(1, "Button text is required"),
    link: z.string().optional(), // Relaxed validation for AI compatibility
  }).optional(),
  backgroundColor: z.enum(["primary", "secondary", "accent"]).optional().default("primary"),
});

export type CallToActionProps = z.infer<typeof callToActionSchema>;