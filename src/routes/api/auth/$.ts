import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const convexSiteUrl = process.env.VITE_PUBLIC_CONVEX_SITE_URL
        const url = new URL(request.url)
        const convexUrl = `${convexSiteUrl}${url.pathname}${url.search}`

        return fetch(convexUrl, {
          method: 'GET',
          headers: request.headers,
        })
      },
      POST: async ({ request }) => {
        const convexSiteUrl = process.env.VITE_PUBLIC_CONVEX_SITE_URL
        const url = new URL(request.url)
        const convexUrl = `${convexSiteUrl}${url.pathname}${url.search}`

        return fetch(convexUrl, {
          method: 'POST',
          headers: request.headers,
          body: await request.text(),
        })
      },
    },
  },
})
