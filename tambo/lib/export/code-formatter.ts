/**
 * Code Formatting Utilities
 */

import prettier from 'prettier';

export async function formatTypeScript(code: string): Promise<string> {
  try {
    return await prettier.format(code, {
      parser: 'typescript',
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      tabWidth: 2,
      printWidth: 80,
    });
  } catch (error) {
    console.error('Error formatting TypeScript:', error);
    return code;
  }
}

export async function formatHTML(code: string): Promise<string> {
  try {
    return await prettier.format(code, {
      parser: 'html',
      tabWidth: 2,
      printWidth: 80,
    });
  } catch (error) {
    console.error('Error formatting HTML:', error);
    return code;
  }
}

export async function formatJSON(code: string): Promise<string> {
  try {
    return await prettier.format(code, {
      parser: 'json',
      tabWidth: 2,
    });
  } catch (error) {
    console.error('Error formatting JSON:', error);
    return code;
  }
}

export function countLines(code: string): number {
  return code.split('\n').length;
}
