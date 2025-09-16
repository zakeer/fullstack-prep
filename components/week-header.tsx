import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock, Target } from "lucide-react"
import Link from "next/link"
import type { WeekPlan } from "@/lib/study-plan"

interface WeekHeaderProps {
  week: WeekPlan
}

export function WeekHeader({ week }: WeekHeaderProps) {
  // Mock progress - in real app this would come from user data
  const progress = week.week === 1 ? 60 : week.week === 2 ? 30 : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Week {week.week}</Badge>
          <h1 className="text-3xl font-bold text-balance">{week.theme}</h1>
        </div>

        <p className="text-lg text-muted-foreground text-pretty max-w-3xl">{week.description}</p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{week.days.length} days</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>~15-20 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>{progress}% complete</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Week Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>
    </div>
  )
}
