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
  </div>
</div>

## ✨ Introduction

slidev-mcp is an intelligent slide generation tool based on [Slidev](https://github.com/slidevjs/slidev) that integrates large language model technology, allowing users to automatically generate professional online PPT presentations with simple descriptions.

This is a TypeScript port of the original Python implementation, designed for easy installation and deployment as an npm package.

<img src="https://api.iconify.design/mdi:robot-happy-outline.svg" width="20" height="20" alt="AI"/> **Key Features**:
- Dramatically lowers the barrier to using Slidev
- Natural language interactive slide creation
- Automated generation of professional presentations
- Easy npm installation and deployment
- Full TypeScript support with proper types
- MCP (Model Context Protocol) integration

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

## 📚 Available Tools

The MCP server provides the following tools:

- **websearch**: Search and extract content from web URLs
- **get_slidev_usage**: Get Slidev layout documentation and examples
- **check_environment**: Verify Node.js and Slidev CLI installation
- **create_slidev**: Create a new Slidev project
- **load_slidev**: Load existing Slidev project
- **make_cover**: Create or update presentation cover page
- **add_page**: Add new slide to presentation
- **set_page**: Update specific slide content
- **get_page**: Retrieve slide content by index
- **start_slidev**: Get command to start Slidev server

## 🎯 Usage Example

```javascript
// Example interaction with Claude
"Create a presentation about TypeScript best practices"

// The AI will:
// 1. Create a new Slidev project
// 2. Generate slides based on your requirements
// 3. Use appropriate layouts and formatting
// 4. Provide commands to start the presentation server
```

## 🔧 Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Start the MCP server
- `npm run prepare` - Build before publishing

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