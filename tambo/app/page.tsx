'use client';

import React, { useState } from 'react';
import { useTamboThread } from '@tambo-ai/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { enhancePrompt, analyzePrompt, getExamplePrompt } from '@/lib/prompt-enhancer';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [enhancePrompts, setEnhancePrompts] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { sendThreadMessage, generationStage, isIdle, thread } = useTamboThread();

  const isLoading = !isIdle;
  const error = generationStage === 'ERROR' ? 'An error occurred while generating' : null;

  // Analyze current prompt
  const analysis = prompt.trim() ? analyzePrompt(prompt) : null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      // Enhance prompt if enabled
      const finalPrompt = enhancePrompts ? enhancePrompt(prompt) : prompt;
      
      console.log('Original prompt:', prompt);
      console.log('Enhanced prompt:', finalPrompt);
      
      await sendThreadMessage(finalPrompt, { streamResponse: true });
      // Don't clear the input - keep it for reference and potential re-generation
    } catch (err) {
      console.error('Error generating UI:', err);
      // Additional error logging for debugging
      if (err instanceof Error) {
        console.error('Error details:', err.message);
        console.error('Error stack:', err.stack);
      }
    }
  };

  const handleUseExample = () => {
    setPrompt(getExamplePrompt());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Conversational Product Designer
              </h1>
              <p className="text-gray-400 mt-1">Generate professional landing pages with AI</p>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled
              title="Coming soon — export the generated UI as reusable React code"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Code
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Describe Your Landing Page
              </h2>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
              </button>
            </div>

            {/* Prompt Analysis */}
            {showAnalysis && analysis && (
              <div className="mb-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                {analysis.isAppUIRequest ? (
                  <div className="mb-4 p-4 bg-yellow-900/50 border border-yellow-600 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h3 className="text-sm font-semibold text-yellow-300 mb-2">
                          {analysis.warning}
                        </h3>
                        <div className="text-sm text-yellow-200 space-y-2">
                          <p>This system creates <strong>marketing landing pages</strong>, not app interfaces or dashboards.</p>
                          <p>For app UI design, consider:</p>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>UI libraries: Chakra UI, Material-UI, Ant Design</li>
                            <li>Design tools: Figma, Sketch, Adobe XD</li>
                            <li>App frameworks: React Native, Flutter</li>
                          </ul>
                          <p className="mt-3"><strong>Want a landing page instead?</strong> Try:</p>
                          <p className="italic">"Create a landing page for TimeTracker app with hero section, feature highlights, pricing plans, and download CTA"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">Prompt Quality</h3>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-600 rounded-full mr-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              analysis.score >= 80 ? 'bg-green-500' : 
                              analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${analysis.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-300">{analysis.score}%</span>
                      </div>
                    </div>
                    
                    {analysis.missingElements.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 mb-1">Missing elements:</p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.missingElements.map((element, index) => (
                            <span key={index} className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded">
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysis.suggestions.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Suggestions:</p>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-400 mr-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe the landing page you want to create. For example: 'Create a landing page for a SaaS productivity app with a hero section, feature grid showing 3 key benefits, pricing table with 3 tiers, and a call-to-action section.'"
              className="w-full h-32 sm:h-48 p-4 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-700 placeholder-gray-400 text-sm leading-relaxed"
              disabled={isLoading}
            />

            {/* Enhancement Controls */}
            <div className="mt-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enhancePrompts}
                    onChange={(e) => setEnhancePrompts(e.target.checked)}
                    className="mr-2 rounded"
                  />
                  <span className="text-sm text-white">Auto-enhance prompts</span>
                </label>
                <button
                  onClick={handleUseExample}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                  disabled={isLoading}
                >
                  Use Example
                </button>
              </div>
              <p className="text-xs text-gray-400">
                {enhancePrompts 
                  ? "✨ Your prompt will be automatically enhanced with best practices and component suggestions"
                  : "Your prompt will be used as-is without enhancement"
                }
              </p>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <p className="text-sm text-gray-400">
                  Press Cmd/Ctrl + Enter to generate
                </p>
                <button
                  onClick={() => setPrompt('')}
                  className="text-sm text-gray-400 hover:text-gray-300 underline"
                  disabled={isLoading}
                >
                  Clear
                </button>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    {enhancePrompts && <span className="mr-2">✨</span>}
                    Generate UI
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-3 bg-gray-800 rounded-xl shadow-lg border border-gray-700 min-h-[400px] sm:min-h-[600px]">
            <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Preview
              </h2>
              {thread?.messages && thread.messages.some(m => m.role === 'assistant' && m.renderedComponent) && !isLoading && (
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-red-400 hover:text-red-300 underline"
                >
                  Clear Preview
                </button>
              )}
            </div>
            
            <div className="overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-400">Generating your landing page...</p>
                  </div>
                </div>
              ) : thread?.messages && thread.messages.length > 0 ? (
                (() => {
                  // Get only the last user message and all assistant messages after it
                  const userMessages = thread.messages.filter(m => m.role === 'user');
                  const lastUserMessageIndex = thread.messages.lastIndexOf(userMessages[userMessages.length - 1]);
                  
                  // Get all assistant messages after the last user message that have rendered components
                  const componentsToRender = thread.messages
                    .slice(lastUserMessageIndex + 1)
                    .filter(message => message.role === 'assistant' && message.renderedComponent);
                  
                  return componentsToRender.length > 0 ? (
                    <div className="bg-white min-h-screen">
                      {componentsToRender.map((message, index) => (
                        <ErrorBoundary
                          key={index}
                          fallback={
                            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
                              <p className="text-yellow-800">
                                ⚠️ Component failed to render. This might be due to invalid data from AI generation.
                              </p>
                            </div>
                          }
                        >
                          {message.renderedComponent}
                        </ErrorBoundary>
                      ))}
                    </div>
                  ) : null;
                })()
              ) : (
                <div className="p-6">
                  <div className="text-center text-gray-400 py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-400">Your generated landing page will appear here</p>
                    <p className="text-sm mt-2 text-gray-500">Start by describing what you want to create</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
