import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/demo/start/api-request')({
  component: Home,
})

function Home() {
  const { data: names } = useSuspenseQuery(convexQuery(api.names.get, {}))

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-6 -mt-3">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Convex Query Demo
          </h1>
          <p className="text-muted-foreground">
            Fetch and display data from Convex with real-time updates
          </p>
        </div>

        <div className="space-y-4">
          <ul className="space-y-2">
            {names.map((item) => (
              <li
                key={item._id}
                className="border rounded-lg p-4 bg-card text-card-foreground"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
