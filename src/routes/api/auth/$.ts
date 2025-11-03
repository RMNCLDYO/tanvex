import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth/$')({
  loader: () => {
    // This loader is required but won't be used for API routes
    return null
  },
})

// Server-side handlers for Better Auth
if (typeof window === 'undefined') {
  Route.addServerHandler('GET', async ({ request }) => {
    const convexSiteUrl = process.env.VITE_PUBLIC_CONVEX_SITE_URL
    const url = new URL(request.url)
    const convexUrl = `${convexSiteUrl}${url.pathname}${url.search}`

    return fetch(convexUrl, {
      method: 'GET',
      headers: request.headers,
    })
  })

  Route.addServerHandler('POST', async ({ request }) => {
    const convexSiteUrl = process.env.VITE_PUBLIC_CONVEX_SITE_URL
    const url = new URL(request.url)
    const convexUrl = `${convexSiteUrl}${url.pathname}${url.search}`

    return fetch(convexUrl, {
      method: 'POST',
      headers: request.headers,
      body: await request.text(),
    })
  })
}
