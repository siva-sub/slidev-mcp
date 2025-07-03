# Slidev MCP Server

A Model Context Protocol (MCP) server that enables AI assistants to create professional Slidev presentations with advanced features like bulk slide generation, animations, themes, and interactive components.

<div align="center">
  <a href="https://github.com/siva-sub/slidev-mcp"><img src="https://img.shields.io/github/stars/siva-sub/slidev-mcp?style=social" alt="GitHub Stars"></a>
  <a href="https://www.npmjs.com/package/slidev-mcp"><img src="https://img.shields.io/npm/v/slidev-mcp?color=red" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/slidev-mcp"><img src="https://img.shields.io/npm/dm/slidev-mcp" alt="npm downloads"></a>
  <a href="https://sli.dev/"><img src="https://img.shields.io/badge/Slidev-2.0-blue" alt="Slidev Version"></a>
  <a href="https://github.com/siva-sub/slidev-mcp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
</div>

<div align="center">
  <p>
    <a href="https://github.com/siva-sub/slidev-mcp">GitHub</a> •
    <a href="https://www.npmjs.com/package/slidev-mcp">npm</a> •
    <a href="https://sli.dev/">Slidev Docs</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#features">Features</a>
  </p>
</div>

## Features

- 🚀 **Bulk Slide Creation** - Generate complete presentations with one command
- 🎨 **Theme Customization** - Apply predefined or custom themes
- ✨ **Animation Support** - Add v-click, v-motion, and other animations
- 🧩 **Dynamic Components** - Insert Tweet, Youtube, Video, and more
- 📊 **Multiple Layouts** - Use image-left, two-cols, iframe, and other layouts
- 🔍 **Slide Review** - Get AI-powered suggestions for improvement
- 🎯 **Style Options** - Choose from minimal, detailed, visual, or academic styles

## Installation

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- Claude Desktop app

### Install

<details>
<summary><b>Install in Claude Desktop</b></summary>

Add this to your Claude Desktop `claude_desktop_config.json` file. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

<details>
<summary>Alternative: Use Bun</summary>

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "bunx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary>Alternative: Use Deno</summary>

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "deno",
      "args": ["run", "--allow-env", "--allow-net", "--allow-read", "--allow-write", "npm:slidev-mcp"]
    }
  }
}
```

</details>

</details>

<details>
<summary><b>Install in Claude Code</b></summary>

Run this command in your terminal. See [Claude Code MCP docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/tutorials#set-up-model-context-protocol-mcp) for more info.

```sh
claude mcp add slidev-mcp -- npx -y slidev-mcp
```

<details>
<summary>Alternative: Using Bun</summary>

```sh
claude mcp add slidev-mcp -- bunx -y slidev-mcp
```

</details>

</details>

<details>
<summary><b>Install in Gemini CLI</b></summary>

See [Gemini CLI Configuration](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md) for details.

1. Open the Gemini CLI settings file. The location is `~/.gemini/settings.json` (where `~` is your home directory).
2. Add the following to the `mcpServers` object in your `settings.json` file:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

If the `mcpServers` object does not exist, create it.

</details>

<details>
<summary><b>Install in Amazon Q Developer CLI</b></summary>

Add this to your Amazon Q Developer CLI configuration file. See [Amazon Q Developer CLI docs](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line-mcp-configuration.html) for more details.

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

Add this to your Cursor `~/.cursor/mcp.json` file. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=slidev-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInNsaWRldi1tY3AiXX0%3D)

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Windsurf</b></summary>

Add this to your Windsurf MCP config file. See [Windsurf MCP docs](https://docs.windsurf.com/windsurf/mcp) for more info.

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary><b>Install in VS Code</b></summary>

Add this to your VS Code MCP config file. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
"mcp": {
  "servers": {
    "slidev-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary><b>Install in Zed</b></summary>

Add this to your Zed `settings.json`. See [Zed Context Server docs](https://zed.dev/docs/assistant/context-servers) for more info.

```json
{
  "context_servers": {
    "slidev-mcp": {
      "command": {
        "path": "npx",
        "args": ["-y", "slidev-mcp"]
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Cline</b></summary>

Add this tool to your Cline MCP settings file:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary><b>Install in JetBrains AI Assistant</b></summary>

See [JetBrains AI Assistant Documentation](https://www.jetbrains.com/help/ai-assistant/configure-an-mcp-server.html) for more details.

1. In JetBrains IDEs go to `Settings` → `Tools` → `AI Assistant` → `Model Context Protocol (MCP)`
2. Click `+ Add`.
3. Click on `Command` in the top-left corner of the dialog and select the As JSON option from the list
4. Add this configuration and click `OK`

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["-y", "slidev-mcp"]
    }
  }
}
```

5. Click `Apply` to save changes.

</details>

<details>
<summary><b>Install in Windows</b></summary>

The configuration on Windows is slightly different. Use this format for Windows systems:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "slidev-mcp"]
    }
  }
}
```

</details>

<details>
<summary><b>Install via Smithery</b></summary>

To install Slidev MCP Server for any client automatically via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli install slidev-mcp --client <CLIENT_NAME>
```

Replace `<CLIENT_NAME>` with your MCP client (e.g., `claude-desktop`, `cursor`, `vscode`, etc.).

</details>

<details>
<summary><b>Using Docker</b></summary>

If you prefer to run the MCP server in a Docker container:

1. **Create a Dockerfile:**

   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Install the latest version globally
   RUN npm install -g slidev-mcp @slidev/cli
   
   # Default command to run the server
   CMD ["slidev-mcp"]
   ```

2. **Build the image:**

   ```bash
   docker build -t slidev-mcp .
   ```

3. **Configure your MCP client:**

   ```json
   {
     "mcpServers": {
       "slidev-mcp": {
         "command": "docker",
         "args": ["run", "-i", "--rm", "-v", "${PWD}:/data", "-w", "/data", "slidev-mcp"]
       }
     }
   }
   ```

</details>

### Alternative Installation Methods

#### Global Installation

Install globally with npm:

```bash
npm install -g slidev-mcp
```

Then add to your MCP client config:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "slidev-mcp"
    }
  }
}
```

#### Local Installation

For development or testing:

```bash
# Clone the repository
git clone https://github.com/siva-sub/slidev-mcp.git
cd slidev-mcp

