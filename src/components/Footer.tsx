import { Skeleton } from './ui/skeleton'
import { useSession } from '@/lib/auth-client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { isPending } = useSession()

  return (
    <footer className="border-t">
      <div className="flex h-16 items-center justify-center px-6">
        {isPending ? (
          <Skeleton className="h-5 w-64" />
        ) : (
          <p className="text-sm text-muted-foreground">
            © {currentYear} TanStack Start. All rights reserved.
          </p>
        )}
      </div>
    </footer>
  )
}
