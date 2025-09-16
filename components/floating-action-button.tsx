"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowUp } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useEffect, useState } from "react"
import Link from "next/link"

export function FloatingActionButton() {
  const { progress } = useProgress()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getCurrentStudyLink = () => {
    if (!progress) return "/week/1/day/1"
    const currentWeek =
      progress.weeks.find((w) => w.completionPercentage > 0 && w.completionPercentage < 100) || progress.weeks[0]
    const currentDay = currentWeek.days.find((d) => !d.completedAt) || currentWeek.days[0]
    return `/week/${currentWeek.weekNumber}/day/${currentDay.dayNumber}`
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background border hover:bg-accent"
          variant="outline"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}

      <Link href={getCurrentStudyLink()}>
        <Button
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6"
        >
          <Play className="h-4 w-4 mr-2" />
          Continue Study
        </Button>
      </Link>
    </div>
  )
}
