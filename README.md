# Tanvex

> Modern TanStack Start template with Bun runtime, intelligent production server, and shadcn/ui components.

A clean, production-ready starter template for building full-stack React applications with TanStack Start and Bun.

## Features

- TanStack Start with file-based routing
- React 19 with full TypeScript support
- Bun runtime for development and production
- Tailwind CSS v4 with shadcn/ui components
- Custom production server with intelligent asset loading
- Dark mode with theme persistence
- Path aliases configured (@/ imports)

## Quick Start

Clone and install:

```bash
git clone https://github.com/RMNCLDYO/tanvex.git
cd tanvex
bun install
```

Run development server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Run production server:

```bash
bun run start
```

## Production Server

The custom `server.ts` implements an optimized production server for TanStack Start:

**Intelligent Asset Loading**

Small files are preloaded into memory at startup. Large files are served on-demand from disk. Configurable via environment variables.

Environment variables:

```bash
PORT=3000
ASSET_PRELOAD_MAX_SIZE=5242880
ASSET_PRELOAD_INCLUDE_PATTERNS="*.js,*.css,*.woff2"
ASSET_PRELOAD_EXCLUDE_PATTERNS="*.map,*.txt"
ASSET_PRELOAD_VERBOSE_LOGGING=true
```

## Project Structure

```
tanvex/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Utilities
│   ├── routes/          # File-based routes
│   ├── router.tsx       # Router configuration
│   └── styles.css       # Global styles
├── server.ts            # Production server
└── vite.config.ts       # Vite configuration
```

## Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Run production server
bun run test     # Run tests
bun run lint     # Lint code
bun run format   # Format code
bun run check    # Check formatting and linting
```

## License

MIT
