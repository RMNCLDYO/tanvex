import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/demo/start/server-funcs')({
  component: Home,
})

function Home() {
  const { data: todos } = useSuspenseQuery(convexQuery(api.todos.get, {}))
  const addTodo = useConvexMutation(api.todos.add)
  const removeTodo = useConvexMutation(api.todos.remove)

  const [todo, setTodo] = useState('')

  const submitTodo = useCallback(async () => {
    if (todo.trim()) {
      await addTodo({ name: todo })
      setTodo('')
    }
  }, [addTodo, todo])

  const handleRemove = useCallback(
    async (id: string) => {
      await removeTodo({ id: id as any })
    },
    [removeTodo],
  )

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-6 -mt-2">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Convex Mutations Demo
          </h1>
          <p className="text-muted-foreground">
            Add and manage todos using Convex mutations with real-time updates
          </p>
        </div>

        <div className="space-y-4">
          <ul className="space-y-2">
            {todos.map((t) => (
              <li
                key={t._id}
                className="border rounded-lg p-4 bg-card text-card-foreground flex items-center justify-between gap-4"
              >
                <span>{t.name}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleRemove(t._id)}
                  className="shrink-0"
                  aria-label="Delete todo"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <Input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submitTodo()
                }
              }}
              placeholder="Enter a new todo..."
              className="flex-1 h-14"
            />
            <Button
              disabled={todo.trim().length === 0}
              onClick={submitTodo}
              className="h-14 px-8"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
