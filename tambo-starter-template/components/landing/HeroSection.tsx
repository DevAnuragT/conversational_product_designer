import React from 'react';
import { HeroSectionProps } from '@/lib/schemas';

// Color scheme configurations
const colorSchemes = {
  'blue-purple': {
    bg: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
    text: 'text-white',
    subtext: 'text-blue-100',
    button: 'bg-white text-blue-600 hover:bg-gray-50',
  },
  'green-teal': {
    bg: 'bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600',
    text: 'text-white',
    subtext: 'text-green-100',
    button: 'bg-white text-green-600 hover:bg-gray-50',
  },
  'orange-red': {
    bg: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600',
    text: 'text-white',
    subtext: 'text-orange-100',
    button: 'bg-white text-orange-600 hover:bg-gray-50',
  },
  'pink-yellow': {
    bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-yellow-500',
    text: 'text-white',
    subtext: 'text-pink-100',
    button: 'bg-white text-pink-600 hover:bg-gray-50',
  },
  'dark': {
    bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    text: 'text-white',
    subtext: 'text-gray-300',
    button: 'bg-white text-gray-900 hover:bg-gray-100',
  },
  'minimal': {
    bg: 'bg-white',
    text: 'text-gray-900',
    subtext: 'text-gray-600',
    button: 'bg-gray-900 text-white hover:bg-gray-800',
  },
};

export default function HeroSection({
  headline = "Welcome to Our Product",
  subheadline = "Discover amazing features that will transform your experience",
  ctaText = "Get Started",
  ctaLink,
  backgroundImage,
  colorScheme = 'blue-purple',
  layout = 'centered',
}: HeroSectionProps) {
  const colors = colorSchemes[colorScheme] || colorSchemes['blue-purple'];
  
  const layoutClasses = {
    'centered': 'text-center mx-auto',
    'left-aligned': 'text-left',
    'split': 'text-left lg:text-center',
  };

  return (
    <section 
      className={`relative ${colors.bg} py-24 px-4 sm:px-6 lg:px-8 overflow-hidden`}
      style={backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* Background decorative elements */}
      {colorScheme !== 'minimal' && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      )}
      
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}
      
      <div className={`relative max-w-5xl ${layoutClasses[layout]}`}>
        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight ${colors.text}`}>
          {colorScheme !== 'minimal' ? (
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {headline}
            </span>
          ) : (
            headline
          )}
        </h1>
        
        <p className={`text-xl sm:text-2xl lg:text-3xl mb-12 max-w-4xl ${layout === 'centered' ? 'mx-auto' : ''} leading-relaxed ${colors.subtext}`}>
          {subheadline}
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-6 ${layout === 'centered' ? 'justify-center' : 'justify-start'} items-center`}>
          {ctaLink ? (
            <a
              href={ctaLink}
              className={`group inline-flex items-center justify-center px-10 py-5 text-xl font-bold ${colors.button} rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform`}
            >
              {ctaText || "Get Started"}
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : (
            <button className={`group inline-flex items-center justify-center px-10 py-5 text-xl font-bold ${colors.button} rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform`}>
              {ctaText || "Get Started"}
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
