import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SlidevResult } from './types.js';

const execAsync = promisify(exec);

export function parseMarkdownSlides(content: string): string[] {
  const slides: string[] = [];
  const currentSlide: string[] = [];
  let inYaml = false;
  
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.trim() === '---' && !inYaml) {
      // Start YAML front matter
      if (currentSlide.length === 0) {
        inYaml = true;
        currentSlide.push(line);
      } else {
        // New slide separator
        slides.push(currentSlide.join('\n'));
        currentSlide.length = 0;
        currentSlide.push(line);
        inYaml = true;
      }
    } else if (line.trim() === '---' && inYaml) {
      // End YAML front matter
      currentSlide.push(line);
      inYaml = false;
    } else {
      currentSlide.push(line);
    }
  }
  
  // Add the last slide
  if (currentSlide.length > 0) {
    slides.push(currentSlide.join('\n'));
  }
  
  return slides.filter(slide => slide.trim());
}

export async function checkNodejsInstalled(): Promise<boolean> {
  try {
    await execAsync('node --version');
    return true;
  } catch {
    return false;
  }
}

export async function runCommand(command: string): Promise<SlidevResult> {
  try {
    const { stdout, stderr } = await execAsync(command);
    return {
      success: true,
      message: "Command executed successfully",
      output: stdout
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Command failed: ${error.message || error.stderr}`,
      output: error.stderr
    };
  }
}

export async function checkEnvironment(): Promise<SlidevResult> {
  if (!(await checkNodejsInstalled())) {
    return {
      success: false,
      message: "Node.js is not installed. Please install Node.js first."
    };
  }
  
  const result = await runCommand("slidev --version");
  if (!result.success) {
    return await runCommand("npm install -g @slidev/cli");
  }
  
  return {
    success: true,
    message: "Environment ready, Slidev is available",
    output: result.output
  };
}

export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, 'utf-8');
}

export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}