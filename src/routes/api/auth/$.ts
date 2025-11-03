import { createFileRoute } from '@tanstack/react-router'

// Proxy auth requests to Convex http.ts which handles Better Auth via authComponent.registerRoutes
async function proxyToConvex(request: Request) {
  const convexSiteUrl = import.meta.env.VITE_PUBLIC_CONVEX_SITE_URL
  const url = new URL(request.url)
  const convexUrl = `${convexSiteUrl}${url.pathname}${url.search}`

  return fetch(convexUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' ? await request.text() : undefined,
  })
}

export const Route = createFileRoute('/api/auth/$')({
  beforeLoad: async ({ request }) => {
    return proxyToConvex(request)
  },
})
