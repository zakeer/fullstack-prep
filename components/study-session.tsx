"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Code, Users, ExternalLink, CheckCircle, Clock, Target, Play, Pause } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { useState, useEffect } from "react"
import type { WeekPlan, DayPlan } from "@/lib/study-plan"

interface StudySessionProps {
  week: WeekPlan
  day: DayPlan
}

export function StudySession({ week, day }: StudySessionProps) {
  const { progress, completeSession, completeCodingProblem, getDayProgress, getSessionProgress } = useProgress()
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [sessionTimes, setSessionTimes] = useState<Record<string, number>>({})

  const dayProgress = getDayProgress(week.week, day.day)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeTimer) {
      interval = setInterval(() => {
        setSessionTimes((prev) => ({
          ...prev,
          [activeTimer]: (prev[activeTimer] || 0) + 1,
        }))
      }, 60000) // Update every minute
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  const sessions = [
    {
      id: "morning",
      title: "Morning Session",
      duration: "2-3 hours",
      icon: BookOpen,
      content: day.morning,
      type: "theory",
    },
    {
      id: "afternoon",
      title: "Afternoon Session",
      duration: "2-3 hours",
      icon: Code,
      content: day.afternoon,
      type: "practical",
    },
    {
      id: "evening",
      title: "Evening Session",
      duration: "1-2 hours",
      icon: Users,
      content: day.evening,
      type: "behavioral",
    },
  ]

  const handleSessionComplete = (sessionId: string) => {
    const timeSpent = sessionTimes[sessionId] || 0
    completeSession(week.week, day.day, sessionId, timeSpent)
    setActiveTimer(null)
    setSessionTimes((prev) => ({ ...prev, [sessionId]: 0 }))
  }

  const handleCodingProblemComplete = () => {
    const timeSpent = sessionTimes["coding"] || 0
    completeCodingProblem(week.week, day.day, timeSpent)
    setActiveTimer(null)
    setSessionTimes((prev) => ({ ...prev, coding: 0 }))
  }

  const toggleTimer = (sessionId: string) => {
    if (activeTimer === sessionId) {
      setActiveTimer(null)
    } else {
      setActiveTimer(sessionId)
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const sessionProgress = getSessionProgress(week.week, day.day, session.id)
          const isCompleted = sessionProgress?.completed || false
          const isActive = activeTimer === session.id
          const currentTime = sessionTimes[session.id] || 0

          return (
            <Card
              key={session.id}
              className={isCompleted ? "bg-green-50 border-green-200" : isActive ? "ring-2 ring-primary" : ""}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <session.icon className="h-5 w-5 text-primary" />
                    {session.title}
                  </CardTitle>
                  {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{session.duration}</span>
                  <Badge variant="outline" className="text-xs">
                    {session.type}
                  </Badge>
                </div>
                {(isActive || currentTime > 0) && (
                  <div className="text-sm font-mono text-primary">Time: {formatTime(currentTime)}</div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-pretty">{session.content}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`session-${session.id}`}
                      checked={isCompleted}
                      onCheckedChange={() => !isCompleted && handleSessionComplete(session.id)}
                    />
                    <label htmlFor={`session-${session.id}`} className="text-sm font-medium">
                      Mark as complete
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleTimer(session.id)} disabled={isCompleted}>
                    {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    className="flex-1"
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    onClick={() => !isCompleted && handleSessionComplete(session.id)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Completed" : "Complete Session"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator />

      <Card
        className={
          dayProgress?.codingProblemCompleted
            ? "bg-green-50 border-green-200"
            : activeTimer === "coding"
              ? "ring-2 ring-primary"
              : ""
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Coding Problem Challenge
            {dayProgress?.codingProblemCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
          </CardTitle>
          {(activeTimer === "coding" || sessionTimes["coding"] > 0) && (
            <div className="text-sm font-mono text-primary">Time: {formatTime(sessionTimes["coding"] || 0)}</div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{day.codingProblem}</h3>
              <p className="text-sm text-muted-foreground">
                Difficulty:{" "}
                <Badge
                  className={
                    day.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : day.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {day.difficulty}
                </Badge>
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleTimer("coding")}
                disabled={dayProgress?.codingProblemCompleted}
              >
                {activeTimer === "coding" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                LeetCode
              </Button>
              <Button size="sm" onClick={handleCodingProblemComplete} disabled={dayProgress?.codingProblemCompleted}>
                {dayProgress?.codingProblemCompleted ? "Completed" : "Complete Problem"}
              </Button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Problem Solving Tips:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Read the problem carefully and understand the constraints</li>
              <li>• Think about edge cases before coding</li>
              <li>• Explain your approach out loud (practice for interviews)</li>
              <li>• Focus on time and space complexity</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
