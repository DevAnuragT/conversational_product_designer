/**
 * ZIP Builder for Export
 */

import JSZip from 'jszip';
import { ExportFile } from './types';

export class ZIPBuilder {
  async build(files: ExportFile[], projectName: string): Promise<Blob> {
    const zip = new JSZip();
    const folder = zip.folder(projectName);
    
    if (!folder) {
      throw new Error('Failed to create ZIP folder');
    }
    
    // Add all files to ZIP
    files.forEach(file => {
      folder.file(file.path, file.content);
    });
    
    // Generate ZIP blob
    return await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6
      }
    });
  }
  
  download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  async buildAndDownload(files: ExportFile[], projectName: string): Promise<void> {
    const blob = await this.build(files, projectName);
    const filename = `${projectName.toLowerCase().replace(/\s+/g, '-')}.zip`;
    this.download(blob, filename);
  }
}
