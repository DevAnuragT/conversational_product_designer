'use client';

import React, { useState, useEffect } from 'react';
import { useTamboThread } from '@tambo-ai/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ExportModal from '@/components/export/ExportModal';
import ComponentWrapper from '@/components/editor/ComponentWrapper';
import EditModal from '@/components/editor/EditModal';
import ProjectsSidebar from '@/components/projects/ProjectsSidebar';
import TemplateGallery from '@/components/templates/TemplateGallery';
import { enhancePrompt, analyzePrompt, getExamplePrompt } from '@/lib/prompt-enhancer';
import { ComponentInstance } from '@/lib/export';
import { useDesignStore } from '@/store/useDesignStore';
import { Template } from '@/lib/templates';
import { componentRegistry } from '@/lib/tambo-config';
import { getPromptSuggestions } from '@/lib/prompt-suggestions';
import PromptSuggestionsPanel from '@/components/prompts/PromptSuggestionsPanel';
import TemplateSelector from '@/components/prompts/TemplateSelector';
import VariationSelector from '@/components/variations/VariationSelector';
import { ComponentVariation } from '@/lib/variations';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [enhancePrompts, setEnhancePrompts] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showVariationSelector, setShowVariationSelector] = useState(false);
  const [variationComponentIndex, setVariationComponentIndex] = useState<number | null>(null);
  const { sendThreadMessage, generationStage, isIdle, thread, startNewThread } = useTamboThread();
  
  const {
    currentProject,
    components,
    setComponents,
    updateComponent,
    deleteComponent,
    moveComponent,
    isEditing,
    editingIndex,
    startEditing,
    stopEditing,
    saveToStorage,
    loadFromStorage,
    createNewProject,
    clearDesign,
  } = useDesignStore();

  const isLoading = !isIdle;
  const error = generationStage === 'ERROR' ? 'An error occurred while generating' : null;

  // Analyze current prompt
  const analysis = prompt.trim() ? analyzePrompt(prompt) : null;
  
  // Get prompt suggestions
  const suggestions = prompt.trim() ? getPromptSuggestions(prompt) : [];
  
  // Extract components from thread messages and create/update project
  useEffect(() => {
    if (thread?.messages) {
      console.log('=== THREAD MESSAGES DEBUG ===');
      console.log('Total messages:', thread.messages.length);
      
      const lastMessage = thread.messages[thread.messages.length - 1];
      if (lastMessage) {
        console.log('=== LAST MESSAGE ===');
        console.log('Role:', lastMessage.role);
        console.log('Message keys:', Object.keys(lastMessage));
        console.log('Full message:', lastMessage);
        
        if ((lastMessage as any).renderedComponent) {
          console.log('=== RENDERED COMPONENT ===');
          const renderedComp = (lastMessage as any).renderedComponent;
          console.log('Rendered component:', renderedComp);
          console.log('Component type:', renderedComp.type);
          console.log('Component type.name:', renderedComp.type?.name);
          console.log('Component type.displayName:', renderedComp.type?.displayName);
          console.log('Component props:', renderedComp.props);
          console.log('Component props keys:', Object.keys(renderedComp.props || {}));
        }
        
        console.log('=== MESSAGE METADATA ===');
        console.log('componentName:', (lastMessage as any).componentName);
        console.log('componentProps:', (lastMessage as any).componentProps);
        console.log('componentSchema:', (lastMessage as any).componentSchema);
      }
      
      const userMessages = thread.messages.filter(m => m.role === 'user');
      const lastUserMessageIndex = userMessages.length > 0 
        ? thread.messages.lastIndexOf(userMessages[userMessages.length - 1])
        : -1;
      
      if (lastUserMessageIndex >= 0) {
        const componentsFromThread = thread.messages
          .slice(lastUserMessageIndex + 1)
          .filter(message => message.role === 'assistant' && message.renderedComponent)
          .map((message, index) => {
            // Try to extract component name from the rendered component
            const renderedComp = (message as any).renderedComponent;
            let componentName = (message as any).componentName || 'Component';
            
            console.log(`=== EXTRACTING COMPONENT ${index} ===`);
            console.log('Initial componentName:', componentName);
            
            // Try to get the component name from the rendered component's type
            if (renderedComp && renderedComp.type && renderedComp.type.name) {
              componentName = renderedComp.type.name;
              console.log('Got name from type.name:', componentName);
            }
            
            // Try displayName
            if (renderedComp && renderedComp.type && renderedComp.type.displayName) {
              componentName = renderedComp.type.displayName;
              console.log('Got name from type.displayName:', componentName);
            }
            
            // Extract props
            let props = (message as any).componentProps || {};
            console.log('Props from componentProps:', props);
            
            // Try to get props from rendered component
            if (renderedComp && renderedComp.props) {
              console.log('Props from renderedComponent.props:', renderedComp.props);
              // Merge or use rendered props if componentProps is empty
              if (Object.keys(props).length === 0) {
                props = renderedComp.props;
                console.log('Using rendered props:', props);
              }
            }
            
            const component = {
              id: `comp-${Date.now()}-${index}`,
              name: componentName,
              props: props,
              schema: (message as any).componentSchema,
            };
            
            console.log('Final component:', component);
            return component;
          });
        
        if (componentsFromThread.length > 0) {
          console.log('=== EXTRACTED COMPONENTS ===');
          console.log('Component count:', componentsFromThread.length);
          console.log('Components:', componentsFromThread);
          setComponents(componentsFromThread);
          
          // Create new project if none exists
          if (!currentProject) {
            createNewProject(prompt);
          }
        }
      }
    }
  }, [thread?.messages?.length]); // Only re-run when message count changes
  
  // Auto-save when components change
  useEffect(() => {
    if (components.length > 0 && currentProject) {
      saveToStorage();
    }
  }, [components]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      // Clear existing components before generating new ones
      console.log('Clearing existing components before new generation');
      setComponents([]);
      
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
  
  const handleSelectTemplate = (template: Template) => {
    // Convert template components to ComponentInstance format
    const templateComponents: ComponentInstance[] = template.components.map((comp, index) => ({
      id: `temp-${Date.now()}-${index}`,
      name: comp.type,
      props: comp.props,
    }));
    
    // Set components directly from template
    setComponents(templateComponents);
    
    // Create new project with template
    createNewProject(`${template.name} Template`);
    
    // Set prompt to template description for context
    setPrompt(`Create a ${template.industry} landing page: ${template.description}`);
  };
  
  const handleUsePromptTemplate = (template: string) => {
    setPrompt(template);
  };
  
  const handleSuggestionClick = (suggestionText: string) => {
    // Append suggestion to prompt with proper formatting
    const currentPrompt = prompt.trim();
    if (currentPrompt) {
      setPrompt(`${currentPrompt}. ${suggestionText}`);
    } else {
      setPrompt(suggestionText);
    }
  };
  
  const handleShowVariations = (index: number) => {
    setVariationComponentIndex(index);
    setShowVariationSelector(true);
  };
  
  const handleSelectVariation = (variation: ComponentVariation) => {
    if (variationComponentIndex !== null) {
      updateComponent(variationComponentIndex, variation.props);
    }
  };
  
  const handleNewProject = async () => {
    clearDesign();
    // Start a new thread to avoid reusing old conversation
    if (startNewThread) {
      await startNewThread();
      console.log('Started new thread for new project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Projects Sidebar */}
      <ProjectsSidebar
        currentProjectId={currentProject?.id}
        onSelectProject={loadFromStorage}
        onNewProject={handleNewProject}
      />
      
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
              onClick={() => setShowExportModal(true)}
              disabled={components.length === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              title={components.length === 0 ? "Generate a landing page first" : "Export as React or HTML code"}
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
              <div className="flex gap-3">
                <TemplateSelector onSelectTemplate={handleUsePromptTemplate} />
                <button
                  onClick={() => setShowTemplateGallery(true)}
                  className="text-sm text-purple-400 hover:text-purple-300 underline flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                  Component Templates
                </button>
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
                </button>
              </div>
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
            
            {/* Prompt Suggestions */}
            {!showAnalysis && suggestions.length > 0 && (
              <PromptSuggestionsPanel 
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}

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
              {thread?.messages && thread.messages.some(m => m.role === 'assistant' && m.renderedComponent) && !isLoading && components.length > 0 && (
                <button
                  onClick={async () => {
                    if (confirm('Clear current design?')) {
                      clearDesign();
                      // Start a new thread to avoid reusing old conversation
                      if (startNewThread) {
                        await startNewThread();
                        console.log('Started new thread');
                      }
                    }
                  }}
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
              ) : components.length > 0 ? (
                <div className="bg-white min-h-screen">
                  {components.map((component, index) => {
                    // Find the corresponding rendered component from thread OR render from component registry
                    const threadComponents = thread?.messages
                      .filter(m => m.role === 'assistant' && m.renderedComponent) || [];
                    let renderedComponent = threadComponents[index]?.renderedComponent;
                    
                    // If no thread component (e.g., from template or loaded project), render using component registry
                    if (!renderedComponent) {
                      const ComponentClass = componentRegistry.find(c => c.name === component.name)?.component;
                      if (ComponentClass) {
                        renderedComponent = <ComponentClass {...component.props} />;
                      } else {
                        console.warn('Component not found in registry:', component.name);
                        renderedComponent = (
                          <div className="p-6 bg-red-50 border border-red-200 rounded-lg m-4">
                            <p className="text-red-800">
                              ⚠️ Component "{component.name}" not found in registry
                            </p>
                          </div>
                        );
                      }
                    }
                    
                    return (
                      <ComponentWrapper
                        key={component.id}
                        component={component}
                        index={index}
                        onEdit={startEditing}
                        onDelete={deleteComponent}
                        onVariations={handleShowVariations}
                      >
                        <ErrorBoundary
                          fallback={
                            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
                              <p className="text-yellow-800">
                                ⚠️ Component failed to render. This might be due to invalid data from AI generation.
                              </p>
                            </div>
                          }
                        >
                          {renderedComponent}
                        </ErrorBoundary>
                      </ComponentWrapper>
                    );
                  })}
                </div>
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
      
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        components={components}
        projectName={prompt.slice(0, 50) || 'landing-page'}
      />
      
      {/* Template Gallery */}
      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onSelectTemplate={handleSelectTemplate}
      />
      
      {/* Edit Modal */}
      {isEditing && editingIndex !== null && components[editingIndex] && (
        <EditModal
          component={components[editingIndex]}
          onSave={(updatedProps) => {
            updateComponent(editingIndex, updatedProps);
            stopEditing();
          }}
          onCancel={stopEditing}
        />
      )}
      
      {/* Variation Selector */}
      {showVariationSelector && variationComponentIndex !== null && components[variationComponentIndex] && (
        <VariationSelector
          component={components[variationComponentIndex]}
          onSelectVariation={handleSelectVariation}
          onClose={() => {
            setShowVariationSelector(false);
            setVariationComponentIndex(null);
          }}
        />
      )}
    </div>
  );
}
