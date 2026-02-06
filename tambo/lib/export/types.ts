/**
 * Export System Types
 */

export type ExportFormat = 'react' | 'html';

export interface ExportConfig {
  format: ExportFormat;
  includeComments: boolean;
  includeTailwind: boolean;
  includeReadme: boolean;
  projectName: string;
}

export interface ExportFile {
  path: string;
  content: string;
  type: 'component' | 'style' | 'config' | 'readme';
}

export interface ExportResult {
  files: ExportFile[];
  metadata: ExportMetadata;
}

export interface ExportMetadata {
  componentCount: number;
  totalLines: number;
  dependencies: string[];
  format: ExportFormat;
  timestamp: number;
}

export interface ComponentInstance {
  id: string;
  name: string;
  props: any;
  schema?: any;
}