# Install dependencies
npm install

# Build
npm run build

# Add to MCP config with full path
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/slidev-mcp/dist/index.js"]
    }
  }
}
```

## Quick Start

After installation, restart Claude Desktop and you can start using Slidev MCP:

1. **Create your first presentation:**
   ```
   "Create a presentation about JavaScript async/await"
   ```

2. **Generate a complete deck:**
   ```
   "Create a 10-slide presentation on React hooks with animations and code examples"
   ```

3. **Apply a theme:**
   ```
   "Apply the corporate theme to my presentation"
   ```

4. **Add components:**
   ```
   "Add a YouTube video about TypeScript to slide 3"
   ```

## Usage

### Create a Presentation

Tell your AI assistant:
- "Create a presentation about TypeScript"
- "Generate a 15-slide presentation on Machine Learning with animations"
- "Create a visual presentation about React hooks with dark theme"

### Bulk Slide Generation

```typescript
// Example request
"Create a 20-slide presentation about Web Development with:
- Visual style
- Corporate theme
- Animations enabled
- Code examples
- Images included"
```

### Apply Themes

```typescript
// Predefined themes
"Apply the corporate theme"
"Use the dark theme"
"Switch to minimal theme"

// Custom theme
"Create a custom theme with blue colors and modern fonts"
```

### Add Components

```typescript
"Add a YouTube video to slide 5"
"Insert a tweet on slide 3"
"Add a mermaid diagram to the current slide"
"Include a code example with syntax highlighting"
```

### Web Content

When you need to include content from the web:
- If you provide a URL, the assistant will suggest you search the web yourself
- Copy the relevant content you want to include
- The assistant will help format it for your presentation

## Available Tools

### Core Operations
- `create_slidev` - Create new Slidev project
- `load_slidev` - Load existing project
- `make_cover` - Create/update cover slide
- `add_page` - Add new slide
- `set_page` - Update slide content
- `get_page` - Get slide by index
- `get_all_slides` - List all slides

### Advanced Features
- `create_bulk_slides` - Generate complete presentation
- `apply_theme` - Apply themes
- `add_animation` - Add animations
- `add_component` - Insert components
- `review_slides` - Get AI suggestions

### Utilities
- `websearch` - Extract content from URLs
- `get_slidev_usage` - Get Slidev documentation
- `check_environment` - Verify setup
- `start_slidev` - Get server command

## Themes

### Predefined Themes
- **corporate** - Professional business theme
- **creative** - Colorful gradient design
- **minimal** - Clean minimalist style
- **dark** - Dark mode for technical content

### Custom Themes
Create themes with:
- Primary/secondary colors
- Background colors
- Font families
- Custom CSS
- Transition effects

## Components

### Interactive Elements
- `Tweet` - Embed tweets
- `Youtube` - YouTube videos
- `SlidevVideo` - Local videos
- `Arrow` - Draw arrows
- `Toc` - Table of contents

### Layout Components
- `Transform` - Scale elements
- `AutoFitText` - Auto-resize text
- `LightOrDark` - Theme-aware content

### Diagrams
- `Mermaid` - Flowcharts and diagrams

## Animations

### Click Animations
- `v-click` - Reveal on click
- `v-after` - Show after previous
- `v-click-hide` - Hide on click

### Motion Effects
- `v-motion` - Smooth transitions
- Custom keyframe animations

### Transitions
- fade, fade-out
- slide-left, slide-right
- slide-up, slide-down
- view-transition

## Development

### Build from Source

```bash
# Clone repository
git clone https://github.com/siva-sub/slidev-mcp.git
cd slidev-mcp

