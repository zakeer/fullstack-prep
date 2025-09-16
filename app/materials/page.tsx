import { Header } from "@/components/header"
import { StudyMaterialsGrid } from "@/components/study-materials-grid"
import { MaterialsSearch } from "@/components/materials-search"
import { MaterialsFilters } from "@/components/materials-filters"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Suspense } from "react"
import { DashboardSkeleton } from "@/components/loading-skeleton"

export default function MaterialsPage() {
  const breadcrumbItems = [{ label: "Study Plan", href: "/" }, { label: "Materials Library" }]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4">
          <h1 className="text-3xl font-bold text-balance">Study Materials Library</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
            Comprehensive resources, notes, and references for your interview preparation journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <MaterialsFilters />
            </div>
          </div>
          <div className="lg:w-3/4 space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <MaterialsSearch />
              <StudyMaterialsGrid />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
