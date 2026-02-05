import { z } from 'zod';

// Helper function to handle null/undefined strings
const stringWithDefault = (defaultValue: string) => 
  z.union([z.string(), z.null(), z.undefined()]).transform(val => val || defaultValue);

// Hero Section Schema - ultra-relaxed validation for AI compatibility
export const heroSectionSchema = z.object({
  headline: stringWithDefault("Welcome to Our Product"),
  subheadline: stringWithDefault("Discover amazing features that will transform your experience"),
  ctaText: stringWithDefault("Get Started"),
  ctaLink: z.union([z.string(), z.null(), z.undefined()]).optional(),
  backgroundImage: z.union([z.string(), z.null(), z.undefined()]).optional(),
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;

// Feature Schema
export const featureSchema = z.object({
  title: stringWithDefault("Feature Title"),
  description: stringWithDefault("Feature description goes here"),
  icon: z.union([z.string(), z.null(), z.undefined()]).optional(),
});

// Feature Grid Schema
export const featureGridSchema = z.object({
  title: z.union([z.string(), z.null(), z.undefined()]).optional(),
  features: z.array(featureSchema).min(1).default([{
    title: "Amazing Feature",
    description: "This feature will help you achieve your goals",
    icon: "⭐"
  }]),
  columns: z.enum(["2", "3", "4"]).optional().default("3"),
});

export type Feature = z.infer<typeof featureSchema>;
export type FeatureGridProps = z.infer<typeof featureGridSchema>;

// Pricing Tier Schema
export const pricingTierSchema = z.object({
  name: stringWithDefault("Plan"),
  price: stringWithDefault("$0"),
  period: z.union([z.string(), z.null(), z.undefined()]).optional(),
  features: z.array(z.string()).min(1).default(["Feature included"]),
  highlighted: z.boolean().optional().default(false),
  ctaText: stringWithDefault("Get Started"),
});

// Pricing Table Schema
export const pricingTableSchema = z.object({
  title: z.union([z.string(), z.null(), z.undefined()]).optional(),
  tiers: z.array(pricingTierSchema).min(1).default([{
    name: "Basic Plan",
    price: "$9",
    period: "month",
    features: ["Basic features", "Email support"],
    highlighted: false,
    ctaText: "Get Started"
  }]),
});

export type PricingTier = z.infer<typeof pricingTierSchema>;
export type PricingTableProps = z.infer<typeof pricingTableSchema>;

// Call to Action Schema
export const callToActionSchema = z.object({
  headline: stringWithDefault("Ready to Get Started?"),
  description: z.union([z.string(), z.null(), z.undefined()]).optional(),
  primaryButton: z.object({
    text: stringWithDefault("Get Started"),
    link: z.union([z.string(), z.null(), z.undefined()]).optional(),
  }).default({ text: "Get Started" }),
  secondaryButton: z.object({
    text: stringWithDefault("Learn More"),
    link: z.union([z.string(), z.null(), z.undefined()]).optional(),
  }).optional(),
  backgroundColor: z.enum(["primary", "secondary", "accent"]).optional().default("primary"),
});

export type CallToActionProps = z.infer<typeof callToActionSchema>;