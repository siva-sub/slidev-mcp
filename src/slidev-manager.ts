import * as path from 'path';
import { 
  SlidevResult, 
  SlidevProject, 
  CoverOptions, 
  SlideData,
  ThemeConfig,
  AnimationConfig,
  ComponentConfig,
  SlideReviewResult
} from './types.js';
import { 
  parseMarkdownSlides, 
  ensureDirectoryExists, 
  fileExists, 
  readFile, 
  writeFile, 
  getCurrentDate 
} from './utils.js';
import { THEME_PRESETS } from './slide-templates.js';

class SlidevManager {
  private activeProject: SlidevProject | null = null;
  private slidevContent: string[] = [];
  private currentTheme: ThemeConfig | null = null;

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

  public getAllSlides(): SlidevResult {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    const slides: SlideData[] = this.slidevContent.map((content, index) => ({
      index,
      content,
      layout: this.extractLayout(content),
      frontmatter: this.extractFrontmatter(content)
    }));
    
    return {
      success: true,
      message: `Retrieved ${slides.length} slides`,
      output: slides
    };
  }

  public async applyTheme(themeConfig: ThemeConfig): Promise<SlidevResult> {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    this.currentTheme = themeConfig;
    
    // Create theme configuration file
    const themePath = path.join(this.activeProject.path, 'theme.css');
    const themeCSS = this.generateThemeCSS(themeConfig);
    await writeFile(themePath, themeCSS);
    
    // Update first slide with theme
    if (this.slidevContent.length > 0) {
      const firstSlide = this.slidevContent[0];
      const updatedSlide = this.updateSlideFrontmatter(firstSlide, {
        theme: themeConfig.name
      });
      this.slidevContent[0] = updatedSlide;
      await this.saveSlidevContent();
    }
    
    return {
      success: true,
      message: `Applied theme: ${themeConfig.name}`,
      output: themeConfig
    };
  }

  public async addAnimation(slideIndex: number, animation: AnimationConfig): Promise<SlidevResult> {
    if (!this.activeProject || slideIndex < 0 || slideIndex >= this.slidevContent.length) {
      return {
        success: false,
        message: "Invalid slide index or no active project"
      };
    }
    
    let slide = this.slidevContent[slideIndex];
    slide = this.applyAnimationToSlide(slide, animation);
    this.slidevContent[slideIndex] = slide;
    
    await this.saveSlidevContent();
    
    return {
      success: true,
      message: `Applied ${animation.type} animation to slide ${slideIndex}`,
      output: slide
    };
  }

  public async addComponent(slideIndex: number, component: ComponentConfig): Promise<SlidevResult> {
    if (!this.activeProject || slideIndex < 0 || slideIndex >= this.slidevContent.length) {
      return {
        success: false,
        message: "Invalid slide index or no active project"
      };
    }
    
    const componentHtml = this.generateComponentHtml(component);
    let slide = this.slidevContent[slideIndex];
    
    // Add component to slide content
    const parts = slide.split('\n---\n');
    if (parts.length > 1) {
      parts[1] = parts[1] + '\n\n' + componentHtml;
      slide = parts.join('\n---\n');
    } else {
      slide = slide + '\n\n' + componentHtml;
    }
    
    this.slidevContent[slideIndex] = slide;
    await this.saveSlidevContent();
    
    return {
      success: true,
      message: `Added ${component.type} component to slide ${slideIndex}`,
      output: slide
    };
  }

