import React from 'react';
import { PricingCompactProps } from '@/lib/schemas';

// Alternative pricing - compact toggle style
export default function PricingCompact({
  title = "Simple, Transparent Pricing",
  description,
  plans = [],
  colorScheme = 'minimal',
}: PricingCompactProps) {
  const safePlans = Array.isArray(plans) ? plans.filter(p => p && typeof p === 'object') : [];
  const displayPlans = safePlans.length > 0 ? safePlans : [
    { name: "Starter", price: "$29", period: "month", description: "Perfect for individuals" },
    { name: "Pro", price: "$99", period: "month", description: "For growing teams" },
  ];

  const colorSchemes = {
    'minimal': {
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      titleColor: 'text-gray-900',
      priceColor: 'text-gray-900',
      buttonBg: 'bg-gray-900 hover:bg-gray-800',
    },
    'colorful': {
      bg: 'bg-gradient-to-b from-purple-50 to-pink-50',
      cardBg: 'bg-white',
      titleColor: 'text-purple-900',
      priceColor: 'text-purple-600',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['minimal'];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-4`}>
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {displayPlans.map((plan: any, index: number) => (
            <div 
              key={index}
              className={`${colors.cardBg} rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan?.name || 'Plan'}
              </h3>
              {plan?.description && (
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
              )}
              <div className="mb-6">
                <span className={`text-5xl font-bold ${colors.priceColor}`}>
                  {plan?.price || '$0'}
                </span>
                {plan?.period && (
                  <span className="text-gray-500 text-lg">
                    /{plan.period}
                  </span>
                )}
              </div>
              <button className={`w-full py-3 px-6 ${colors.buttonBg} text-white font-bold rounded-lg transition-all duration-300 hover:scale-105`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
