import React from 'react';
import { FeatureGridProps } from '@/lib/schemas';

// Icon mapping function that converts text to SVG icons
const getIconSVG = (iconText: string) => {
  const iconLower = String(iconText).toLowerCase();
  
  // Workout/fitness related icons
  if (iconLower.includes('dumbbell') || iconLower.includes('workout') || iconLower.includes('fitness') || iconLower.includes('exercise')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
      </svg>
    );
  }
  
  // Nutrition/food related icons
  if (iconLower.includes('utensils') || iconLower.includes('nutrition') || iconLower.includes('food') || iconLower.includes('meal')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
      </svg>
    );
  }
  
  // Analytics/chart related icons
  if (iconLower.includes('chart') || iconLower.includes('analytics') || iconLower.includes('progress') || iconLower.includes('graph')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
      </svg>
    );
  }
  
  // Security/shield related icons
  if (iconLower.includes('shield') || iconLower.includes('security') || iconLower.includes('protect')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
      </svg>
    );
  }
  
  // Speed/fast related icons
  if (iconLower.includes('speed') || iconLower.includes('fast') || iconLower.includes('quick')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.33,20.45 4.94,20.06C3.1,18.22 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.9,18.22 19.06,20.06C18.67,20.45 18.04,20.45 17.65,20.06C17.26,19.67 17.26,19.04 17.65,18.65C19.11,17.21 20,15.21 20,13C20,12 19.81,11 19.47,10.13L20.68,8.03C21.5,9.5 22,11.19 22,13Z"/>
      </svg>
    );
  }
  
  // Support/help related icons
  if (iconLower.includes('support') || iconLower.includes('help') || iconLower.includes('service')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17C11.45,17 11,16.55 11,16C11,15.45 11.45,15 12,15C12.55,15 13,15.45 13,16C13,16.55 12.55,17 12,17M12,13C11.45,13 11,12.55 11,12V8C11,7.45 11.45,7 12,7C12.55,7 13,7.45 13,8V12C13,12.55 12.55,13 12,13Z"/>
      </svg>
    );
  }
  
  // Default icons for common cases
  if (iconLower.includes('star') || iconLower.includes('⭐')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }
  
  if (iconLower.includes('rocket') || iconLower.includes('🚀')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.55,4.22 19.78,4.22C19.78,6.45 17.59,12.61 13.21,15.83L12.71,18.36L9.88,21.19C9.29,21.78 8.28,21.78 7.69,21.19L2.81,16.31C2.22,15.72 2.22,14.71 2.81,14.12M7.68,7.68C6.1,9.26 6.1,11.74 7.68,13.32C9.26,14.9 11.74,14.9 13.32,13.32C14.9,11.74 14.9,9.26 13.32,7.68C11.74,6.1 9.26,6.1 7.68,7.68Z"/>
      </svg>
    );
  }
  
  if (iconLower.includes('sparkle') || iconLower.includes('✨')) {
    return (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
      </svg>
    );
  }
  
  // Generic feature icon as fallback
  return (
    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
};

// Color scheme configurations
const colorSchemes = {
  'blue-purple': {
    iconBg: 'from-blue-500 to-purple-600',
    hoverBg: 'from-blue-50 to-purple-50',
    hoverText: 'group-hover:text-blue-600',
  },
  'green-teal': {
    iconBg: 'from-green-500 to-teal-600',
    hoverBg: 'from-green-50 to-teal-50',
    hoverText: 'group-hover:text-green-600',
  },
  'orange-red': {
    iconBg: 'from-orange-500 to-red-600',
    hoverBg: 'from-orange-50 to-red-50',
    hoverText: 'group-hover:text-orange-600',
  },
  'pink-yellow': {
    iconBg: 'from-pink-500 to-yellow-500',
    hoverBg: 'from-pink-50 to-yellow-50',
    hoverText: 'group-hover:text-pink-600',
  },
  'neutral': {
    iconBg: 'from-gray-600 to-gray-800',
    hoverBg: 'from-gray-50 to-gray-100',
    hoverText: 'group-hover:text-gray-800',
  },
  'vibrant': {
    iconBg: 'from-purple-500 via-pink-500 to-red-500',
    hoverBg: 'from-purple-50 to-pink-50',
    hoverText: 'group-hover:text-purple-600',
  },
};

export default function FeatureGrid({ 
  title, 
  features = [], 
  columns = "3",
  colorScheme = 'blue-purple',
  style = 'cards',
}: FeatureGridProps) {
  // Ensure features is always an array and has valid structure
  const safeFeatures = Array.isArray(features) ? features.filter(f => f && typeof f === 'object') : [];
  const displayFeatures = safeFeatures.length > 0 ? safeFeatures : [
    { title: "Amazing Feature", description: "This feature will help you achieve your goals", icon: "star" },
    { title: "Great Benefits", description: "Experience the benefits of our solution", icon: "rocket" },
    { title: "Easy to Use", description: "Simple and intuitive interface", icon: "sparkle" }
  ];
  
  const colors = colorSchemes[colorScheme] || colorSchemes['blue-purple'];
  
  const getGridCols = () => {
    switch (columns) {
      case "2": return "grid-cols-1 md:grid-cols-2";
      case "3": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };
  
  const styleClasses = {
    'cards': 'bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100',
    'minimal': 'bg-transparent p-6 border-b border-gray-200 hover:bg-gray-50',
    'bordered': 'bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-gray-400',
    'floating': 'bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl',
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r ${colors.iconBg} mx-auto rounded-full`}></div>
          </div>
        )}
        
        <div className={`grid ${getGridCols()} gap-10`}>
          {displayFeatures.map((feature: any, index: number) => (
            <div 
              key={index}
              className={`group relative ${styleClasses[style]} transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.hoverBg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className="mb-6 flex justify-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {getIconSVG(feature?.icon || 'star')}
                  </div>
                </div>
                
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 text-center ${colors.hoverText} transition-colors duration-300`}>
                  {feature?.title ? String(feature.title) : "Feature Title"}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                  {feature?.description ? String(feature.description) : "Feature description goes here"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
