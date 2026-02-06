'use client';

import React, { useState } from 'react';
import { ExportManager, ExportConfig, ComponentInstance } from '@/lib/export';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: ComponentInstance[];
  projectName?: string;
}

export default function ExportModal({ 
  isOpen, 
  onClose, 
  components,
  projectName = 'landing-page'
}: ExportModalProps) {
  const [config, setConfig] = useState<ExportConfig>({
    format: 'react',
    includeComments: true,
    includeTailwind: true,
    includeReadme: true,
    projectName,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    
    try {
      const exportManager = new ExportManager();
      await exportManager.exportAndDownload(components, config);
      
      // Close modal after successful export
      setTimeout(() => {
        onClose();
        setIsExporting(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
      setIsExporting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Export Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={config.projectName}
              onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="my-landing-page"
            />
          </div>
          
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setConfig({ ...config, format: 'react' })}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  config.format === 'react'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="text-white font-semibold mb-1">React + TypeScript</div>
                <div className="text-sm text-gray-400">
                  Next.js components with full TypeScript support
                </div>
              </button>
              
              <button
                onClick={() => setConfig({ ...config, format: 'html' })}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  config.format === 'html'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="text-white font-semibold mb-1">HTML + Tailwind</div>
                <div className="text-sm text-gray-400">
                  Standalone HTML with Tailwind CSS
                </div>
              </button>
            </div>
          </div>
          
          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeComments}
                onChange={(e) => setConfig({ ...config, includeComments: e.target.checked })}
                className="mr-3 w-4 h-4 rounded"
              />
              <span className="text-gray-300">Include code comments</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeTailwind}
                onChange={(e) => setConfig({ ...config, includeTailwind: e.target.checked })}
                className="mr-3 w-4 h-4 rounded"
              />
              <span className="text-gray-300">Include Tailwind CSS configuration</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeReadme}
                onChange={(e) => setConfig({ ...config, includeReadme: e.target.checked })}
                className="mr-3 w-4 h-4 rounded"
              />
              <span className="text-gray-300">Include README with setup instructions</span>
            </label>
          </div>
          
          {/* Export Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>Components:</span>
                <span className="font-semibold text-white">{components.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-semibold text-white">
                  {config.format === 'react' ? 'React + TypeScript' : 'HTML + Tailwind'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              disabled={isExporting || components.length === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isExporting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </span>
              ) : (
                <>
                  <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export & Download
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
