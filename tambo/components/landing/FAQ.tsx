import React, { useState } from 'react';
import { FAQProps } from '@/lib/schemas';

export default function FAQ({
  title = "Frequently Asked Questions",
  faqs = [],
  colorScheme = 'blue-purple',
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const safeFaqs = Array.isArray(faqs) ? faqs.filter(f => f && typeof f === 'object') : [];
  const displayFaqs = safeFaqs.length > 0 ? safeFaqs : [
    {
      question: "How does it work?",
      answer: "Our product is designed to be simple and intuitive. Just sign up and start using it right away.",
    }
  ];

  const colorSchemes = {
    'blue-purple': 'from-blue-600 to-purple-600',
    'green-teal': 'from-green-600 to-teal-600',
    'orange-red': 'from-orange-600 to-red-600',
    'neutral': 'from-gray-700 to-gray-900',
  };

  const accentColor = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${accentColor} bg-clip-text text-transparent mb-6`}>
              {title}
            </h2>
          </div>
        )}
        
        <div className="space-y-4">
          {displayFaqs.map((faq: any, index: number) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-xl font-bold text-gray-900 pr-8">
                  {faq?.question || 'Question'}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-700 text-lg leading-relaxed">
                  {faq?.answer || 'Answer'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
