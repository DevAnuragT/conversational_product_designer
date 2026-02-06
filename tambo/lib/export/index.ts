/**
 * Export System Entry Point
 */

export * from './types';
export * from './react-exporter';
export * from './html-exporter';
export * from './zip-builder';
export * from './code-formatter';

import { ReactExporter } from './react-exporter';
import { HTMLExporter } from './html-exporter';
import { ZIPBuilder } from './zip-builder';
import { ComponentInstance, ExportConfig, ExportResult } from './types';

export class ExportManager {
  private reactExporter = new ReactExporter();
  private htmlExporter = new HTMLExporter();
  private zipBuilder = new ZIPBuilder();
  
  async exportAndDownload(
    components: ComponentInstance[],
    config: ExportConfig
  ): Promise<void> {
    try {
      // Generate export files
      const result = await this.export(components, config);
      
      // Build and download ZIP
      await this.zipBuilder.buildAndDownload(result.files, config.projectName);
      
      return;
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error('Failed to export project');
    }
  }
  
  async export(
    components: ComponentInstance[],
    config: ExportConfig
  ): Promise<ExportResult> {
    if (config.format === 'react') {
      return await this.reactExporter.export(components, config);
    } else {
      return await this.htmlExporter.export(components, config);
    }
  }
}
