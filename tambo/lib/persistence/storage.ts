/**
 * Storage Manager - LocalStorage persistence
 */

import { Project, ProjectMetadata } from './types';

export class StorageManager {
  private readonly STORAGE_KEY = 'tambo_projects';
  private readonly MAX_PROJECTS = 10;
  
  /**
   * Save or update a project
   */
  saveProject(project: Project): void {
    try {
      const projects = this.getAllProjects();
      const existingIndex = projects.findIndex(p => p.id === project.id);
      
      if (existingIndex >= 0) {
        // Update existing project
        projects[existingIndex] = {
          ...project,
          updatedAt: Date.now()
        };
      } else {
        // Add new project at the beginning
        projects.unshift({
          ...project,
          updatedAt: Date.now()
        });
        
        // Limit to MAX_PROJECTS
        if (projects.length > this.MAX_PROJECTS) {
          projects.pop();
        }
      }
      
      this.saveToStorage(projects);
    } catch (error) {
      console.error('Failed to save project:', error);
      throw new Error('Failed to save project. Storage might be full.');
    }
  }
  
  /**
   * Get all projects
   */
  getAllProjects(): Project[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  }
  
  /**
   * Get project metadata (without full component data)
   */
  getAllProjectMetadata(): ProjectMetadata[] {
    const projects = this.getAllProjects();
    return projects.map(p => ({
      id: p.id,
      name: p.name,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      componentCount: p.components.length
    }));
  }
  
  /**
   * Get a single project by ID
   */
  getProject(id: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find(p => p.id === id) || null;
  }
  
  /**
   * Delete a project
   */
  deleteProject(id: string): void {
    try {
      const projects = this.getAllProjects();
      const filtered = projects.filter(p => p.id !== id);
      this.saveToStorage(filtered);
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error('Failed to delete project');
    }
  }
  
  /**
   * Rename a project
   */
  renameProject(id: string, newName: string): void {
    try {
      const projects = this.getAllProjects();
      const project = projects.find(p => p.id === id);
      
      if (project) {
        project.name = newName;
        project.updatedAt = Date.now();
        this.saveToStorage(projects);
      }
    } catch (error) {
      console.error('Failed to rename project:', error);
      throw new Error('Failed to rename project');
    }
  }
  
  /**
   * Export project as JSON
   */
  exportProject(id: string): string {
    const project = this.getProject(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return JSON.stringify(project, null, 2);
  }
  
  /**
   * Import project from JSON
   */
  importProject(json: string): Project {
    try {
      const project = JSON.parse(json) as Project;
      
      // Validate project structure
      if (!project.id || !project.name || !project.components) {
        throw new Error('Invalid project format');
      }
      
      // Generate new ID to avoid conflicts
      project.id = this.generateId();
      project.createdAt = Date.now();
      project.updatedAt = Date.now();
      
      this.saveProject(project);
      return project;
    } catch (error) {
      console.error('Failed to import project:', error);
      throw new Error('Failed to import project. Invalid format.');
    }
  }
  
  /**
   * Clear all projects
   */
  clearAll(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear projects:', error);
    }
  }
  
  /**
   * Get storage usage info
   */
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY) || '';
      const used = new Blob([data]).size;
      const available = 5 * 1024 * 1024; // Assume 5MB limit
      const percentage = (used / available) * 100;
      
      return { used, available, percentage };
    } catch (error) {
      return { used: 0, available: 0, percentage: 0 };
    }
  }
  
  /**
   * Generate unique ID
   */
  generateId(): string {
    return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Private: Save to localStorage
   */
  private saveToStorage(projects: Project[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please delete some projects.');
      }
      throw error;
    }
  }
}

// Singleton instance
export const storage = new StorageManager();
