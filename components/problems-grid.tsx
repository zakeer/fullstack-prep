"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { codingProblems } from "@/lib/coding-problems"
import { CheckCircle, Clock, ExternalLink, Play } from "lucide-react"
import Link from "next/link"

export function ProblemsGrid() {
  // Mock solved problems - in real app this would come from user progress
  const solvedProblemIds = ["two-sum", "valid-palindrome", "valid-parentheses", "binary-search", "maximum-subarray"]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {codingProblems.map((problem) => {
        const isSolved = solvedProblemIds.includes(problem.id)

        return (
          <Card
            key={problem.id}
            className={`hover:shadow-md transition-shadow ${isSolved ? "bg-green-50 border-green-200" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    {isSolved && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    {problem.category.map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Week {problem.weekRelevance.join(", ")}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-pretty">{problem.description}</p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Time: {problem.timeComplexity}</span>
                <span>•</span>
                <span>Space: {problem.spaceComplexity}</span>
              </div>

              <div className="flex gap-2">
                <Link href={`/problems/${problem.id}`} className="flex-1">
                  <Button size="sm" className="w-full" variant={isSolved ? "outline" : "default"}>
                    <Play className="h-4 w-4 mr-2" />
                    {isSolved ? "Review" : "Solve"}
                  </Button>
                </Link>
                {problem.leetcodeUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      LeetCode
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
