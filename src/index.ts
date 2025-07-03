#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import SlidevManager from './slidev-manager.js';
import { SlideGenerator } from './slide-generator.js';
import { checkEnvironment } from './utils.js';
import { websearch } from './websearch.js';
import { SLIDEV_USAGE_GUIDE, GUIDE_PROMPT } from './constants.js';
import { THEME_PRESETS } from './slide-templates.js';

const server = new Server(
  {
    name: 'slidev-mcp',
    version: '0.3.1',
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
    },
  }
);

// Initialize managers
const slidevManager = new SlidevManager();
const slideGenerator = new SlideGenerator();

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'guide',
        description: 'Guide the AI to use Slidev effectively with advanced features',
      },
    ],
  };
});

// Get prompt content
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name } = request.params;
  
  if (name === 'guide') {
    return {
      description: 'Guide the AI to use Slidev effectively with advanced features',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: GUIDE_PROMPT,
          },
        },
      ],
    };
  }
  
  throw new McpError(ErrorCode.InvalidRequest, `Unknown prompt: ${name}`);
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_slidev_usage',
        description: 'Get comprehensive usage documentation of Slidev including layouts, animations, and components',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'check_environment',
        description: 'Check if Node.js and slidev-cli is ready',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'create_slidev',
        description: 'Create a new Slidev project. You need to ask user for title and author to continue the task.',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'The path where to create the Slidev project',
            },
            title: {
              type: 'string',
              description: 'The title of the presentation',
            },
            author: {
              type: 'string',
              description: 'The author of the presentation',
            },
          },
          required: ['path', 'title', 'author'],
        },
      },
      {
        name: 'load_slidev',
        description: 'Load existing Slidev project and get the current Slidev markdown content',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'The path to the existing Slidev project',
            },
          },
          required: ['path'],
        },
      },
      {
        name: 'make_cover',
        description: 'Create or update Slidev cover page',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'The title of the presentation',
            },
            subtitle: {
              type: 'string',
              description: 'The subtitle of the presentation',
            },
            author: {
              type: 'string',
              description: 'The author of the presentation',
            },
            background: {
              type: 'string',
              description: 'The background image URL',
            },
            pythonStringTemplate: {
              type: 'string',
              description: 'Python string template for custom cover layout',
            },
          },
          required: ['title'],
        },
      },
      {
        name: 'add_page',
        description: 'Add new page to the presentation',
        inputSchema: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              description: 'Markdown format text to describe page content',
            },
            layout: {
              type: 'string',
              description: 'Slidev layout name (default: "default")',
              default: 'default',
            },
          },
          required: ['content'],
        },
      },
      {
        name: 'set_page',
        description: 'Set the content of a specific page',
        inputSchema: {
          type: 'object',
          properties: {
            index: {
              type: 'number',
              description: 'The index of the page to set (0 is cover)',
            },
            content: {
              type: 'string',
              description: 'The markdown content to set',
            },
            layout: {
              type: 'string',
              description: 'The layout of the page',
              default: 'default',
            },
          },
          required: ['index', 'content'],
        },
      },
      {
        name: 'get_page',
        description: 'Get the content of a specific page',
        inputSchema: {
          type: 'object',
          properties: {
            index: {
              type: 'number',
              description: 'The index of the page to get',
            },
          },
          required: ['index'],
        },
      },
      {
        name: 'get_all_slides',
        description: 'Get all slides with their content, layout, and metadata',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'create_bulk_slides',
        description: 'Create a complete presentation with multiple slides at once based on topic',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description: 'The main topic of the presentation',
            },
            slideCount: {
              type: 'number',
              description: 'Number of slides to generate (default: 10)',
              default: 10,
            },
            style: {
              type: 'string',
              enum: ['minimal', 'detailed', 'visual', 'academic'],
              description: 'Presentation style',
              default: 'detailed',
            },
            includeAnimations: {
              type: 'boolean',
              description: 'Include animations in slides',
              default: true,
            },
            includeCode: {
              type: 'boolean',
              description: 'Include code examples',
              default: false,
            },
            includeImages: {
              type: 'boolean',
              description: 'Include images in slides',
              default: true,
            },
            theme: {
              type: 'string',
              description: 'Theme to apply',
              default: 'default',
            },
            customInstructions: {
              type: 'string',
              description: 'Additional custom instructions for slide generation',
            },
          },
          required: ['topic'],
        },
      },
      {
        name: 'apply_theme',
        description: 'Apply a theme to the presentation',
        inputSchema: {
          type: 'object',
          properties: {
            themeName: {
              type: 'string',
              enum: ['corporate', 'creative', 'minimal', 'dark', 'custom'],
              description: 'Predefined theme name or "custom"',
            },
            customTheme: {
              type: 'object',
              description: 'Custom theme configuration (if themeName is "custom")',
              properties: {
                name: { type: 'string' },
                primaryColor: { type: 'string' },
                secondaryColor: { type: 'string' },
                backgroundColor: { type: 'string' },
                fontFamily: { type: 'string' },
                fontSize: { type: 'string' },
                transition: { type: 'string' },
                customCSS: { type: 'string' },
              },
            },
          },
          required: ['themeName'],
        },
      },
      {
        name: 'add_animation',
        description: 'Add animation to a specific slide',
        inputSchema: {
          type: 'object',
          properties: {
            slideIndex: {
              type: 'number',
              description: 'Index of the slide to add animation to',
            },
            animationType: {
              type: 'string',
              enum: ['v-click', 'v-after', 'v-click-hide', 'v-motion', 'transition'],
              description: 'Type of animation',
            },
            target: {
              type: 'string',
              description: 'Target element or text to animate',
            },
            options: {
              type: 'object',
              description: 'Animation options',
            },
          },
          required: ['slideIndex', 'animationType'],
        },
      },
      {
        name: 'add_component',
        description: 'Add a component (Tweet, Youtube, Video, etc.) to a slide',
        inputSchema: {
          type: 'object',
          properties: {
            slideIndex: {
              type: 'number',
              description: 'Index of the slide to add component to',
            },
            componentType: {
              type: 'string',
              enum: ['Tweet', 'Youtube', 'SlidevVideo', 'Arrow', 'Toc', 'Link', 'LightOrDark', 'Transform', 'AutoFitText'],
              description: 'Type of component to add',
            },
            props: {
              type: 'object',
              description: 'Component properties',
            },
            children: {
              type: 'string',
              description: 'Component children content',
            },
          },
          required: ['slideIndex', 'componentType'],
        },
      },
      {
        name: 'review_slides',
        description: 'Review and get suggestions for the current presentation',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'websearch',
        description: 'Extract content from a URL for presentation material. If the user provides a URL, ask them to search the web themselves and provide the relevant text content.',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'The URL to fetch content from',
            },
          },
          required: ['url'],
        },
      },
      {
        name: 'start_slidev',
        description: 'Return the command to start Slidev HTTP server',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'websearch': {
        const { url } = args as { url: string };
        const result = await websearch(url);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'get_slidev_usage': {
        return {
          content: [
            {
              type: 'text',
              text: SLIDEV_USAGE_GUIDE,
            },
          ],
        };
      }
      
      case 'check_environment': {
        const result = await checkEnvironment();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'create_slidev': {
        const { path, title, author } = args as { path: string; title: string; author: string };
        const result = await slidevManager.createSlidev(path, title, author);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'load_slidev': {
        const { path } = args as { path: string };
        const result = await slidevManager.loadSlidiv(path);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'make_cover': {
        const { title, subtitle, author, background, pythonStringTemplate } = args as {
          title: string;
          subtitle?: string;
          author?: string;
          background?: string;
          pythonStringTemplate?: string;
        };
        const result = await slidevManager.makeCover({
          title,
          subtitle,
          author,
          background,
          pythonStringTemplate,
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'add_page': {
        const { content, layout } = args as { content: string; layout?: string };
        const result = await slidevManager.addPage(content, layout);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'set_page': {
        const { index, content, layout } = args as { index: number; content: string; layout?: string };
        const result = await slidevManager.setPage(index, content, layout);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'get_page': {
        const { index } = args as { index: number };
        const result = slidevManager.getPage(index);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'get_all_slides': {
        const result = slidevManager.getAllSlides();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'create_bulk_slides': {
        const input = args as {
          topic: string;
          slideCount?: number;
          style?: 'minimal' | 'detailed' | 'visual' | 'academic';
          includeAnimations?: boolean;
          includeCode?: boolean;
          includeImages?: boolean;
          theme?: string;
          customInstructions?: string;
        };
        
        if (!slidevManager.hasActiveProject()) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: false,
                  message: 'No active Slidev project. Please create or load one first.',
                }, null, 2),
              },
            ],
          };
        }
        
        const slides = slideGenerator.generateBulkSlides(input);
        
        // Clear existing slides and add generated ones
        const content = slidevManager.getSlidevContent();
        content.length = 0; // Clear array
        
        for (const slide of slides) {
          if (slide.index === 0) {
            // Update cover slide
            await slidevManager.makeCover({
              title: input.topic,
              subtitle: 'A Comprehensive Overview',
              background: slide.frontmatter?.background,
            });
          } else {
            // Add other slides
            const slideContent = slide.content;
            const layout = slide.layout || 'default';
            await slidevManager.addPage(slideContent, layout);
          }
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: `Generated ${slides.length} slides for topic: ${input.topic}`,
                output: slides,
              }, null, 2),
            },
          ],
        };
      }
      
      case 'apply_theme': {
        const { themeName, customTheme } = args as {
          themeName: string;
          customTheme?: any;
        };
        
        let themeConfig;
        if (themeName === 'custom' && customTheme) {
          themeConfig = customTheme;
        } else {
          themeConfig = THEME_PRESETS[themeName as keyof typeof THEME_PRESETS];
          if (!themeConfig) {
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    success: false,
                    message: `Unknown theme: ${themeName}`,
                  }, null, 2),
                },
              ],
            };
          }
        }
        
        const result = await slidevManager.applyTheme(themeConfig);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'add_animation': {
        const { slideIndex, animationType, target, options } = args as {
          slideIndex: number;
          animationType: 'v-click' | 'v-after' | 'v-click-hide' | 'v-motion' | 'transition';
          target?: string;
          options?: any;
        };
        
        const result = await slidevManager.addAnimation(slideIndex, {
          type: animationType,
          target,
          options,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'add_component': {
        const { slideIndex, componentType, props, children } = args as {
          slideIndex: number;
          componentType: string;
          props?: any;
          children?: string;
        };
        
        const result = await slidevManager.addComponent(slideIndex, {
          type: componentType,
          props,
          children,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'review_slides': {
        const result = slidevManager.reviewSlides();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'start_slidev': {
        const result = slidevManager.startSlidiv();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new McpError(ErrorCode.InternalError, `Error executing tool ${name}: ${errorMessage}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Slidev MCP server v0.3.1 running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});