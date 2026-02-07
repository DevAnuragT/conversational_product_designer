/**
 * Code Formatting Utilities
 * Note: Prettier is loaded dynamically to avoid SSR issues
 */

export async function formatTypeScript(code: string): Promise<string> {
  try {
    // Dynamic import to avoid SSR issues
    const prettier = await import('prettier');
    return await prettier.default.format(code, {
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
    const prettier = await import('prettier');
    return await prettier.default.format(code, {
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
    const prettier = await import('prettier');
    return await prettier.default.format(code, {
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
