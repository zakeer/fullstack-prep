import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock, Code } from "lucide-react"
import Link from "next/link"
import type { WeekPlan, DayPlan } from "@/lib/study-plan"

interface DayHeaderProps {
  week: WeekPlan
  day: DayPlan
}

export function DayHeader({ week, day }: DayHeaderProps) {
  // Mock progress - in real app this would come from user data
  const progress = week.week === 1 && day.day <= 3 ? 100 : week.week === 1 && day.day === 4 ? 45 : 0

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
        <Link href={`/week/${week.week}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Week {week.week}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary">Week {week.week}</Badge>
          <Badge variant="outline">Day {day.day}</Badge>
          <Badge className={getDifficultyColor(day.difficulty)}>{day.difficulty}</Badge>
          <h1 className="text-3xl font-bold">Day {day.day} Study Plan</h1>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{week.theme}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>5-8 hours total</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>{day.codingProblem}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Day Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>
    </div>
  )
}
