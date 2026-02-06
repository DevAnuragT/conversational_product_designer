/**
 * Design Store - State Management for Component Editing
 */

import { create } from 'zustand';
import { ComponentInstance } from '@/lib/export';

interface DesignState {
  // Current design
  components: ComponentInstance[];
  
  // UI state
  isEditing: boolean;
  editingIndex: number | null;
  
  // Actions
  setComponents: (components: ComponentInstance[]) => void;
  addComponent: (component: ComponentInstance) => void;
  updateComponent: (index: number, props: any) => void;
  deleteComponent: (index: number) => void;
  moveComponent: (from: number, to: number) => void;
  clearDesign: () => void;
  
  // Editing
  startEditing: (index: number) => void;
  stopEditing: () => void;
}

export const useDesignStore = create<DesignState>((set, get) => ({
  components: [],
  isEditing: false,
  editingIndex: null,
  
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
    if (from === to || from < 0 || to < 0 || from >= state.components.length || to >= state.components.length) {
      return state;
    }
    
    const updated = [...state.components];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    return { components: updated };
  }),
  
  clearDesign: () => set({ 
    components: [], 
    isEditing: false, 
    editingIndex: null 
  }),
  
  startEditing: (index) => set({ isEditing: true, editingIndex: index }),
  stopEditing: () => set({ isEditing: false, editingIndex: null }),
}));
