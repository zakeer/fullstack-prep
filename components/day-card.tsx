import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Code, Users, BookOpen, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import type { DayPlan } from "@/lib/study-plan"

interface DayCardProps {
  day: DayPlan
  weekNumber: number
}

export function DayCard({ day, weekNumber }: DayCardProps) {
  // Mock completion status - in real app this would come from user progress
  const isCompleted = weekNumber === 1 && day.day <= 3
  const isInProgress = weekNumber === 1 && day.day === 4
  const progress = isCompleted ? 100 : isInProgress ? 45 : 0

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
    <Card className={`relative ${isInProgress ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>Day {day.day}</span>
            {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
            {isInProgress && <Play className="h-4 w-4 text-primary" />}
          </CardTitle>
          <Badge className={getDifficultyColor(day.difficulty)}>{day.difficulty}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Morning (2-3h)</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6 text-pretty">{day.morning}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Code className="h-4 w-4 text-primary" />
              <span>Afternoon (2-3h)</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6 text-pretty">{day.afternoon}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-primary" />
              <span>Evening (1-2h)</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6 text-pretty">{day.evening}</p>
          </div>
        </div>

        <div className="border-t pt-3 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Coding Problem:</span>
            <span className="text-muted-foreground">{day.codingProblem}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Link href={`/week/${weekNumber}/day/${day.day}`}>
            <Button className="w-full" variant={isCompleted ? "outline" : "default"}>
              {isCompleted ? "Review Day" : isInProgress ? "Continue" : "Start Day"}
            </Button>
          </Link>
        </div>
      </CardContent>

      {isInProgress && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-primary" />
      )}
    </Card>
  )
}
