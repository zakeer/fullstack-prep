"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Target, Trophy, Menu, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/materials", label: "Materials" },
    { href: "/problems", label: "Problems" },
    { href: "/progress", label: "Progress" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Interview Prep Pro</h1>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              6-Week Program
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Interview Prep Pro</span>
                  </div>
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>42 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>6 Weeks</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
