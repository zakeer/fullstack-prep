import { Header } from "@/components/header"
import { ProblemViewer } from "@/components/problem-viewer"
import { codingProblems } from "@/lib/coding-problems"
import { notFound } from "next/navigation"

interface ProblemPageProps {
  params: {
    problemId: string
  }
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const problem = codingProblems.find((p) => p.id === params.problemId)

  if (!problem) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProblemViewer problem={problem} />
      </main>
    </div>
  )
}
