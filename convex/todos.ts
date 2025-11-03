import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('todos').collect()
  },
})

export const add = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('todos', { name: args.name })
  },
})

export const remove = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
