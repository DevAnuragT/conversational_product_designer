import React from 'react';
import { TestimonialsProps } from '@/lib/schemas';

// Color scheme configurations
const colorSchemes = {
  'blue-purple': {
    bg: 'bg-gradient-to-b from-blue-50 to-purple-50',
    cardBg: 'bg-white',
    accent: 'text-blue-600',
    starColor: 'text-yellow-400',
  },
  'green-teal': {
    bg: 'bg-gradient-to-b from-green-50 to-teal-50',
    cardBg: 'bg-white',
    accent: 'text-green-600',
    starColor: 'text-yellow-400',
  },
  'neutral': {
    bg: 'bg-gray-50',
    cardBg: 'bg-white',
    accent: 'text-gray-900',
    starColor: 'text-yellow-400',
  },
  'dark': {
    bg: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    accent: 'text-white',
    starColor: 'text-yellow-400',
  },
};

export default function Testimonials({
  title = "What Our Customers Say",
  testimonials = [],
  colorScheme = 'blue-purple',
  layout = 'grid',
}: TestimonialsProps) {
  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];
  
  const safeTestimonials = Array.isArray(testimonials) ? testimonials.filter(t => t && typeof t === 'object') : [];
  const displayTestimonials = safeTestimonials.length > 0 ? safeTestimonials : [
    {
      name: "John Doe",
      role: "CEO, Company",
      content: "This product has transformed our business. Highly recommended!",
      rating: 5,
      avatar: "",
    }
  ];

  const layoutClasses = {
    'grid': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    'carousel': 'flex overflow-x-auto gap-8 pb-4 snap-x',
    'masonry': 'columns-1 md:columns-2 lg:columns-3 gap-8',
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold ${colors.accent} mb-6`}>
              {title}
            </h2>
          </div>
        )}
        
        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.grid}>
          {displayTestimonials.map((testimonial: any, index: number) => (
            <div 
              key={index}
              className={`${colors.cardBg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${layout === 'carousel' ? 'flex-shrink-0 w-80 snap-center' : ''} ${layout === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
            >
              {/* Rating Stars */}
              {testimonial?.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? colors.starColor : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              
              {/* Testimonial Content */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{testimonial?.content || 'Great product!'}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                {testimonial?.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial?.name || 'User'} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {(testimonial?.name || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900">{testimonial?.name || 'Anonymous'}</p>
                  {testimonial?.role && (
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
