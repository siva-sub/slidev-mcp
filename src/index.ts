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
import { websearch } from './websearch.js';
import { checkEnvironment } from './utils.js';
import { SLIDEV_USAGE_GUIDE, GUIDE_PROMPT } from './constants.js';

const server = new Server(
  {
    name: 'slidev-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
    },
  }
);

// Initialize Slidev manager
const slidevManager = new SlidevManager();

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'guide',
        description: 'Guide the AI to use Slidev effectively',
      },
    ],
  };
});

// Get prompt content
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name } = request.params;
  
  if (name === 'guide') {
    return {
      description: 'Guide the AI to use Slidev effectively',
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
        name: 'websearch',
        description: 'Search the given https URL and get the markdown text of the website',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'The URL to search and extract content from',
            },
          },
          required: ['url'],
        },
      },
      {
        name: 'get_slidev_usage',
        description: 'Get usage document of Slidev',
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
  console.error('Slidev MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});