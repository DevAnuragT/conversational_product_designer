'use client';

import React, { useState } from 'react';
import { ProjectMetadata } from '@/lib/persistence';

interface ProjectCardProps {
  project: ProjectMetadata;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
}

export default function ProjectCard({ 
  project, 
  isActive, 
  onClick, 
  onDelete,
  onRename 
}: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  
  const handleRename = () => {
    const newName = prompt('Enter new name:', project.name);
    if (newName && newName.trim()) {
      onRename(newName.trim());
    }
    setShowMenu(false);
  };
  
  const handleDelete = () => {
    if (confirm(`Delete "${project.name}"?`)) {
      onDelete();
    }
    setShowMenu(false);
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };
  
  return (
    <div
      className={`
        p-4 rounded-lg cursor-pointer transition-colors relative
        ${isActive 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-gray-700 hover:bg-gray-600'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">
            {project.name}
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            {project.componentCount} component{project.componentCount !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDate(project.updatedAt)}
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="text-gray-300 hover:text-white ml-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
          />
          <div className="absolute right-4 top-12 bg-gray-900 rounded-lg shadow-xl py-2 z-50 min-w-[150px] border border-gray-700">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRename();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
