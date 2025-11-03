import { createFileRoute, json  } from '@tanstack/react-router'

// Proxy auth requests to Convex http.ts which handles Better Auth via authComponent.registerRoutes
export const Route = createFileRoute('/api/auth/$')({
  loader: async ({ request }) => {
    const convexSiteUrl = import.meta.env.VITE_PUBLIC_CONVEX_SITE_URL
    const url = new URL(request.url)
    const convexUrl = `${convexSiteUrl}${url.pathname}${url.search}`

    const response = await fetch(convexUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' ? await request.text() : undefined,
    })

    const data = await response.json()
    return json(data, {
      status: response.status,
      headers: response.headers,
    })
  },
})
