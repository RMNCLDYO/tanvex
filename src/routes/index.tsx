import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}))

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 min-h-full -my-6">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Tasks</h1>
      <div className="w-full max-w-md space-y-2">
        {data.map(({ _id, text }) => (
          <div
            key={_id}
            className="p-4 border rounded-lg bg-card text-card-foreground"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
