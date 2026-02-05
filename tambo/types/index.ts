// Re-export all types from schemas for convenience
export type {
  HeroSectionProps,
  Feature,
  FeatureGridProps,
  PricingTier,
  PricingTableProps,
  CallToActionProps,
} from '../lib/schemas';

// Additional utility types
export interface ComponentRegistryItem {
  name: string;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
  propsSchema: Record<string, unknown>;
}

export interface GenerationState {
  isLoading: boolean;
  error?: string;
  lastGenerated?: Date;
}