import { createFileRoute } from '@tanstack/react-router'
import { reactStartHandler } from '@convex-dev/better-auth/react-start'

// HTTP/2 forbidden headers that need to be stripped
const HTTP2_FORBIDDEN_HEADERS = [
  'connection',
  'keep-alive',
  'proxy-connection',
  'transfer-encoding',
  'upgrade',
]

async function handleAuthRequest(request: Request) {
  const response = await reactStartHandler(request)

  // Strip HTTP/1-specific headers for HTTP/2 compatibility
  const headers = new Headers(response.headers)
  HTTP2_FORBIDDEN_HEADERS.forEach((header) => headers.delete(header))

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: ({ request }) => handleAuthRequest(request),
      POST: ({ request }) => handleAuthRequest(request),
    },
  },
})
