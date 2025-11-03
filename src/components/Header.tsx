import { Link } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { signOut, useSession } from '@/lib/auth-client'

export default function Header() {
  const { data: session } = useSession()

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

        <div className="ml-auto flex items-center gap-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || ''}
                      alt={session.user.name || ''}
                    />
                    <AvatarFallback>
                      {session.user.name
                        ? session.user.name.charAt(0).toUpperCase()
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut()
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
