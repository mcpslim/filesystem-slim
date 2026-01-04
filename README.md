# filesystem-slim

> 🚀 Filesystem MCP with **90.0% token reduction** for AI models

[![npm version](https://img.shields.io/npm/v/filesystem-slim.svg)](https://www.npmjs.com/package/filesystem-slim)
[![Test Status](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/palan-k/mcpslim)

## Performance

| Metric | Original | Slim | Improvement |
|--------|----------|------|-------------|
| Tools | 14 | 6 | **-54%** |
| Tokens | 2,583 | 259 | **90.0%** |

> **Version Info**
> - Original: `@modelcontextprotocol/server-filesystem@2025.12.18`
> - Slim version synced with original
> - Tokens measured with [tiktoken](https://github.com/openai/tiktoken) v1.0.21 (cl100k_base)

## Installation

```bash
npx filesystem-slim
```

## Usage

### Claude Desktop

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "filesystem-slim"]
    }
  }
}
```

### Claude Code CLI

```bash
claude mcp add filesystem -- npx -y filesystem-slim
```

### Gemini CLI

```bash
gemini mcp add filesystem -- npx -y filesystem-slim
```

### VS Code (Copilot, Cline, etc.)

```bash
code --add-mcp '{"name":"filesystem","command":"npx","args":["-y","filesystem-slim"]}'
```

### Cursor

Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "filesystem-slim"]
    }
  }
}
```

## How It Works

MCPSlim acts as a **transparent bridge** between AI models and the original MCP server.

```
┌─────────────────────────────────────────────────────────────────┐
│  Without MCPSlim                                                │
│                                                                 │
│  [AI Model] ──── reads 14 tool schemas ────→ [Original MCP]    │
│             (2,583 tokens loaded into context)                    │
├─────────────────────────────────────────────────────────────────┤
│  With MCPSlim                                                   │
│                                                                 │
│  [AI Model] ───→ [MCPSlim Bridge] ───→ [Original MCP]           │
│       │                │                      │                 │
│   Sees 6 grouped      Translates to        Executes actual   │
│   tools only         original call       tool & returns    │
│   (259 tokens)                                               │
└─────────────────────────────────────────────────────────────────┘
```

### Translation Flow

1. **AI reads slim schema** - Only 6 grouped tools instead of 14 (saves tokens)
2. **AI calls grouped tool** - e.g., `page({ action: "navigate", url: "..." })`
3. **MCPSlim translates** - Converts to: `navigate_page({ url: "..." })`
4. **Original MCP executes** - Real server processes the request
5. **Response returned** - Result passes back unchanged

**Zero functionality loss. 90.0% token savings.**

### Tool Groups

- `create`: 2 actions
- `delete`: 2 actions
- `file`: 3 actions
- `move`: 2 actions
- `query`: 2 actions
- `read`: 2 actions


## Compatibility

- ✅ All original `@modelcontextprotocol/server-filesystem` functionality preserved
- ✅ Works with Claude, Gemini, ChatGPT, Qwen, and any MCP-compatible AI
- ✅ Same API - just use grouped action names
- ✅ Schema compatibility verified via automated tests

## License

MIT

---

Powered by [MCPSlim](https://github.com/palan-k/mcpslim) - MCP Token Compression Bridge
