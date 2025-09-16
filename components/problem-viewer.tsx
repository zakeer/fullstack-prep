"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Lightbulb, CheckCircle, Clock, Play } from "lucide-react"
import Link from "next/link"
import type { CodingProblem } from "@/lib/coding-problems"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react"

interface ProblemViewerProps {
  problem: CodingProblem
}

export function ProblemViewer({ problem }: ProblemViewerProps) {
  const [showSolution, setShowSolution] = useState(false)
  const [showHints, setShowHints] = useState(false)

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/problems">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl">{problem.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Solved
                    </Button>
                    {problem.leetcodeUrl && (
                      <Button asChild size="sm">
                        <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          LeetCode
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                  {problem.category.map((cat) => (
                    <Badge key={cat} variant="outline">
                      {cat}
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Week {problem.weekRelevance.join(", ")}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Problem Description</h3>
                <p className="text-pretty">{problem.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-muted p-4 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Input: </span>
                          <code className="text-sm">{example.input}</code>
                        </div>
                        <div>
                          <span className="font-medium">Output: </span>
                          <code className="text-sm">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-medium">Explanation: </span>
                            <span className="text-sm">{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Constraints</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>

              {problem.followUp && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Follow-up</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {problem.followUp.map((followUp, index) => (
                        <li key={index}>{followUp}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="hints" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hints">Hints & Approach</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
            </TabsList>

            <TabsContent value="hints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Hints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showHints ? (
                    <Button onClick={() => setShowHints(true)} variant="outline">
                      Show Hints
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      {problem.hints.map((hint, index) => (
                        <div key={index} className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-sm">
                            <span className="font-medium">Hint {index + 1}: </span>
                            {hint}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solution" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  {!showSolution ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Try solving the problem first before viewing the solution!
                      </p>
                      <Button onClick={() => setShowSolution(true)}>Show Solution</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Approach: {problem.solution.approach}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{problem.solution.explanation}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Code:</h4>
                        <SyntaxHighlighter language="python" style={tomorrow} className="rounded-lg">
                          {problem.solution.code}
                        </SyntaxHighlighter>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Time Complexity: {problem.timeComplexity}</span>
                        <span>Space Complexity: {problem.spaceComplexity}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Problem Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Difficulty</span>
                <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Time Complexity</span>
                <code className="text-sm">{problem.timeComplexity}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Space Complexity</span>
                <code className="text-sm">{problem.spaceComplexity}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Relevant Weeks</span>
                <span className="text-sm">{problem.weekRelevance.join(", ")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Practice Timer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold">00:00</div>
                <p className="text-sm text-muted-foreground">Time spent</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
