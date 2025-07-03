import fetch from 'node-fetch';
import { SlidevResult } from './types.js';
import { runCommand } from './utils.js';

export async function websearch(url: string): Promise<SlidevResult> {
  try {
    // First try using crwl command if available
    const result = await runCommand(`crwl ${url} -o markdown`);
    if (result.success && result.output && (result.output as string).length > 0) {
      return {
        success: true,
        message: "Successfully fetched webpage content",
        output: result.output
      };
    }
    
    // Fallback to basic fetch
    const response = await fetch(url);
    if (!response.ok) {
      return {
        success: false,
        message: `HTTP error! status: ${response.status}`
      };
    }
    
    const text = await response.text();
    
    return {
      success: true,
      message: "Successfully fetched webpage content",
      output: text
    };
    
  } catch (error: any) {
    return {
      success: false,
      message: `Error fetching webpage: ${error.message}`
    };
  }
}