import * as path from 'path';
import { SlidevResult, SlidevProject, CoverOptions } from './types.js';
import { 
  parseMarkdownSlides, 
  ensureDirectoryExists, 
  fileExists, 
  readFile, 
  writeFile, 
  getCurrentDate 
} from './utils.js';

class SlidevManager {
  private activeProject: SlidevProject | null = null;
  private slidevContent: string[] = [];

  public async loadSlidevContent(projectPath: string): Promise<boolean> {
    const slidesPath = path.join(projectPath, 'slides.md');
    
    if (!(await fileExists(slidesPath))) {
      return false;
    }
    
    const content = await readFile(slidesPath);
    
    this.activeProject = {
      path: projectPath,
      slidesPath
    };
    
    const slides = parseMarkdownSlides(content);
    this.slidevContent = slides.filter(slide => slide.trim());
    
    return true;
  }

  public async saveSlidevContent(): Promise<boolean> {
    if (!this.activeProject) {
      return false;
    }
    
    const content = this.slidevContent.join('\n\n');
    await writeFile(this.activeProject.slidesPath, content);
    
    return true;
  }

  public async createSlidev(projectPath: string, title: string, author: string): Promise<SlidevResult> {
    // Clear global state
    this.activeProject = null;
    this.slidevContent = [];
    
    try {
      await ensureDirectoryExists(projectPath);
      
      const slidesPath = path.join(projectPath, 'slides.md');
      
      // If slides.md already exists, load it
      if (await fileExists(slidesPath)) {
        await this.loadSlidevContent(projectPath);
        return {
          success: true,
          message: `Project already exists at ${slidesPath}`,
          output: this.slidevContent
        };
      }
      
      // Create new slides.md
      const initialContent = `---
theme: default
layout: cover
transition: slide-left
background: https://images.unsplash.com/photo-1502189562704-87e622a34c85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80
---

# ${title}
## Subtitle

Presented by ${author}`;
      
      await writeFile(slidesPath, initialContent);
      
      // Load the created content
      if (!(await this.loadSlidevContent(projectPath))) {
        return {
          success: false,
          message: "Successfully created project but failed to load file",
          output: projectPath
        };
      }
      
      return {
        success: true,
        message: `Successfully loaded slidev project ${projectPath}`,
        output: projectPath
      };
      
    } catch (error: any) {
      return {
        success: false,
        message: `Error creating project: ${error.message}`,
        output: projectPath
      };
    }
  }

  public async loadSlidiv(projectPath: string): Promise<SlidevResult> {
    if (await this.loadSlidevContent(projectPath)) {
      return {
        success: true,
        message: `Slidev project loaded from ${projectPath}`,
        output: this.slidevContent
      };
    }
    
    return {
      success: false,
      message: `Failed to load Slidev project from ${projectPath}`
    };
  }

  public async makeCover(options: CoverOptions): Promise<SlidevResult> {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    const { title, subtitle = "", author = "", background = "", pythonStringTemplate = "" } = options;
    const date = getCurrentDate();
    
    let template: string;
    
    if (pythonStringTemplate) {
      template = `---
theme: default
layout: cover
transition: slide-left
background: ${background}
---

${pythonStringTemplate
  .replace('{title}', title)
  .replace('{subtitle}', subtitle)
  .replace('{author}', author)
  .replace('{date}', date)}`;
    } else {
      template = `---
theme: default
layout: cover
transition: slide-left
background: ${background}
---

# ${title}
## ${subtitle}
### Presented By ${author} at ${date}`;
    }
    
    this.slidevContent[0] = template;
    await this.saveSlidevContent();
    
    return {
      success: true,
      message: "Cover page updated",
      output: 0
    };
  }

  public async addPage(content: string, layout: string = "default"): Promise<SlidevResult> {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    const template = `---
layout: ${layout}
transition: slide-left
---

${content}`;
    
    this.slidevContent.push(template);
    const pageIndex = this.slidevContent.length - 1;
    await this.saveSlidevContent();
    
    return {
      success: true,
      message: `Page added at index ${pageIndex}`,
      output: pageIndex
    };
  }

  public async setPage(index: number, content: string, layout: string = "default"): Promise<SlidevResult> {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    if (index < 0 || index >= this.slidevContent.length) {
      return {
        success: false,
        message: `Invalid page index: ${index}`
      };
    }
    
    const template = `---
layout: ${layout}
transition: slide-left
---

${content}`;
    
    this.slidevContent[index] = template;
    await this.saveSlidevContent();
    
    return {
      success: true,
      message: `Page ${index} updated`,
      output: index
    };
  }

  public getPage(index: number): SlidevResult {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    if (index < 0 || index >= this.slidevContent.length) {
      return {
        success: false,
        message: `Invalid page index: ${index}`
      };
    }
    
    return {
      success: true,
      message: `Content of page ${index}`,
      output: this.slidevContent[index]
    };
  }

  public startSlidiv(): SlidevResult {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    const projectPath = this.activeProject.path;
    return {
      success: true,
      message: "Command to start Slidev server",
      output: `cd ${projectPath} && yes | slidev --open`
    };
  }

  public getSlidevContent(): string[] {
    return [...this.slidevContent];
  }

  public hasActiveProject(): boolean {
    return this.activeProject !== null;
  }

  public getActiveProjectPath(): string | null {
    return this.activeProject?.path || null;
  }
}

export default SlidevManager;