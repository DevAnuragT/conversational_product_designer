/**
 * Component Variation Generator
 * Generates multiple design variations for components
 */

import { ComponentInstance } from '@/lib/export';

export interface ComponentVariation {
  id: string;
  name: string;
  props: Record<string, any>;
  variationType: 'color' | 'layout' | 'content' | 'style';
  description: string;
}

export interface VariationRequest {
  component: ComponentInstance;
  count?: number;
  variationTypes?: ('color' | 'layout' | 'content' | 'style')[];
}

/**
 * Generate variation prompts for Tambo
 */
export function generateVariationPrompt(
  component: ComponentInstance,
  variationType: 'color' | 'layout' | 'content' | 'style'
): string {
  const componentName = component.name;
  const currentProps = JSON.stringify(component.props, null, 2);

  const prompts = {
    color: `Generate a color scheme variation of this ${componentName} component. Keep the same layout and content, but change the color palette to create a different mood. Current props: ${currentProps}`,
    
    layout: `Generate a layout variation of this ${componentName} component. Keep the same content and color scheme, but rearrange the layout structure. Current props: ${currentProps}`,
    
    content: `Generate a content emphasis variation of this ${componentName} component. Keep the same layout and colors, but adjust content hierarchy and emphasis. Current props: ${currentProps}`,
    
    style: `Generate a style variation of this ${componentName} component. Keep the same content, but change the visual style (e.g., from minimal to bold, or professional to playful). Current props: ${currentProps}`,
  };

  return prompts[variationType];
}

/**
 * Color scheme variations
 */
const colorSchemes = {
  blue: { primary: 'blue', secondary: 'indigo', accent: 'sky' },
  purple: { primary: 'purple', secondary: 'violet', accent: 'fuchsia' },
  green: { primary: 'green', secondary: 'emerald', accent: 'teal' },
  orange: { primary: 'orange', secondary: 'amber', accent: 'yellow' },
  red: { primary: 'red', secondary: 'rose', accent: 'pink' },
  gray: { primary: 'gray', secondary: 'slate', accent: 'zinc' },
  indigo: { primary: 'indigo', secondary: 'blue', accent: 'cyan' },
  teal: { primary: 'teal', secondary: 'cyan', accent: 'sky' },
};

/**
 * Deep clone and replace color values in props
 */
