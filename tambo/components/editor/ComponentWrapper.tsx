'use client';

import React, { useState } from 'react';
import { ComponentInstance } from '@/lib/export';

interface ComponentWrapperProps {
  component: ComponentInstance;
  index: number;
  children: React.ReactNode;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function ComponentWrapper({ 
  component, 
  index, 
  children,
  onEdit, 
  onDelete, 
  onMoveUp, 
  onMoveDown,
  isFirst,
  isLast
}: ComponentWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component Content */}
      {children}
      
      {/* Edit Overlay */}
      {isHovered && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex gap-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 shadow-xl border border-gray-700">
            <button
              onClick={() => onEdit(index)}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
              title="Edit component"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            
            {!isFirst && (
              <button
                onClick={() => onMoveUp(index)}
                className="px-2 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                title="Move up"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            
            {!isLast && (
              <button
                onClick={() => onMoveDown(index)}
                className="px-2 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                title="Move down"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            
            <button
              onClick={() => {
                if (confirm('Delete this component?')) {
                  onDelete(index);
                }
              }}
              className="px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              title="Delete component"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Component Label */}
      {isHovered && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-xl border border-gray-700">
            <span className="text-xs font-medium text-gray-300">
              {component.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
