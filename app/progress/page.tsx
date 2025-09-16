"use client"

import { Header } from "@/components/header"
import { ProgressAnalytics } from "@/components/progress-analytics"
import { ProgressCalendar } from "@/components/progress-calendar"

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Progress Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Track your interview preparation journey with detailed insights
          </p>
        </div>

        <ProgressAnalytics />
        <ProgressCalendar />
      </main>
    </div>
  )
}
