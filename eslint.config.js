//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    files: ['*.js'],
    rules: {
      // Disable TypeScript-specific rules for JavaScript config files
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js', 'convex/_generated/**'],
  },
]
