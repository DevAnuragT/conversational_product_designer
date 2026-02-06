'use client';

import React, { useState, useEffect } from 'react';
import { storage, ProjectMetadata } from '@/lib/persistence';
import ProjectCard from './ProjectCard';

interface ProjectsSidebarProps {
  currentProjectId?: string;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
}

export default function ProjectsSidebar({ 
  currentProjectId, 
  onSelectProject, 
  onNewProject 
}: ProjectsSidebarProps) {
  const [projects, setProjects] = useState<ProjectMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  const loadProjects = () => {
    const allProjects = storage.getAllProjectMetadata();
    setProjects(allProjects);
  };
  
  const handleSelectProject = (id: string) => {
    onSelectProject(id);
    setIsOpen(false);
  };
  
  const handleNewProject = () => {
    onNewProject();
    setIsOpen(false);
  };
  
  const handleDelete = (id: string) => {
    storage.deleteProject(id);
    loadProjects();
  };
  
  const handleRename = (id: string, newName: string) => {
    storage.renameProject(id, newName);
    loadProjects();
  };
  
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-24 z-40 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        Projects ({projects.length})
      </button>
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-gray-800 border-r border-gray-700 
        transform transition-transform duration-300 z-50 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Projects</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <button
              onClick={handleNewProject}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
          
          {/* Projects List */}
          <div className="flex-1 overflow-y-auto p-4">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <p className="text-gray-400 text-sm">No projects yet</p>
                <p className="text-gray-500 text-xs mt-1">Create your first landing page</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isActive={project.id === currentProjectId}
                    onClick={() => handleSelectProject(project.id)}
                    onDelete={() => handleDelete(project.id)}
                    onRename={(newName) => handleRename(project.id, newName)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              {projects.length} / 10 projects
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
