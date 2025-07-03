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

#### Recommended: Using npm/npx

In Claude Desktop, go to Settings > Developer > Edit Config (JSON) and add:

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

This method ensures you always use the latest version without manual updates.

#### Alternative: Direct npx execution

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["slidev-mcp"]
    }
  }
}
```

#### Using with other MCP Clients

**Cline:**
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

**Zed:**
```json
{
  "language_models": {
    "anthropic": {
      "api_key": "your_key",
      "mcp_servers": {
        "slidev-mcp": {
          "command": "npx",
          "args": ["-y", "slidev-mcp"]
        }
      }
    }
  }
}
```

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