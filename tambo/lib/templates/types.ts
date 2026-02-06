/**
 * Template System Types
 */

export interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  colorScheme: string;
  components: TemplateComponent[];
  preview?: string;
}

export interface TemplateComponent {
  type: string;
  props: any;
}

export type Industry = 'saas' | 'ecommerce' | 'healthcare' | 'finance' | 'education';
