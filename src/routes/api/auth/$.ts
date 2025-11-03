import { tanstackStartHandler } from '@convex-dev/better-auth/tanstack-start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const Route = createAPIFileRoute('/api/auth/$')({
  GET: tanstackStartHandler(),
  POST: tanstackStartHandler(),
})
