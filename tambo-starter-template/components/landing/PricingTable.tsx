import React from 'react';
import { PricingTableProps } from '@/lib/schemas';

// Color scheme configurations
const colorSchemes = {
  'blue-purple': {
    bg: 'from-gray-900 to-gray-800',
    titleText: 'text-white',
    subtitleText: 'text-gray-300',
    highlightRing: 'ring-blue-500',
    highlightBadge: 'from-blue-500 to-purple-600',
    highlightButton: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
  },
  'green-teal': {
    bg: 'from-green-900 to-teal-900',
    titleText: 'text-white',
    subtitleText: 'text-green-200',
    highlightRing: 'ring-green-500',
    highlightBadge: 'from-green-500 to-teal-600',
    highlightButton: 'from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
  },
  'orange-red': {
    bg: 'from-orange-900 to-red-900',
    titleText: 'text-white',
    subtitleText: 'text-orange-200',
    highlightRing: 'ring-orange-500',
    highlightBadge: 'from-orange-500 to-red-600',
    highlightButton: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
  },
  'dark': {
    bg: 'from-black to-gray-900',
    titleText: 'text-white',
    subtitleText: 'text-gray-400',
    highlightRing: 'ring-white',
    highlightBadge: 'from-gray-700 to-gray-900',
    highlightButton: 'from-gray-800 to-black hover:from-gray-700 hover:to-gray-900',
  },
  'light': {
    bg: 'from-gray-50 to-white',
    titleText: 'text-gray-900',
    subtitleText: 'text-gray-600',
    highlightRing: 'ring-gray-900',
    highlightBadge: 'from-gray-800 to-gray-900',
    highlightButton: 'from-gray-900 to-black hover:from-gray-800 hover:to-gray-900',
  },
  'gradient': {
    bg: 'from-purple-900 via-pink-900 to-red-900',
    titleText: 'text-white',
    subtitleText: 'text-purple-200',
    highlightRing: 'ring-pink-500',
    highlightBadge: 'from-pink-500 to-purple-600',
    highlightButton: 'from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700',
  },
};

export default function PricingTable({ 
  title, 
  tiers = [],
  colorScheme = 'blue-purple',
  layout = 'cards',
}: PricingTableProps) {
  // Ensure tiers is always an array and has valid structure
  const safeTiers = Array.isArray(tiers) ? tiers.filter(t => t && typeof t === 'object') : [];
  const displayTiers = safeTiers.length > 0 ? safeTiers : [
    {
      name: "Basic Plan",
      price: "$9",
      period: "month",
      features: ["Basic features", "Email support"],
      highlighted: false,
      ctaText: "Get Started"
    }
  ];
  
  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];
  
  const layoutClasses = {
    'cards': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    'table': 'grid grid-cols-1 md:grid-cols-3 gap-4',
    'comparison': 'flex flex-col md:flex-row gap-6 justify-center',
  };
  
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${colors.bg}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleText} mb-6`}>
              {title}
            </h2>
            <p className={`text-xl ${colors.subtitleText} max-w-3xl mx-auto`}>
              Choose the perfect plan for your needs
            </p>
          </div>
        )}
        
        <div className={`${layoutClasses[layout as keyof typeof layoutClasses]} max-w-6xl mx-auto`}>
          {displayTiers.map((tier: { name?: string; price?: string; period?: string; features?: string[]; highlighted?: boolean; ctaText?: string }, index: number) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105 ${
                tier.highlighted 
                  ? `ring-4 ${colors.highlightRing} scale-105 z-10 bg-gradient-to-br from-blue-50 to-indigo-50` 
                  : 'hover:shadow-3xl'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <span className={`bg-gradient-to-r ${colors.highlightBadge} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap`}>
                    ⭐ Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tier?.name ? String(tier.name) : "Plan"}
                </h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {tier?.price ? String(tier.price) : "$0"}
                  </span>
                  {tier?.period && (
                    <span className="text-gray-500 text-lg ml-1">
                      /{String(tier.period)}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {(Array.isArray(tier?.features) ? tier.features : ["Feature included"]).map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg 
                        className="w-4 h-4 text-green-600" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg">{String(feature)}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  tier?.highlighted
                    ? `bg-gradient-to-r ${colors.highlightButton} text-white shadow-lg`
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 hover:shadow-lg'
                }`}
              >
                {tier?.ctaText ? String(tier.ctaText) : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
