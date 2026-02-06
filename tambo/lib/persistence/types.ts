/**
 * Persistence Types
 */

import { ComponentInstance } from '@/lib/export';

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  prompt: string;
  components: ComponentInstance[];
  thumbnail?: string;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  componentCount: number;
}
