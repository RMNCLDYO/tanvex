import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center min-h-full -my-6">
      <img
        src={logo}
        className="h-40 w-40 pointer-events-none animate-[spin_20s_linear_infinite] mb-8"
        alt="logo"
      />

      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Welcome to TanStack Start
      </h1>

      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Edit{' '}
        <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
          src/routes/index.tsx
        </code>{' '}
        and save to reload.
      </p>

      <div className="flex gap-4">
        <Button variant="default" asChild>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn TanStack
          </a>
        </Button>
      </div>
    </div>
  )
}
