import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import PricingTable from '@/components/landing/PricingTable';
import CallToAction from '@/components/landing/CallToAction';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Stats from '@/components/landing/Stats';
import LogoCloud from '@/components/landing/LogoCloud';
import Newsletter from '@/components/landing/Newsletter';
import ContactForm from '@/components/landing/ContactForm';
import Team from '@/components/landing/Team';
import VideoSection from '@/components/landing/VideoSection';
import ComparisonTable from '@/components/landing/ComparisonTable';
import Process from '@/components/landing/Process';
import FeatureList from '@/components/landing/FeatureList';
import CTABanner from '@/components/landing/CTABanner';
import PricingCompact from '@/components/landing/PricingCompact';
import HeroSplit from '@/components/landing/HeroSplit';
import StatsMinimal from '@/components/landing/StatsMinimal';

import {
  heroSectionSchema,
  featureGridSchema,
  pricingTableSchema,
  callToActionSchema,
  testimonialsSchema,
  faqSchema,
  statsSchema,
  logoCloudSchema,
  newsletterSchema,
  contactFormSchema,
  teamSchema,
  videoSectionSchema,
  comparisonTableSchema,
  processSchema,
  featureListSchema,
  ctaBannerSchema,
  pricingCompactSchema,
  heroSplitSchema,
  statsMinimalSchema,
} from './schemas';

export const componentRegistry = [
  {
    name: "HeroSection",
    description: "Primary landing page hero with headline, subheadline, and CTA",
    component: HeroSection,
    propsSchema: heroSectionSchema,
  },
  {
    name: "HeroSplit",
    description: "Alternative hero with split image/content layout",
    component: HeroSplit,
    propsSchema: heroSplitSchema,
  },
  {
    name: "FeatureGrid", 
    description: "Grid layout displaying multiple features with icons and descriptions. Use simple icon keywords like 'star', 'rocket', 'chart', 'shield', 'speed', 'support' for the icon field.",
    component: FeatureGrid,
    propsSchema: featureGridSchema,
  },
  {
    name: "FeatureList",
    description: "Alternative features in list format with image",
    component: FeatureList,
    propsSchema: featureListSchema,
  },
  {
    name: "PricingTable",
    description: "Comparative pricing display with multiple tiers and features",
    component: PricingTable,
    propsSchema: pricingTableSchema,
  },
  {
    name: "PricingCompact",
    description: "Alternative compact pricing layout",
    component: PricingCompact,
    propsSchema: pricingCompactSchema,
  },
  {
    name: "CallToAction",
    description: "Conversion-focused section with primary and secondary actions",
    component: CallToAction,
    propsSchema: callToActionSchema,
  },
  {
    name: "CTABanner",
    description: "Alternative compact CTA banner",
    component: CTABanner,
    propsSchema: ctaBannerSchema,
  },
  {
    name: "Stats",
    description: "Key metrics and statistics display",
    component: Stats,
    propsSchema: statsSchema,
  },
  {
    name: "StatsMinimal",
    description: "Alternative minimal inline stats",
    component: StatsMinimal,
    propsSchema: statsMinimalSchema,
  },
  {
    name: "Testimonials",
    description: "Customer testimonials and reviews with ratings and avatars",
    component: Testimonials,
    propsSchema: testimonialsSchema,
  },
  {
    name: "FAQ",
    description: "Frequently asked questions with expandable answers",
    component: FAQ,
    propsSchema: faqSchema,
  },
  {
    name: "LogoCloud",
    description: "Partner or client logos showcase",
    component: LogoCloud,
    propsSchema: logoCloudSchema,
  },
  {
    name: "Newsletter",
    description: "Email newsletter signup form",
    component: Newsletter,
    propsSchema: newsletterSchema,
  },
  {
    name: "ContactForm",
    description: "Contact form with customizable fields",
    component: ContactForm,
    propsSchema: contactFormSchema,
  },
  {
    name: "Team",
    description: "Team members showcase with photos and bios",
    component: Team,
    propsSchema: teamSchema,
  },
  {
    name: "VideoSection",
    description: "Video embed section with title and description",
    component: VideoSection,
    propsSchema: videoSectionSchema,
  },
  {
    name: "ComparisonTable",
    description: "Feature comparison table across different plans",
    component: ComparisonTable,
    propsSchema: comparisonTableSchema,
  },
  {
    name: "Process",
    description: "Step-by-step process or workflow display. Use simple icon keywords like 'star', 'rocket', 'chart' for the icon field.",
    component: Process,
    propsSchema: processSchema,
  },
];

export type ComponentName = typeof componentRegistry[number]['name'];