  public reviewSlides(): SlidevResult {
    if (!this.activeProject) {
      return {
        success: false,
        message: "No active Slidev project. Please create or load one first."
      };
    }
    
    const review: SlideReviewResult = {
      slideCount: this.slidevContent.length,
      themes: [],
      layouts: [],
      hasAnimations: false,
      hasComponents: false,
      suggestions: []
    };
    
    // Analyze slides
    this.slidevContent.forEach((slide, index) => {
      const layout = this.extractLayout(slide);
      if (layout && !review.layouts.includes(layout)) {
        review.layouts.push(layout);
      }
      
      if (slide.includes('v-click') || slide.includes('v-motion') || slide.includes('v-after')) {
        review.hasAnimations = true;
      }
      
      if (slide.includes('<') && slide.includes('>')) {
        review.hasComponents = true;
      }
    });
    
    // Generate suggestions
    if (review.slideCount < 5) {
      review.suggestions.push('Consider adding more slides for a comprehensive presentation');
    }
    
    if (!review.hasAnimations) {
      review.suggestions.push('Add animations to make your presentation more engaging');
    }
    
    if (review.layouts.length < 3) {
      review.suggestions.push('Use more varied layouts for visual diversity');
    }
    
    if (!review.hasComponents) {
      review.suggestions.push('Consider using components like charts, videos, or interactive elements');
    }
    
    return {
      success: true,
      message: 'Slide review completed',
      output: review
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

  // Helper methods
  private extractLayout(slide: string): string | undefined {
    const match = slide.match(/layout:\s*(\S+)/);
    return match ? match[1] : undefined;
  }

  private extractFrontmatter(slide: string): Record<string, any> {
    const frontmatterMatch = slide.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return {};
    
    const frontmatter: Record<string, any> = {};
    const lines = frontmatterMatch[1].split('\n');
    
    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        frontmatter[key] = value;
      }
    });
    
    return frontmatter;
  }

  private updateSlideFrontmatter(slide: string, updates: Record<string, any>): string {
    const parts = slide.split('\n---\n');
    if (parts.length < 2) return slide;
    
    const frontmatterLines = parts[0].split('\n').filter(line => line !== '---');
    const existingKeys = new Set<string>();
    
    // Update existing keys
    const updatedLines = frontmatterLines.map(line => {
      const [key] = line.split(':');
      if (key && updates[key.trim()]) {
        existingKeys.add(key.trim());
        return `${key}: ${updates[key.trim()]}`;
      }
      return line;
    });
    
    // Add new keys
    Object.entries(updates).forEach(([key, value]) => {
      if (!existingKeys.has(key)) {
        updatedLines.push(`${key}: ${value}`);
      }
    });
    
    return `---\n${updatedLines.join('\n')}\n---\n${parts[1]}`;
  }

  private generateThemeCSS(theme: ThemeConfig): string {
    return `:root {
  --slidev-theme-primary: ${theme.primaryColor || '#3B82F6'};
  --slidev-theme-secondary: ${theme.secondaryColor || '#1E40AF'};
  --slidev-theme-background: ${theme.backgroundColor || '#FFFFFF'};
  --slidev-theme-font: ${theme.fontFamily || 'sans-serif'};
  --slidev-theme-font-size: ${theme.fontSize || '1rem'};
}

${theme.customCSS || ''}`;
  }

  private applyAnimationToSlide(slide: string, animation: AnimationConfig): string {
    const { type, target, options } = animation;
    
    switch (type) {
      case 'v-click':
        if (target) {
          return slide.replace(target, `<div v-click>${target}</div>`);
        }
        break;
        
      case 'v-motion':
        const motionProps = Object.entries(options || {})
          .map(([key, value]) => `:${key}='${JSON.stringify(value)}'`)
          .join(' ');
        if (target) {
          return slide.replace(target, `<div v-motion ${motionProps}>${target}</div>`);
        }
        break;
        
      case 'transition':
        return this.updateSlideFrontmatter(slide, {
          transition: options?.enter || 'slide-left'
        });
    }
    
    return slide;
  }

  private generateComponentHtml(component: ComponentConfig): string {
    const props = Object.entries(component.props || {})
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `:${key}="${JSON.stringify(value)}"`;
      })
      .join(' ');
    
    const children = typeof component.children === 'string' 
      ? component.children 
      : component.children?.map(child => 
          typeof child === 'string' ? child : this.generateComponentHtml(child)
        ).join('\n');
    
    if (children) {
      return `<${component.type} ${props}>\n${children}\n</${component.type}>`;
    }
    
    return `<${component.type} ${props} />`;
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