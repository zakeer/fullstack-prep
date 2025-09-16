import { Header } from "@/components/header"
import { ProblemsGrid } from "@/components/problems-grid"
import { ProblemsFilters } from "@/components/problems-filters"
import { ProblemsStats } from "@/components/problems-stats"

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Coding Problems</h1>
          <p className="text-lg text-muted-foreground">Practice coding problems aligned with your 6-week study plan</p>
        </div>

        <ProblemsStats />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <ProblemsFilters />
          </div>
          <div className="lg:w-3/4">
            <ProblemsGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
