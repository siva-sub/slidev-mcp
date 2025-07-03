<div align="center">
  <h1>
    <img src="https://api.iconify.design/logos:slidev.svg" width="40" height="40" alt="Slidev"/>
    slidev-mcp 
    <img src="https://api.iconify.design/logos:openai-icon.svg" width="40" height="40" alt="AI"/>
  </h1>
  <p>AI-powered Professional Slide Creation Made Easy!</p>
  
  <div>
    <img src="https://img.shields.io/badge/Slidev-@latest-blue?logo=slidev" alt="Slidev"/>
    <img src="https://img.shields.io/badge/AI-Large%20Language%20Model-orange?logo=openai" alt="AI"/>
    <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js"/>
    <img src="https://img.shields.io/npm/v/slidev-mcp?color=red&logo=npm" alt="npm version"/>
  </div>
</div>

## ✨ Introduction

slidev-mcp is an intelligent slide generation tool based on [Slidev](https://github.com/slidevjs/slidev) that integrates large language model technology, allowing users to automatically generate professional online PPT presentations with simple descriptions.

This is a TypeScript port of the original Python implementation, designed for easy installation and deployment as an npm package.

<img src="https://api.iconify.design/mdi:robot-happy-outline.svg" width="20" height="20" alt="AI"/> **Key Features**:
- 🚀 **Bulk Slide Creation** - Generate complete presentations with one command
- 🎨 **Theme Customization** - Apply predefined or custom themes
- ✨ **Animation Support** - Add v-click, v-motion, and other animations
- 🧩 **Dynamic Components** - Insert Tweet, Youtube, Video, and more
- 📊 **Multiple Layouts** - Use image-left, two-cols, iframe, and other layouts
- 🔍 **Slide Review** - Get AI-powered suggestions for improvement
- 🎯 **Style Options** - Choose from minimal, detailed, visual, or academic styles
- 🌐 **Web Search** - Extract content from URLs for presentation material

## 🚀 Quick Start

### Installation

#### Option 1: NPM Package (Recommended)
```bash
npm install -g slidev-mcp
```

#### Option 2: Direct from GitHub
```bash
npx slidev-mcp
```

### Configuration

Add to your Claude Desktop or MCP client configuration:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "npx",
      "args": ["slidev-mcp"],
      "description": "AI-powered Slidev presentation generator"
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "slidev-mcp": {
      "command": "slidev-mcp",
      "description": "AI-powered Slidev presentation generator"
    }
  }
}
```

## 📚 Available Tools

### Core Tools
- **create_slidev** - Create a new Slidev project
- **load_slidev** - Load existing Slidev project
- **make_cover** - Create or update presentation cover page
- **add_page** - Add new slide to presentation
- **set_page** - Update specific slide content
- **get_page** - Retrieve slide content by index
- **get_all_slides** - Get all slides with metadata
- **start_slidev** - Get command to start Slidev server

### Advanced Tools (v0.2.0+)
- **create_bulk_slides** - Generate complete presentation with multiple slides
- **apply_theme** - Apply predefined or custom themes
- **add_animation** - Add animations to slides (v-click, v-motion, etc.)
- **add_component** - Insert interactive components (Tweet, Youtube, etc.)
- **review_slides** - Get AI-powered slide review and suggestions

### Utility Tools
- **websearch** - Extract content from web URLs
- **get_slidev_usage** - Get comprehensive Slidev documentation
- **check_environment** - Verify Node.js and Slidev CLI installation

## 🎯 Usage Examples

### Basic Presentation
```javascript
// Create a simple presentation
"Create a presentation about TypeScript"

// The AI will:
// 1. Create a new Slidev project
// 2. Generate cover slide
// 3. Add content slides
// 4. Provide commands to start the server
```

### Bulk Slide Generation
```javascript
// Generate complete presentation
"Create a 15-slide presentation about Machine Learning with visual style and animations"

// Options:
// - slideCount: 15
// - style: 'visual' (minimal, detailed, visual, academic)
// - includeAnimations: true
// - includeImages: true
// - theme: 'corporate'
```

### Theme Customization
```javascript
// Apply predefined theme
"Apply the dark theme to my presentation"

// Or create custom theme
"Create a custom theme with blue primary color and modern fonts"
```

### Adding Components
```javascript
// Add interactive elements
"Add a YouTube video to slide 3"
"Insert a tweet on slide 5"
"Add a mermaid diagram showing the workflow"
```

## 🎨 Themes

### Predefined Themes
- **corporate** - Professional blue theme for business presentations
- **creative** - Colorful gradient theme for creative content
- **minimal** - Clean, minimalist design
- **dark** - Dark mode theme for technical presentations

### Custom Themes
Create your own theme with:
- Primary/secondary colors
- Background colors
- Font families
- Custom CSS
- Transition styles

## 🔧 Advanced Features

### Animation Types
- **v-click** - Reveal elements on click
- **v-after** - Show after previous element
- **v-motion** - Smooth motion animations
- **v-mark** - Highlight text with markers
- **transitions** - Slide transitions (fade, slide-left, etc.)

### Layout Options
- **default** - Standard layout
- **center** - Centered content
- **cover** - Cover slide layout
- **image-left/right** - Image with text layouts
- **two-cols** - Two column layout
- **iframe** - Embed websites
- **quote** - Quote layout

### Components
- **Tweet** - Embed tweets
- **Youtube** - Embed YouTube videos
- **SlidevVideo** - Local video player
- **Toc** - Table of contents
- **Arrow** - Draw arrows
- **Transform** - Scale/transform elements
- **Mermaid** - Diagrams and flowcharts

## 🛠️ Development

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/siva-sub/slidev-mcp.git
   cd slidev-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Testing with Claude Desktop

1. Configure Claude Desktop with the local development path:
   ```json
   {
     "mcpServers": {
       "slidev-mcp": {
         "command": "node",
         "args": ["/path/to/slidev-mcp/dist/index.js"],
         "description": "Local development Slidev MCP"
       }
     }
   }
   ```

2. Restart Claude Desktop and test the integration

## 📄 License

MIT License © 2024 [Siva Sub](https://github.com/siva-sub)

## 🙏 Acknowledgments

- Original Python implementation by [LSTM-Kirigaya](https://github.com/LSTM-Kirigaya)
- Built on [Slidev](https://github.com/slidevjs/slidev) by Anthony Fu
- Uses [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) by Anthropic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

### v0.2.0 (Latest)
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