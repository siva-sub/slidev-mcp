#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('Testing Slidev MCP Server...\n');

// Spawn the MCP server
const mcp = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Test messages in MCP protocol format
const testMessages = [
  // Initialize
  {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '0.1.0',
      capabilities: {
        roots: {
          listChanged: true
        },
        sampling: {}
      },
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  },
  // List tools
  {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {}
  },
  // List prompts
  {
    jsonrpc: '2.0',
    id: 3,
    method: 'prompts/list',
    params: {}
  }
];

let responseBuffer = '';

mcp.stdout.on('data', (data) => {
  responseBuffer += data.toString();
  
  // Try to parse complete JSON-RPC messages
  const lines = responseBuffer.split('\n');
  responseBuffer = lines.pop() || '';
  
  lines.forEach(line => {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log('Response:', JSON.stringify(response, null, 2));
        console.log('---');
      } catch (e) {
        // Not a complete JSON message yet
      }
    }
  });
});

mcp.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

mcp.on('close', (code) => {
  console.log(`MCP server exited with code ${code}`);
});

// Send test messages
testMessages.forEach((msg, index) => {
  setTimeout(() => {
    console.log(`Sending: ${msg.method}`);
    mcp.stdin.write(JSON.stringify(msg) + '\n');
  }, index * 500);
});

// Close after tests
setTimeout(() => {
  console.log('\nTests completed. Closing server...');
  mcp.stdin.end();
}, 3000);