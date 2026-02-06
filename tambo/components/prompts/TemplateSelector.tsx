'use client';

import React, { useState } from 'react';
import { promptTemplates } from '@/lib/prompt-suggestions';

interface TemplateSelectorProps {
  onSelectTemplate: (template: string) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-purple-400 hover:text-purple-300 underline flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Prompt Templates
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-96 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-white">Quick Start Templates</h3>
              <p className="text-xs text-gray-400 mt-1">Click to use a template</p>
            </div>
            
            <div className="p-2 space-y-2">
              {promptTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectTemplate(template.template);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-purple-500 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {template.template}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
