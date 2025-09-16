import { Header } from "@/components/header"
import { WeekOverview } from "@/components/week-overview"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { QuickActions } from "@/components/quick-actions"
import { FloatingActionButton } from "@/components/floating-action-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4 animate-in fade-in-50 slide-in-from-bottom-4">
          <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Master Technical Interviews in 6 Weeks
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            A comprehensive study plan covering frontend, backend, system design, and behavioral interviews
          </p>
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: "200ms" }}>
          <ProgressDashboard />
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: "400ms" }}>
          <QuickActions />
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-4" style={{ animationDelay: "600ms" }}>
          <WeekOverview />
        </div>
      </main>

      <FloatingActionButton />
    </div>
  )
}
