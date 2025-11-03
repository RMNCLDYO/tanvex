import { useEffect, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

function getNames() {
  return fetch('/api/demo-names').then((res) => res.json())
}

export const Route = createFileRoute('/demo/start/api-request')({
  component: Home,
})

function Home() {
  const [names, setNames] = useState<Array<string>>([])

  useEffect(() => {
    getNames().then(setNames)
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-6 -mt-3">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            API Request Demo
          </h1>
          <p className="text-muted-foreground">
            Fetch and display data from an API endpoint
          </p>
        </div>

        <div className="space-y-4">
          <ul className="space-y-2">
            {names.map((name) => (
              <li
                key={name}
                className="border rounded-lg p-4 bg-card text-card-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
