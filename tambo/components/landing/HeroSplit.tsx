import React from 'react';
import { HeroSplitProps } from '@/lib/schemas';

// Alternative hero with image/content split layout
export default function HeroSplit({
  headline = "Transform Your Business",
  subheadline = "Powerful tools to help you succeed",
  ctaText = "Get Started",
  ctaLink,
  image,
  features = [],
  colorScheme = 'modern',
}: HeroSplitProps) {
  const safeFeatures = Array.isArray(features) ? features : [];
  
  const colorSchemes = {
    'modern': {
      bg: 'bg-white',
      textColor: 'text-gray-900',
      subtextColor: 'text-gray-600',
      buttonBg: 'bg-gray-900 hover:bg-gray-800',
      accentColor: 'text-blue-600',
    },
    'vibrant': {
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      textColor: 'text-gray-900',
      subtextColor: 'text-gray-700',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      accentColor: 'text-purple-600',
    },
    'dark': {
      bg: 'bg-gray-900',
      textColor: 'text-white',
      subtextColor: 'text-gray-300',
      buttonBg: 'bg-white hover:bg-gray-100 text-gray-900',
      accentColor: 'text-blue-400',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['modern'];

  return (
    <section className={`${colors.bg} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${colors.textColor} mb-6 leading-tight`}>
              {headline}
            </h1>
            <p className={`text-xl sm:text-2xl ${colors.subtextColor} mb-8 leading-relaxed`}>
              {subheadline}
            </p>
            
            {safeFeatures.length > 0 && (
              <ul className="space-y-3 mb-8">
                {safeFeatures.map((feature: any, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className={`w-6 h-6 ${colors.accentColor} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-lg ${colors.subtextColor}`}>{String(feature)}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              {ctaLink ? (
                <a
                  href={ctaLink}
                  className={`inline-flex items-center justify-center px-8 py-4 text-lg font-bold ${colors.buttonBg} text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg`}
                >
                  {ctaText}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <button className={`inline-flex items-center justify-center px-8 py-4 text-lg font-bold ${colors.buttonBg} text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg`}>
                  {ctaText}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Image Side */}
          <div className="relative">
            {image ? (
              <img src={image} alt="Hero" className="rounded-2xl shadow-2xl w-full h-auto" />
            ) : (
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center">
                <svg className="w-32 h-32 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
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
