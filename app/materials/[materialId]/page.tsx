import { Header } from "@/components/header"
import { MaterialViewer } from "@/components/material-viewer"
import { studyMaterials } from "@/lib/study-materials"
import { notFound } from "next/navigation"

interface MaterialPageProps {
  params: {
    materialId: string
  }
}

export default function MaterialPage({ params }: MaterialPageProps) {
  const material = studyMaterials.find((m) => m.id === params.materialId)

  if (!material) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MaterialViewer material={material} />
      </main>
    </div>
  )
}
