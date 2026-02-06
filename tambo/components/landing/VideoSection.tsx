import React from 'react';
import { VideoSectionProps } from '@/lib/schemas';

export default function VideoSection({
  title = "See It In Action",
  description,
  videoUrl,
  thumbnail,
  colorScheme = 'dark',
  layout = 'centered',
}: VideoSectionProps) {
  const colorSchemes = {
    'dark': {
      bg: 'bg-gray-900',
      titleColor: 'text-white',
      descColor: 'text-gray-300',
    },
    'light': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      descColor: 'text-gray-600',
    },
    'blue': {
      bg: 'bg-blue-50',
      titleColor: 'text-blue-900',
      descColor: 'text-blue-700',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['dark'];

  const layoutClasses = {
    'centered': 'max-w-5xl mx-auto text-center',
    'split': 'max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center',
    'wide': 'max-w-7xl mx-auto',
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.centered}>
        <div className={layout === 'split' ? 'md:pr-8' : layout === 'centered' ? 'mb-12' : 'text-center mb-12'}>
          <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-6`}>
            {title}
          </h2>
          {description && (
            <p className={`text-xl ${colors.descColor} ${layout === 'centered' ? 'max-w-3xl mx-auto' : ''}`}>
              {description}
            </p>
          )}
        </div>
        
        <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${layout === 'split' ? '' : layout === 'centered' ? 'max-w-4xl mx-auto' : ''}`}>
          {videoUrl ? (
            <div className="relative pb-[56.25%]">
              <iframe
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : thumbnail ? (
            <img src={thumbnail} alt="Video thumbnail" className="w-full h-auto" />
          ) : (
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                <p className="text-gray-500">Video Preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
