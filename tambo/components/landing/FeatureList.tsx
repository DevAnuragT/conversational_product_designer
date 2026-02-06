import React from 'react';
import { FeatureListProps } from '@/lib/schemas';

// Alternative features layout - list style instead of grid
export default function FeatureList({
  title = "Why Choose Us",
  features = [],
  image,
  imagePosition = 'right',
  colorScheme = 'clean',
}: FeatureListProps) {
  const safeFeatures = Array.isArray(features) ? features.filter(f => f && typeof f === 'object') : [];
  const displayFeatures = safeFeatures.length > 0 ? safeFeatures : [
    { title: "Feature One", description: "Amazing capability that helps you succeed" },
    { title: "Feature Two", description: "Powerful tools at your fingertips" },
  ];

  const colorSchemes = {
    'clean': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      featureTitleColor: 'text-gray-900',
      descColor: 'text-gray-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    'warm': {
      bg: 'bg-orange-50',
      titleColor: 'text-orange-900',
      featureTitleColor: 'text-orange-900',
      descColor: 'text-orange-700',
      iconBg: 'bg-orange-200',
      iconColor: 'text-orange-600',
    },
    'cool': {
      bg: 'bg-blue-50',
      titleColor: 'text-blue-900',
      featureTitleColor: 'text-blue-900',
      descColor: 'text-blue-700',
      iconBg: 'bg-blue-200',
      iconColor: 'text-blue-600',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['clean'];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-16 text-center`}>
            {title}
          </h2>
        )}
        
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'lg:grid-flow-dense' : ''}`}>
          {/* Features List */}
          <div className="space-y-8">
            {displayFeatures.map((feature: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className={`flex-shrink-0 w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
                  <span className={`text-2xl font-bold ${colors.iconColor}`}>{index + 1}</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${colors.featureTitleColor} mb-2`}>
                    {feature?.title || 'Feature'}
                  </h3>
                  <p className={`${colors.descColor} leading-relaxed`}>
                    {feature?.description || 'Feature description'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Image */}
          <div className={imagePosition === 'left' ? 'lg:col-start-1 lg:row-start-1' : ''}>
            {image ? (
              <img src={image} alt="Features" className="rounded-2xl shadow-xl w-full h-auto" />
            ) : (
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-xl flex items-center justify-center">
                <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
