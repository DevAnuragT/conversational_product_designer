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
  icon: z.string().optional().describe('Icon name as simple text keyword (e.g., "star", "rocket", "chart", "shield", "speed", "support", "sparkle", "dumbbell", "utensils", "analytics"). Do NOT use SVG code or emoji.'),
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

// Testimonials Schema
export const testimonialSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  content: z.string().optional(),
  rating: z.number().optional(),
  avatar: z.string().optional(),
});

export const testimonialsSchema = z.object({
  title: z.string().optional(),
  testimonials: z.array(testimonialSchema).optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
export type TestimonialsProps = z.infer<typeof testimonialsSchema>;

// FAQ Schema
export const faqItemSchema = z.object({
  question: z.string().optional(),
  answer: z.string().optional(),
});

export const faqSchema = z.object({
  title: z.string().optional(),
  faqs: z.array(faqItemSchema).optional(),
  colorScheme: z.string().optional(),
});

export type FAQItem = z.infer<typeof faqItemSchema>;
export type FAQProps = z.infer<typeof faqSchema>;

// Stats Schema
export const statItemSchema = z.object({
  value: z.string().optional(),
  label: z.string().optional(),
});

export const statsSchema = z.object({
  title: z.string().optional(),
  stats: z.array(statItemSchema).optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type StatItem = z.infer<typeof statItemSchema>;
export type StatsProps = z.infer<typeof statsSchema>;

// Logo Cloud Schema
export const logoSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
});

export const logoCloudSchema = z.object({
  title: z.string().optional(),
  logos: z.array(logoSchema).optional(),
  colorScheme: z.string().optional(),
});

export type Logo = z.infer<typeof logoSchema>;
export type LogoCloudProps = z.infer<typeof logoCloudSchema>;

// Newsletter Schema
export const newsletterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  placeholder: z.string().optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type NewsletterProps = z.infer<typeof newsletterSchema>;

// Contact Form Schema
export const contactFieldSchema = z.object({
  name: z.string().optional(),
  label: z.string().optional(),
  type: z.string().optional(),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
});

export const contactFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(contactFieldSchema).optional(),
  buttonText: z.string().optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type ContactField = z.infer<typeof contactFieldSchema>;
export type ContactFormProps = z.infer<typeof contactFormSchema>;

// Team Schema
export const teamMemberSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  social: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
});

export const teamSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  members: z.array(teamMemberSchema).optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamProps = z.infer<typeof teamSchema>;

// Video Section Schema
export const videoSectionSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  thumbnail: z.string().optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type VideoSectionProps = z.infer<typeof videoSectionSchema>;

// Comparison Table Schema
export const comparisonPlanSchema = z.object({
  name: z.string().optional(),
  values: z.array(z.boolean()).optional(),
});

export const comparisonTableSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  plans: z.array(comparisonPlanSchema).optional(),
  colorScheme: z.string().optional(),
});

export type ComparisonPlan = z.infer<typeof comparisonPlanSchema>;
export type ComparisonTableProps = z.infer<typeof comparisonTableSchema>;

// Process/Steps Schema
export const processStepSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional().describe('Icon name as simple text keyword (e.g., "star", "rocket", "chart", "shield", "speed", "support", "sparkle"). Do NOT use SVG code or emoji.'),
});

export const processSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  steps: z.array(processStepSchema).optional(),
  colorScheme: z.string().optional(),
  layout: z.string().optional(),
});

export type ProcessStep = z.infer<typeof processStepSchema>;
export type ProcessProps = z.infer<typeof processSchema>;

// Feature List Schema (alternative to FeatureGrid)
export const featureListSchema = z.object({
  title: z.string().optional(),
  features: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  image: z.string().optional(),
  imagePosition: z.string().optional(),
  colorScheme: z.string().optional(),
});

export type FeatureListProps = z.infer<typeof featureListSchema>;

// CTA Banner Schema (alternative to CallToAction)
export const ctaBannerSchema = z.object({
  text: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  secondaryText: z.string().optional(),
  colorScheme: z.string().optional(),
});

export type CTABannerProps = z.infer<typeof ctaBannerSchema>;

// Pricing Compact Schema (alternative to PricingTable)
export const pricingCompactSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  plans: z.array(z.object({
    name: z.string().optional(),
    price: z.string().optional(),
    period: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  colorScheme: z.string().optional(),
});

export type PricingCompactProps = z.infer<typeof pricingCompactSchema>;

// Hero Split Schema (alternative to HeroSection)
export const heroSplitSchema = z.object({
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  image: z.string().optional(),
  features: z.array(z.string()).optional(),
  colorScheme: z.string().optional(),
});

export type HeroSplitProps = z.infer<typeof heroSplitSchema>;

// Stats Minimal Schema (alternative to Stats)
export const statsMinimalSchema = z.object({
  stats: z.array(z.object({
    value: z.string().optional(),
    label: z.string().optional(),
  })).optional(),
  colorScheme: z.string().optional(),
});

export type StatsMinimalProps = z.infer<typeof statsMinimalSchema>;