import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href="/">
        <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10">
          <Home className="h-4 w-4" />
        </Button>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href}>
              <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10">
                {item.label}
              </Button>
            </Link>
          ) : (
            <span className="px-2 py-1 font-medium text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