function replaceColorsInProps(props: any, colorMap: Record<string, string>): any {
  if (typeof props !== 'object' || props === null) {
    return props;
  }

  if (Array.isArray(props)) {
    return props.map(item => replaceColorsInProps(item, colorMap));
  }

  const result: any = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      // Replace color values in strings
      let newValue = value;
      for (const [oldColor, newColor] of Object.entries(colorMap)) {
        // Match Tailwind color classes like bg-blue-600, text-blue-500, etc.
        const regex = new RegExp(`\\b(bg|text|border|ring|from|to|via)-${oldColor}-(\\d+)\\b`, 'g');
        newValue = newValue.replace(regex, `$1-${newColor}-$2`);
      }
      result[key] = newValue;
    } else if (typeof value === 'object') {
      result[key] = replaceColorsInProps(value, colorMap);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Generate color variations locally (without Tambo)
 */
export function generateColorVariations(
  component: ComponentInstance,
  count: number = 3
): ComponentVariation[] {
  const variations: ComponentVariation[] = [];
  const schemes = Object.entries(colorSchemes);
  
  // Get random color schemes
  const selectedSchemes = schemes
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  selectedSchemes.forEach(([name, colors], index) => {
    // Deep clone props
    const variedProps = JSON.parse(JSON.stringify(component.props));
    
    // Create color mapping from common colors to new scheme
    const colorMap: Record<string, string> = {
      'blue': colors.primary,
      'indigo': colors.secondary,
      'purple': colors.primary,
      'green': colors.primary,
      'red': colors.primary,
      'orange': colors.primary,
      'gray': colors.secondary,
      'slate': colors.secondary,
      'sky': colors.accent,
      'cyan': colors.accent,
      'teal': colors.accent,
    };
    
    // Replace colors throughout the props
    const updatedProps = replaceColorsInProps(variedProps, colorMap);
    
    // Also update specific color scheme props if they exist
    if (updatedProps.colorScheme) {
      updatedProps.colorScheme = name;
    }
    if (updatedProps.buttonColor) {
      updatedProps.buttonColor = colors.primary;
    }
    if (updatedProps.accentColor) {
      updatedProps.accentColor = colors.accent;
    }

    variations.push({
      id: `${component.id}-color-${index}`,
      name: component.name,
      props: updatedProps,
      variationType: 'color',
      description: `${name.charAt(0).toUpperCase() + name.slice(1)} color scheme`,
    });
  });

  return variations;
}

/**
 * Generate layout variations locally
 */
export function generateLayoutVariations(
  component: ComponentInstance,
  count: number = 2
): ComponentVariation[] {
  const variations: ComponentVariation[] = [];
  const componentName = component.name;

  // Layout variations based on component type
  if (componentName === 'HeroSection' || componentName === 'HeroSplit') {
    // Swap image position
    const variation1 = JSON.parse(JSON.stringify(component.props));
    if (variation1.imagePosition) {
      variation1.imagePosition = variation1.imagePosition === 'left' ? 'right' : 'left';
    }
    
    variations.push({
      id: `${component.id}-layout-0`,
      name: component.name,
      props: variation1,
      variationType: 'layout',
      description: 'Flipped image position',
    });
    
    // Center-aligned variation
    const variation2 = JSON.parse(JSON.stringify(component.props));
    if (variation2.alignment) {
      variation2.alignment = 'center';
    }
    
    variations.push({
      id: `${component.id}-layout-1`,
      name: component.name,
      props: variation2,
      variationType: 'layout',
      description: 'Center-aligned layout',
    });
  }

  if (componentName === 'FeatureGrid') {
    // Change grid columns
    const currentCols = component.props.columns || 3;
    
    // 2-column variation
    if (currentCols !== 2) {
      variations.push({
        id: `${component.id}-layout-0`,
        name: component.name,
        props: { ...component.props, columns: 2 },
        variationType: 'layout',
        description: '2-column layout',
      });
    }
    
    // 4-column variation
    if (currentCols !== 4) {
      variations.push({
        id: `${component.id}-layout-1`,
        name: component.name,
        props: { ...component.props, columns: 4 },
        variationType: 'layout',
        description: '4-column layout',
      });
    }
  }
  
  if (componentName === 'Process') {
    // Change layout orientation
    const currentLayout = component.props.layout || 'vertical';
    
    if (currentLayout === 'vertical') {
      variations.push({
        id: `${component.id}-layout-0`,
        name: component.name,
        props: { ...component.props, layout: 'horizontal' },
        variationType: 'layout',
        description: 'Horizontal layout',
      });
    } else {
      variations.push({
        id: `${component.id}-layout-0`,
        name: component.name,
        props: { ...component.props, layout: 'vertical' },
        variationType: 'layout',
        description: 'Vertical layout',
      });
    }
  }

  if (componentName === 'PricingTable' || componentName === 'PricingCompact') {
    // Change layout orientation
    const variation1 = JSON.parse(JSON.stringify(component.props));
    if (variation1.layout) {
      variation1.layout = variation1.layout === 'horizontal' ? 'vertical' : 'horizontal';
    }
    
    variations.push({
      id: `${component.id}-layout-0`,
      name: component.name,
      props: variation1,
      variationType: 'layout',
      description: 'Alternative layout orientation',
    });
  }

  return variations.slice(0, count);
}

/**
 * Generate content emphasis variations
 */
export function generateContentVariations(
  component: ComponentInstance,
  count: number = 2
): ComponentVariation[] {
  const variations: ComponentVariation[] = [];

  // Variation 1: Emphasize headline
  if (component.props.headline) {
    variations.push({
      id: `${component.id}-content-0`,
      name: component.name,
      props: {
        ...component.props,
        headlineSize: 'large',
        subheadlineSize: 'normal',
      },
      variationType: 'content',
      description: 'Emphasized headline',
    });
  }

  // Variation 2: Emphasize description
  if (component.props.description || component.props.subheadline) {
    variations.push({
      id: `${component.id}-content-1`,
      name: component.name,
      props: {
        ...component.props,
        headlineSize: 'normal',
        subheadlineSize: 'large',
      },
      variationType: 'content',
      description: 'Emphasized description',
    });
  }

  return variations.slice(0, count);
}

/**
 * Generate all variations for a component
 */
export function generateAllVariations(
  component: ComponentInstance,
  options: {
    colorCount?: number;
    layoutCount?: number;
    contentCount?: number;
  } = {}
): ComponentVariation[] {
  const {
    colorCount = 3,
    layoutCount = 2,
    contentCount = 2,
  } = options;

  const variations: ComponentVariation[] = [];

  // Generate color variations
  variations.push(...generateColorVariations(component, colorCount));

  // Generate layout variations
  variations.push(...generateLayoutVariations(component, layoutCount));

  // Generate content variations
  variations.push(...generateContentVariations(component, contentCount));

  return variations;
}

/**
 * Track user preferences for learning
 */
export interface VariationPreference {
  componentType: string;
  variationType: 'color' | 'layout' | 'content' | 'style';
  selectedVariation: string;
  timestamp: number;
}

export class PreferenceTracker {
  private preferences: VariationPreference[] = [];
  private storageKey = 'tambo-variation-preferences';

  constructor() {
    this.loadPreferences();
  }

  trackSelection(
    componentType: string,
    variationType: 'color' | 'layout' | 'content' | 'style',
    selectedVariation: string
  ) {
    const preference: VariationPreference = {
      componentType,
      variationType,
      selectedVariation,
      timestamp: Date.now(),
    };

    this.preferences.push(preference);
    this.savePreferences();
  }

  getPreferences(componentType?: string): VariationPreference[] {
    if (componentType) {
      return this.preferences.filter(p => p.componentType === componentType);
    }
    return this.preferences;
  }

  getMostPreferredVariationType(componentType: string): string | null {
    const prefs = this.getPreferences(componentType);
    if (prefs.length === 0) return null;

    const counts: Record<string, number> = {};
    prefs.forEach(p => {
      counts[p.variationType] = (counts[p.variationType] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  private loadPreferences() {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.preferences = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }

  private savePreferences() {
    if (typeof window === 'undefined') return;
    
    try {
      // Keep only last 100 preferences
      const recentPrefs = this.preferences.slice(-100);
      localStorage.setItem(this.storageKey, JSON.stringify(recentPrefs));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }
}
