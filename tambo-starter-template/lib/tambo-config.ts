import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import PricingTable from '@/components/landing/PricingTable';
import CallToAction from '@/components/landing/CallToAction';

import {
  heroSectionSchema,
  featureGridSchema,
  pricingTableSchema,
  callToActionSchema,
} from './schemas';

export const componentRegistry = [
  {
    name: "HeroSection",
    description: "Primary landing page hero with headline, subheadline, and CTA",
    component: HeroSection,
    propsSchema: heroSectionSchema,
  },
  {
    name: "FeatureGrid", 
    description: "Grid layout displaying multiple features with icons and descriptions",
    component: FeatureGrid,
    propsSchema: featureGridSchema,
  },
  {
    name: "PricingTable",
    description: "Comparative pricing display with multiple tiers and features",
    component: PricingTable,
    propsSchema: pricingTableSchema,
  },
  {
    name: "CallToAction",
    description: "Conversion-focused section with primary and secondary actions",
    component: CallToAction,
    propsSchema: callToActionSchema,
  },
];

export type ComponentName = typeof componentRegistry[number]['name'];