/**
 * Design Store - State Management for Component Editing and Projects
 */

import { create } from 'zustand';
import { ComponentInstance } from '@/lib/export';
import { Project, storage } from '@/lib/persistence';

interface DesignState {
  // Current project
  currentProject: Project | null;
  components: ComponentInstance[];
  
  // UI state
  isEditing: boolean;
  editingIndex: number | null;
  
  // Actions
  setProject: (project: Project) => void;
  setComponents: (components: ComponentInstance[]) => void;
  addComponent: (component: ComponentInstance) => void;
  updateComponent: (index: number, props: any) => void;
  deleteComponent: (index: number) => void;
  moveComponent: (from: number, to: number) => void;
  clearDesign: () => void;
  
  // Editing
  startEditing: (index: number) => void;
  stopEditing: () => void;
  
  // Persistence
  saveToStorage: () => void;
  loadFromStorage: (id: string) => void;
  createNewProject: (prompt: string) => void;
}

export const useDesignStore = create<DesignState>((set, get) => ({
  currentProject: null,
  components: [],
  isEditing: false,
  editingIndex: null,
  
  setProject: (project) => set({ 
    currentProject: project, 
    components: project.components 
  }),
  
  setComponents: (components) => set({ components }),
  
  addComponent: (component) => set((state) => ({
    components: [...state.components, component]
  })),
  
  updateComponent: (index, props) => set((state) => {
    const updated = [...state.components];
    updated[index] = { ...updated[index], props };
    return { components: updated };
  }),
  
  deleteComponent: (index) => set((state) => ({
    components: state.components.filter((_, i) => i !== index)
  })),
  
  moveComponent: (from, to) => set((state) => {
    console.log('moveComponent called:', { from, to, componentsLength: state.components.length });
    
    if (from === to || from < 0 || to < 0 || from >= state.components.length || to >= state.components.length) {
      console.log('moveComponent: invalid move, returning state');
      return state;
    }
    
    const updated = [...state.components];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    console.log('moveComponent: moved successfully');
    return { components: updated };
  }),
  
  clearDesign: () => set({ 
    currentProject: null,
    components: [], 
    isEditing: false, 
    editingIndex: null 
  }),
  
  startEditing: (index) => set({ isEditing: true, editingIndex: index }),
  stopEditing: () => set({ isEditing: false, editingIndex: null }),
  
  saveToStorage: () => {
    const state = get();
    if (!state.currentProject) return;
    
    const project: Project = {
      ...state.currentProject,
      components: state.components,
      updatedAt: Date.now()
    };
    
    storage.saveProject(project);
    set({ currentProject: project });
  },
  
  loadFromStorage: (id) => {
    const project = storage.getProject(id);
    if (project) {
      set({ 
        currentProject: project, 
        components: project.components,
        isEditing: false,
        editingIndex: null
      });
    }
  },
  
  createNewProject: (prompt) => {
    const project: Project = {
      id: storage.generateId(),
      name: prompt.slice(0, 50) || `Project ${new Date().toLocaleDateString()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      prompt,
      components: []
    };
    
    set({ currentProject: project, components: [] });
  },
}));
