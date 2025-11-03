import { Link } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-foreground/80">
            Home
          </Link>
          <Link
            to="/demo/start/server-funcs"
            className="text-muted-foreground hover:text-foreground"
          >
            Server Functions
          </Link>
          <Link
            to="/demo/start/api-request"
            className="text-muted-foreground hover:text-foreground"
          >
            API Request
          </Link>
        </nav>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
