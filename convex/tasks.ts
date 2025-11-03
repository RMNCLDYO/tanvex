import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

/**
 * Tasks table - Interactive CRUD operations
 * Used in the server functions demo for adding/removing tasks
 */

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect()
  },
})

export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('tasks', {
      text: args.text,
    })
  },
})

export const remove = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
