import React from 'react';
import { ProcessProps } from '@/lib/schemas';

export default function Process({
  title = "How It Works",
  description,
  steps = [],
  colorScheme = 'blue-purple',
  layout = 'vertical',
}: ProcessProps) {
  const safeSteps = Array.isArray(steps) ? steps.filter(s => s && typeof s === 'object') : [];
  const displaySteps = safeSteps.length > 0 ? safeSteps : [
    { title: "Step 1", description: "Get started with our platform", icon: "1" },
    { title: "Step 2", description: "Configure your settings", icon: "2" },
    { title: "Step 3", description: "Launch and grow", icon: "3" },
  ];

  const colorSchemes = {
    'blue-purple': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      iconBg: 'from-blue-500 to-purple-600',
      lineColor: 'bg-blue-200',
    },
    'green-teal': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      iconBg: 'from-green-500 to-teal-600',
      lineColor: 'bg-green-200',
    },
    'orange': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      iconBg: 'from-orange-500 to-red-500',
      lineColor: 'bg-orange-200',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-6`}>
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className={layout === 'horizontal' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'space-y-12'}>
          {displaySteps.map((step: any, index: number) => (
            <div 
              key={index}
              className={`relative ${layout === 'vertical' ? 'flex gap-6' : 'text-center'}`}
            >
              {/* Connector Line */}
              {layout === 'vertical' && index < displaySteps.length - 1 && (
                <div className={`absolute left-8 top-20 w-0.5 h-full ${colors.lineColor}`}></div>
              )}
              
              {/* Step Number/Icon */}
              <div className={`flex-shrink-0 ${layout === 'horizontal' ? 'mx-auto mb-6' : ''}`}>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.iconBg} flex items-center justify-center text-white text-2xl font-bold shadow-lg relative z-10`}>
                  {step?.icon || index + 1}
                </div>
              </div>
              
              {/* Step Content */}
              <div className={layout === 'vertical' ? 'flex-1 pt-2' : ''}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step?.title || `Step ${index + 1}`}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {step?.description || 'Step description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
