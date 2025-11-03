import { internalMutation } from './_generated/server'

/**
 * Migration: Clear all documents from the tasks table
 *
 * This is a one-time cleanup migration to remove the deprecated tasks table.
 * After running this, the tasks table can be safely ignored or dropped from the dashboard.
 *
 * Run with: bunx convex run clearTasksTable:clear --prod
 * or for dev: bunx convex run clearTasksTable:clear
 */
export const clear = internalMutation({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query('tasks').collect()

    console.log(`Deleting ${tasks.length} documents from tasks table...`)

    for (const task of tasks) {
      await ctx.db.delete(task._id)
    }

    console.log(`Successfully deleted ${tasks.length} documents from tasks table`)

    return {
      deleted: tasks.length,
      message: `Cleared ${tasks.length} documents from tasks table`,
    }
  },
})