# Install dependencies
npm install

# Build project
npm run build

# Run in development
npm run dev
```

### Local Testing

Configure Claude Desktop with local path:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "node",
      "args": ["/path/to/slidev-mcp/dist/index.js"]
    }
  }
}
```

## Troubleshooting

### Installation Issues

1. **"command not found" error**
   - Ensure you're using `npx` in the command field
   - Or install globally: `npm install -g slidev-mcp`

2. **"Cannot find module" error**
   - Clear npm cache: `npm cache clean --force`
   - Reinstall: `npm install -g slidev-mcp`

3. **Permission denied**
   - Use sudo for global install: `sudo npm install -g slidev-mcp`
   - Or use npx to avoid global installation

### Runtime Issues

1. **Slidev CLI not found**
   ```bash
   npm install -g @slidev/cli
   ```

2. **Node version error**
   - Check version: `node --version`
   - Must be Node.js 18 or higher
   - Update Node.js if needed

3. **MCP connection failed**
   - Restart Claude Desktop after config changes
   - Check the logs in Claude Desktop developer console
   - Verify JSON syntax in config file

### Getting Help

- Report issues: https://github.com/siva-sub/slidev-mcp/issues
- View examples: Check the `/examples` directory
- Slidev docs: https://sli.dev

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Submit pull request

## Changelog

### v0.3.0 (Latest)
- 📚 Massively enhanced guide prompt with comprehensive Slidev documentation
- 🎯 Added detailed layout, animation, and component references
- ✨ Improved bulk slide generation with better patterns
- 🎨 Enhanced theme system documentation
- 📝 Professional README format
- 🔧 Better TypeScript types and error handling

### v0.2.0
- ✨ Added bulk slide generation
- 🎨 Theme customization support
- 🎭 Animation capabilities
- 🧩 Dynamic component insertion
- 📊 Slide review functionality
- 🎯 Multiple presentation styles
- 📚 Comprehensive documentation

### v0.1.0
- 🚀 Initial TypeScript port
- 📦 NPM package support
- 🔧 Basic slide operations
- 🌐 Web search integration

## License

MIT © [Siva Sub](https://github.com/siva-sub)

## Credits

- Original Python implementation by [LSTM-Kirigaya](https://github.com/LSTM-Kirigaya/slidev-mcp)
- Built on [Slidev](https://sli.dev/) by Anthony Fu
- Uses [Model Context Protocol](https://modelcontextprotocol.io/) by Anthropic

## 🔧 Available Tools

Slidev MCP provides the following tools that LLMs can use:

### Core Slide Operations
- `create_slidev`: Create a new Slidev project
  - `path` (required): Directory path for the project
  - `title` (required): Presentation title
  - `author` (required): Presentation author
  
- `load_slidev`: Load existing Slidev project
  - `path` (required): Path to existing project

- `make_cover`: Create/update cover slide
  - `title` (required): Slide title
  - `subtitle` (optional): Slide subtitle
  - `author` (optional): Author name
  - `background` (optional): Background image URL

- `add_page`: Add new slide
  - `content` (required): Markdown content
  - `layout` (optional): Layout type

- `set_page`: Update specific slide
  - `index` (required): Slide index
  - `content` (required): New content
  - `layout` (optional): Layout type

- `get_page`: Retrieve slide content
  - `index` (required): Slide index

- `get_all_slides`: List all slides

### Advanced Features
- `create_bulk_slides`: Generate complete presentation
  - `topic` (required): Presentation topic
  - `slideCount` (optional): Number of slides (default: 10)
  - `style` (optional): minimal, detailed, visual, or academic
  - `includeAnimations` (optional): Add animations
  - `includeCode` (optional): Include code examples
  - `includeImages` (optional): Add images
  - `theme` (optional): Theme name
  - `customInstructions` (optional): Additional instructions

- `apply_theme`: Apply presentation theme
  - `themeName` (required): Theme name or "custom"
  - `customTheme` (optional): Custom theme config

- `add_animation`: Add animations to slides
  - `slideIndex` (required): Target slide
  - `animationType` (required): Animation type
  - `target` (optional): Target element
  - `options` (optional): Animation options

- `add_component`: Insert components
  - `slideIndex` (required): Target slide
  - `componentType` (required): Component type
  - `props` (optional): Component properties
  - `children` (optional): Component content

- `review_slides`: Get AI-powered review

### Utilities
- `get_slidev_usage`: Get Slidev documentation
- `check_environment`: Verify system setup
- `start_slidev`: Get server start command
- `websearch`: Extract content from URLs
  - `url` (required): URL to fetch