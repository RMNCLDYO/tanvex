import fs from 'node:fs'
import { useCallback, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const filePath = 'todos.json'

type Todo = {
  id: number
  name: string
}

async function readTodos(): Promise<Array<Todo>> {
  return JSON.parse(
    await fs.promises.readFile(filePath, 'utf-8').catch(() =>
      JSON.stringify(
        [
          { id: 1, name: 'Get groceries' },
          { id: 2, name: 'Buy a new phone' },
        ],
        null,
        2,
      ),
    ),
  )
}

const getTodos = createServerFn({
  method: 'GET',
}).handler(async () => await readTodos())

const addTodo = createServerFn({ method: 'POST' })
  .inputValidator((d: string) => d)
  .handler(async ({ data }): Promise<Array<Todo>> => {
    const todos = await readTodos()
    todos.push({ id: todos.length + 1, name: data })
    await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2))
    return todos
  })

const deleteTodo = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data }): Promise<Array<Todo>> => {
    const todos = await readTodos()
    const filteredTodos = todos.filter((todo) => todo.id !== data)
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(filteredTodos, null, 2),
    )
    return filteredTodos
  })

export const Route = createFileRoute('/demo/start/server-funcs')({
  component: Home,
  loader: async () => await getTodos(),
})

function Home() {
  const router = useRouter()
  let todos = Route.useLoaderData()

  const [todo, setTodo] = useState('')

  const submitTodo = useCallback(async () => {
    todos = await addTodo({ data: todo })
    setTodo('')
    router.invalidate()
  }, [addTodo, todo])

  const removeTodo = useCallback(
    async (id: number) => {
      await deleteTodo({ data: id })
      router.invalidate()
    },
    [deleteTodo],
  )

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-6 -mt-2">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Server Functions Demo
          </h1>
          <p className="text-muted-foreground">
            Add and manage todos using TanStack Start server functions
          </p>
        </div>

        <div className="space-y-4">
          <ul className="space-y-2">
            {todos.map((t) => (
              <li
                key={t.id}
                className="border rounded-lg p-4 bg-card text-card-foreground flex items-center justify-between gap-4"
              >
                <span>{t.name}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeTodo(t.id)}
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
