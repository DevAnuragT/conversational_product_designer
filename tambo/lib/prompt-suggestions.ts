/**
 * Advanced Prompt Suggestions System
 */

export interface PromptSuggestion {
  text: string;
  category: 'component' | 'industry' | 'style' | 'content';
  priority: number;
}

export function getPromptSuggestions(currentPrompt: string): PromptSuggestion[] {
  const prompt = currentPrompt.toLowerCase();
  const suggestions: PromptSuggestion[] = [];
  
  // Component suggestions
  if (!prompt.includes('hero') && !prompt.includes('header')) {
    suggestions.push({
      text: 'Add a hero section with compelling headline',
      category: 'component',
      priority: 10
    });
  }
  
  if (!prompt.includes('feature') && !prompt.includes('benefit')) {
    suggestions.push({
      text: 'Include 3-4 key features or benefits',
      category: 'component',
      priority: 9
    });
  }
  
  if (!prompt.includes('pricing') && !prompt.includes('price') && !prompt.includes('plan')) {
    suggestions.push({
      text: 'Add pricing information with 2-3 tiers',
      category: 'component',
      priority: 8
    });
  }
  
  if (!prompt.includes('cta') && !prompt.includes('call to action') && !prompt.includes('button')) {
    suggestions.push({
      text: 'End with a strong call-to-action',
      category: 'component',
      priority: 10
    });
  }
  
  if (!prompt.includes('testimonial') && !prompt.includes('review') && !prompt.includes('social proof')) {
    suggestions.push({
      text: 'Add customer testimonials for credibility',
      category: 'component',
      priority: 6
    });
  }
  
  // Industry suggestions
  if (!hasIndustryKeyword(prompt)) {
    suggestions.push({
      text: 'Specify your industry (SaaS, E-commerce, Healthcare, etc.)',
      category: 'industry',
      priority: 7
    });
  }
  
  // Style suggestions
  if (!hasStyleKeyword(prompt)) {
    suggestions.push({
      text: 'Describe your desired style (modern, professional, playful, etc.)',
      category: 'style',
      priority: 5
    });
  }
  
  // Content suggestions
  if (!hasTargetAudience(prompt)) {
    suggestions.push({
      text: 'Mention your target audience (developers, businesses, consumers, etc.)',
      category: 'content',
      priority: 6
    });
  }
  
  if (!hasValueProposition(prompt)) {
    suggestions.push({
      text: 'Highlight your unique value proposition',
      category: 'content',
      priority: 8
    });
  }
  
  // Sort by priority
  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

function hasIndustryKeyword(prompt: string): boolean {
  const industries = ['saas', 'software', 'ecommerce', 'e-commerce', 'retail', 'healthcare', 
                     'medical', 'finance', 'banking', 'fintech', 'education', 'learning'];
  return industries.some(industry => prompt.includes(industry));
}

function hasStyleKeyword(prompt: string): boolean {
  const styles = ['modern', 'professional', 'playful', 'minimal', 'bold', 'elegant', 
                 'clean', 'vibrant', 'dark', 'light'];
  return styles.some(style => prompt.includes(style));
}

function hasTargetAudience(prompt: string): boolean {
  const audiences = ['developer', 'business', 'consumer', 'enterprise', 'startup', 
                    'team', 'professional', 'student', 'user'];
  return audiences.some(audience => prompt.includes(audience));
}

function hasValueProposition(prompt: string): boolean {
  const valueWords = ['help', 'solve', 'improve', 'increase', 'reduce', 'save', 
                     'faster', 'better', 'easier', 'best', 'leading'];
  return valueWords.some(word => prompt.includes(word));
}

export function getAutoCompleteOptions(currentPrompt: string): string[] {
  const prompt = currentPrompt.toLowerCase();
  const lastWord = prompt.split(' ').pop() || '';
  
  const options: string[] = [];
  
  // Component completions
  if (lastWord.startsWith('her')) {
    options.push('hero section', 'hero with image', 'hero with video');
  }
  if (lastWord.startsWith('feat')) {
    options.push('feature grid', 'feature list', 'features section');
  }
  if (lastWord.startsWith('pric')) {
    options.push('pricing table', 'pricing plans', 'pricing tiers');
  }
  if (lastWord.startsWith('test')) {
    options.push('testimonials', 'testimonial slider', 'customer reviews');
  }
  if (lastWord.startsWith('cta') || lastWord.startsWith('call')) {
    options.push('call-to-action', 'CTA section', 'CTA banner');
  }
  
  // Industry completions
  if (lastWord.startsWith('saa')) {
    options.push('SaaS product', 'SaaS platform', 'SaaS application');
  }
  if (lastWord.startsWith('ecom') || lastWord.startsWith('e-com')) {
    options.push('e-commerce store', 'e-commerce platform', 'online store');
  }
  if (lastWord.startsWith('health')) {
    options.push('healthcare service', 'health app', 'medical platform');
  }
  if (lastWord.startsWith('fin')) {
    options.push('fintech app', 'financial service', 'banking platform');
  }
  if (lastWord.startsWith('edu')) {
    options.push('education platform', 'learning app', 'online course');
  }
  
  return options.slice(0, 5);
}

export const promptTemplates = [
  {
    name: 'SaaS Product',
    template: 'Create a landing page for [Product Name], a SaaS platform that helps [target audience] [solve problem]. Include a hero section, feature grid with 3 key benefits, pricing table with 3 tiers, and call-to-action.'
  },
  {
    name: 'E-commerce Store',
    template: 'Design a landing page for [Store Name], an online store selling [products]. Include a hero with featured products, benefits section, customer testimonials, and strong call-to-action with special offer.'
  },
  {
    name: 'Mobile App',
    template: 'Build a landing page for [App Name], a mobile app that [main benefit]. Include hero with app preview, feature highlights, user testimonials, pricing plans, and download CTA.'
  },
  {
    name: 'Professional Service',
    template: 'Create a landing page for [Service Name], offering [service type] for [target audience]. Include hero section, service benefits, process steps, testimonials, and contact CTA.'
  },
  {
    name: 'Course/Education',
    template: 'Design a landing page for [Course Name], teaching [subject] to [audience]. Include hero with course overview, curriculum highlights, instructor bio, pricing options, and enrollment CTA.'
  }
];
