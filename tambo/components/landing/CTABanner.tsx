import React from 'react';
import { CTABannerProps } from '@/lib/schemas';

// Alternative CTA - compact banner style
export default function CTABanner({
  text = "Ready to get started?",
  buttonText = "Sign Up Now",
  buttonLink,
  secondaryText,
  colorScheme = 'gradient',
}: CTABannerProps) {
  const colorSchemes = {
    'gradient': 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
    'solid': 'bg-gray-900',
    'vibrant': 'bg-gradient-to-r from-orange-500 to-red-600',
    'green': 'bg-gradient-to-r from-green-600 to-teal-600',
  };

  const bgColor = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['gradient'];

  return (
    <section className={`${bgColor} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {text}
            </h3>
            {secondaryText && (
              <p className="text-lg text-white/80">
                {secondaryText}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0">
            {buttonLink ? (
              <a
                href={buttonLink}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-lg"
              >
                {buttonText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ) : (
              <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                {buttonText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
