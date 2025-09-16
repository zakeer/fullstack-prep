import { Header } from "@/components/header"
import { WeekHeader } from "@/components/week-header"
import { DayCard } from "@/components/day-card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { WeekSkeleton } from "@/components/loading-skeleton"
import { studyPlan } from "@/lib/study-plan"
import { notFound } from "next/navigation"
import { Suspense } from "react"

interface WeekPageProps {
  params: {
    weekNumber: string
  }
}

export default function WeekPage({ params }: WeekPageProps) {
  const weekNumber = Number.parseInt(params.weekNumber)
  const week = studyPlan.find((w) => w.week === weekNumber)

  if (!week) {
    notFound()
  }

  const breadcrumbItems = [{ label: "Study Plan", href: "/" }, { label: `Week ${weekNumber}: ${week.title}` }]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <Suspense fallback={<WeekSkeleton />}>
          <WeekHeader week={week} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {week.days.map((day, index) => (
              <div
                key={day.day}
                className="animate-in fade-in-50 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DayCard day={day} weekNumber={weekNumber} />
              </div>
            ))}
          </div>
        </Suspense>
      </main>
    </div>
  )
}
