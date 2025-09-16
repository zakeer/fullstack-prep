import { Header } from "@/components/header"
import { DayHeader } from "@/components/day-header"
import { StudySession } from "@/components/study-session"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { studyPlan } from "@/lib/study-plan"
import { notFound } from "next/navigation"

interface DayPageProps {
  params: {
    weekNumber: string
    dayNumber: string
  }
}

export default function DayPage({ params }: DayPageProps) {
  const weekNumber = Number.parseInt(params.weekNumber)
  const dayNumber = Number.parseInt(params.dayNumber)

  const week = studyPlan.find((w) => w.week === weekNumber)
  const day = week?.days.find((d) => d.day === dayNumber)

  if (!week || !day) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Study Plan", href: "/" },
    { label: `Week ${weekNumber}`, href: `/week/${weekNumber}` },
    { label: `Day ${dayNumber}: ${day?.day}` },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="animate-in fade-in-50 slide-in-from-bottom-4">
          <DayHeader week={week} day={day} />
          <StudySession week={week} day={day} />
        </div>
      </main>
    </div>
  )
}
