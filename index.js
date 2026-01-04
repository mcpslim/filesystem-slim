#!/usr/bin/env node
/**
 * filesystem-slim - Slimmed filesystem MCP for Claude
 * Reduces token usage by grouping similar tools
 */

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const binName = os.platform() === 'win32' ? 'mcpslim.exe' : 'mcpslim';
const mcpslimBin = path.join(__dirname, 'bin', binName);
const recipePath = path.join(__dirname, 'recipes', 'filesystem.json');

// 원본 MCP 명령어
const originalMcp = process.env.MCPSLIM_ORIGINAL_MCP?.split(' ')
  || ["npx","-y","@modelcontextprotocol/server-filesystem"];

const args = ['bridge', '--recipe', recipePath, '--', ...originalMcp];

const child = spawn(mcpslimBin, args, {
  stdio: 'inherit',
  windowsHide: true
});

child.on('error', (err) => {
  console.error('Failed to start MCPSlim:', err.message);
  process.exit(1);
});

child.on('exit', (code) => process.exit(code || 0));
