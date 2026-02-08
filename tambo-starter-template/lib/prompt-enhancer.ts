/**
 * Prompt Enhancement Utility
 * Automatically enhances user prompts to get better results from Tambo AI
 */

export interface PromptEnhancementOptions {
  includeComponentInfo?: boolean;
  includeBestPractices?: boolean;
  includeStyleGuidance?: boolean;
  enhanceBusinessContext?: boolean;
}

const COMPONENT_INFO = `
IMPORTANT: Create a COMPLETE landing page by composing MULTIPLE components together in sequence.

Available components to compose:
- HeroSection or HeroSplit: Start with one of these as the page header
- FeatureGrid or FeatureList: Show product features/benefits
- Stats or StatsMinimal: Display key metrics
- Testimonials: Customer reviews and social proof
- PricingTable or PricingCompact: Show pricing options
- FAQ: Answer common questions
- CallToAction or CTABanner: End with conversion section
- Plus: LogoCloud, Newsletter, ContactForm, Team, VideoSection, ComparisonTable, Process

You MUST compose 4-6 components together to create a complete landing page, not just a single component.
`;

const STYLE_GUIDANCE = `
Style preferences: Use professional, modern design with clear value propositions, compelling headlines, and action-oriented language. Vary the colorScheme prop across components for visual variety.
`;

const BEST_PRACTICES = `
Best practices: Compose multiple components (4-6) to build a complete landing page. Include specific details like number of features (2-4), pricing tiers (2-3), and clear benefit statements. Use concrete examples rather than generic descriptions.
`;



/**
 * Detects if user is asking for app UI vs landing page
 */
function detectAppUIRequest(prompt: string): boolean {
  const appUIKeywords = [
    'home page', 'home screen', 'dashboard', 'navigation', 'nav bar', 'bottom nav',
    'settings page', 'profile page', 'timer interface', 'app interface',
    'charts', 'graphs', 'analytics', 'user interface', 'ui screen',
    'mobile app', 'app home', 'main screen', 'interface design'
  ];
  
  const lowerPrompt = prompt.toLowerCase();
  return appUIKeywords.some(keyword => lowerPrompt.includes(keyword));
}

/**
 * Enhances a user prompt to get better AI-generated landing pages
 */
export function enhancePrompt(
  originalPrompt: string, 
  options: PromptEnhancementOptions = {}
): string {
  const {
    includeComponentInfo = true,
    includeBestPractices = true,
    includeStyleGuidance = true,
    enhanceBusinessContext = true
  } = options;

  let enhancedPrompt = originalPrompt.trim();

  // Check if user is asking for app UI instead of landing page
  if (detectAppUIRequest(enhancedPrompt)) {
    // Don't enhance - this will likely produce poor results
    // The analysis function will warn the user
    return enhancedPrompt;
  }

  // Don't enhance if prompt is already detailed (>200 chars) or already mentions components
  const isAlreadyDetailed = enhancedPrompt.length > 200 || 
    /hero|feature|pricing|cta|call.to.action/i.test(enhancedPrompt);

  if (isAlreadyDetailed) {
    return enhancedPrompt;
  }

  // Enhance business context if the prompt is very basic
  if (enhanceBusinessContext && enhancedPrompt.length < 50) {
    enhancedPrompt = enhanceBusinessContextText(enhancedPrompt);
  }

  // Add component suggestions based on prompt content
  const componentSuggestions = suggestComponents(enhancedPrompt);
  if (componentSuggestions) {
    enhancedPrompt += `. ${componentSuggestions}`;
  }

  // Add style guidance
  if (includeStyleGuidance) {
    enhancedPrompt += ` ${STYLE_GUIDANCE}`;
  }

  // Add best practices
  if (includeBestPractices) {
    enhancedPrompt += ` ${BEST_PRACTICES}`;
  }

  // Add component info if requested
  if (includeComponentInfo) {
    enhancedPrompt += ` ${COMPONENT_INFO}`;
  }

  return enhancedPrompt;
}

/**
 * Enhances basic business context
 */
function enhanceBusinessContextText(prompt: string): string {
  const businessKeywords = {
    'saas': 'SaaS productivity platform',
    'app': 'mobile application',
    'software': 'software solution',
    'service': 'professional service',
    'product': 'innovative product',
    'startup': 'startup company',
    'business': 'business solution',
    'tool': 'productivity tool',
    'platform': 'digital platform'
  };

  let enhanced = prompt;
  
  // Add context if prompt is very generic
  if (prompt.length < 30) {
    for (const [keyword, expansion] of Object.entries(businessKeywords)) {
      if (prompt.toLowerCase().includes(keyword)) {
        enhanced = enhanced.replace(new RegExp(keyword, 'gi'), expansion);
        break;
      }
    }
  }

  return enhanced;
}

/**
 * Suggests appropriate components based on prompt content
 */
