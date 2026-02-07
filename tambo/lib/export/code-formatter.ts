/**
 * Code Formatting Utilities
 * Simple formatting without external dependencies
 */

export async function formatTypeScript(code: string): Promise<string> {
  // Return code as-is since Prettier causes browser issues
  // The generated code is already well-formatted
  return code;
}

export async function formatHTML(code: string): Promise<string> {
  // Return code as-is
  return code;
}

export async function formatJSON(code: string): Promise<string> {
  // Use native JSON formatting
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    console.error('Error formatting JSON:', error);
    return code;
  }
}

export function countLines(code: string): number {
  return code.split('\n').length;
}
