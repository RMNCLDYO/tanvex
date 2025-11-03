export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="flex h-16 items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">
          © {currentYear} TanStack Start. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