function suggestComponents(prompt: string): string | null {
  const lowerPrompt = prompt.toLowerCase();
  const suggestions: string[] = [];

  // Build a complete page structure
  suggestions.push('Build a complete landing page with these components in order:');

  // Always start with hero
  if (!lowerPrompt.includes('hero')) {
    suggestions.push('1) Start with HeroSection or HeroSplit');
  }

  // Suggest features
  if ((lowerPrompt.includes('feature') || lowerPrompt.includes('benefit') || 
       lowerPrompt.includes('advantage')) && !lowerPrompt.includes('grid')) {
    suggestions.push('2) Add FeatureGrid or FeatureList with 3-4 features');
  }

  // Suggest social proof
  if (!lowerPrompt.includes('testimonial') && !lowerPrompt.includes('review')) {
    suggestions.push('3) Include Testimonials or Stats for credibility');
  }

  // Suggest pricing
  if ((lowerPrompt.includes('price') || lowerPrompt.includes('plan') || 
       lowerPrompt.includes('cost') || lowerPrompt.includes('subscription')) && 
       !lowerPrompt.includes('pricing')) {
    suggestions.push('4) Add PricingTable or PricingCompact with 2-3 tiers');
  }

  // Always end with CTA
  if (!lowerPrompt.includes('cta') && !lowerPrompt.includes('call to action')) {
    suggestions.push('5) End with CallToAction or CTABanner');
  }

  return suggestions.length > 1 ? suggestions.join(' ') : null;
}

/**
 * Analyzes prompt and provides enhancement suggestions to the user
 */
export function analyzePrompt(prompt: string): {
  score: number;
  suggestions: string[];
  missingElements: string[];
  isAppUIRequest?: boolean;
  warning?: string;
} {
  let score = 0;
  const suggestions: string[] = [];
  const missingElements: string[] = [];

  // Check if this is an app UI request
  const isAppUIRequest = detectAppUIRequest(prompt);
  if (isAppUIRequest) {
    return {
      score: 0,
      suggestions: [
        "This system creates LANDING PAGES, not app interfaces",
        "Try: 'Create a landing page for TimeTracker app with hero, features, pricing, and download CTA'",
        "For app UI, use component libraries like Chakra UI or design tools like Figma"
      ],
      missingElements: [],
      isAppUIRequest: true,
      warning: "⚠️ App UI Request Detected - This tool creates marketing landing pages, not app interfaces"
    };
  }

  // Check for component mentions
  const hasHero = /hero|header|headline/i.test(prompt);
  const hasFeatures = /feature|benefit|advantage/i.test(prompt);
  const hasPricing = /pric|plan|tier|cost/i.test(prompt);
  const hasCTA = /cta|call.to.action|button|sign.up|get.started/i.test(prompt);

  if (hasHero) score += 25;
  else missingElements.push('hero section');

  if (hasFeatures) score += 25;
  else missingElements.push('features');

  if (hasPricing) score += 25;
  else missingElements.push('pricing');

  if (hasCTA) score += 25;
  else missingElements.push('call-to-action');

  // Check for specificity
  if (prompt.length > 100) score += 10;
  else suggestions.push('Add more specific details about your product/service');

  if (/\d+/.test(prompt)) score += 10;
  else suggestions.push('Include specific numbers (e.g., "3 features", "2 pricing tiers")');

  // Check for business context
  if (/saas|app|software|service|product|startup|business|tool|platform/i.test(prompt)) {
    score += 10;
  } else {
    suggestions.push('Specify what type of business or product this is for');
  }

  return { score, suggestions, missingElements };
}

/**
 * Gets a random example prompt for inspiration
 */
export function getExamplePrompt(): string {
  const examples = [
    "Create a landing page for TaskFlow, a SaaS productivity app that helps teams manage projects better. Include a hero section with a compelling headline, a feature grid showing 3 key benefits (collaboration, automation, and analytics), pricing table with 3 tiers, and a call-to-action section encouraging users to start their free trial.",
    
    "Build a landing page for EcoWear, a sustainable clothing brand. Start with a hero section about eco-friendly fashion, add a feature grid highlighting sustainability, quality, and style, include a pricing table with 3 product tiers (Basic, Premium, Luxury), and end with a strong call-to-action.",
    
    "Generate a landing page for Digital Marketing Pro, a consulting agency. Create a professional hero section, feature grid with 4 services (SEO, PPC, Social Media, Content Marketing), pricing packages for different business sizes, and a consultation call-to-action.",
    
    "Create a landing page for FitTracker, a fitness app that helps users reach their health goals. Include an inspiring hero section, feature grid with 3 core features (workout tracking, nutrition planning, progress analytics), simple pricing with 2 tiers (Free and Premium), and motivational call-to-action to download the app."
  ];

  return examples[Math.floor(Math.random() * examples.length)];
}