"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { codingProblems } from "@/lib/coding-problems"
import { Code, CheckCircle, Clock, Target } from "lucide-react"

export function ProblemsStats() {
  // Mock solved problems - in real app this would come from user progress
  const solvedProblems = 8
  const totalProblems = codingProblems.length
  const easyProblems = codingProblems.filter((p) => p.difficulty === "Easy").length
  const mediumProblems = codingProblems.filter((p) => p.difficulty === "Medium").length
  const hardProblems = codingProblems.filter((p) => p.difficulty === "Hard").length

  const solvedEasy = 5
  const solvedMedium = 3
  const solvedHard = 0

  const stats = [
    {
      title: "Total Solved",
      value: `${solvedProblems}/${totalProblems}`,
      progress: (solvedProblems / totalProblems) * 100,
      icon: CheckCircle,
      description: "Problems completed",
    },
    {
      title: "Easy",
      value: `${solvedEasy}/${easyProblems}`,
      progress: (solvedEasy / easyProblems) * 100,
      icon: Target,
      description: "Easy problems",
    },
    {
      title: "Medium",
      value: `${solvedMedium}/${mediumProblems}`,
      progress: (solvedMedium / mediumProblems) * 100,
      icon: Code,
      description: "Medium problems",
    },
    {
      title: "Hard",
      value: `${solvedHard}/${hardProblems}`,
      progress: (solvedHard / hardProblems) * 100,
      icon: Clock,
      description: "Hard problems",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <Progress value={stat.progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
