'use client';

import React from 'react';
import { PromptSuggestion } from '@/lib/prompt-suggestions';

interface PromptSuggestionsPanelProps {
  suggestions: PromptSuggestion[];
  onSuggestionClick: (suggestion: string) => void;
}

export default function PromptSuggestionsPanel({ 
  suggestions, 
  onSuggestionClick 
}: PromptSuggestionsPanelProps) {
  if (suggestions.length === 0) return null;

  const categoryColors = {
    component: 'bg-blue-900 text-blue-300 border-blue-700',
    industry: 'bg-purple-900 text-purple-300 border-purple-700',
    style: 'bg-green-900 text-green-300 border-green-700',
    content: 'bg-orange-900 text-orange-300 border-orange-700',
  };

  const categoryIcons = {
    component: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
    industry: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    style: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    content: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  };

  return (
    <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center">
          <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Suggestions to improve your prompt
        </h3>
        <span className="text-xs text-gray-400">{suggestions.length} tips</span>
      </div>
      
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${categoryColors[suggestion.category]}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 mr-2">
                {categoryIcons[suggestion.category]}
              </div>
              <div className="flex-1">
                <p className="text-sm">{suggestion.text}</p>
                <span className="text-xs opacity-75 capitalize mt-1 inline-block">
                  {suggestion.category}
                </span>
              </div>
              <svg className="w-4 h-4 flex-shrink-0 ml-2 mt-0.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      <p className="text-xs text-gray-400 mt-3 italic">
        💡 Click any suggestion to add it to your prompt
      </p>
    </div>
  );
}
