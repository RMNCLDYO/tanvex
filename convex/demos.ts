import { query } from './_generated/server'

/**
 * Demos table - Read-only demo data
 * Shows example tasks in the API request demo
 */

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('demos').collect()
  },
})
