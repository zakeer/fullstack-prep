import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { studyPlan } from "@/lib/study-plan"
import { Calendar, Clock, Code, Users, Database, Globe, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function WeekOverview() {
  const getWeekIcon = (week: number) => {
    const icons = [Calendar, Code, Database, Globe, Users, CheckCircle]
    const IconComponent = icons[week - 1] || Calendar
    return IconComponent
  }

  const getWeekProgress = (week: number) => {
    // Mock progress data - in real app this would come from user progress
    const progressData = [85, 60, 30, 10, 0, 0]
    return progressData[week - 1] || 0
  }

  const getWeekStatus = (week: number) => {
    const progress = getWeekProgress(week)
    if (progress === 100) return "completed"
    if (progress > 0) return "in-progress"
    return "upcoming"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">6-Week Study Plan</h2>
        <Button variant="outline" size="sm">
          View Calendar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyPlan.map((week) => {
          const IconComponent = getWeekIcon(week.week)
          const progress = getWeekProgress(week.week)
          const status = getWeekStatus(week.week)

          return (
            <Card
              key={week.week}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                status === "in-progress" ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Week {week.week}</CardTitle>
                  </div>
                  <Badge
                    variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}
                  >
                    {status === "completed" ? "Done" : status === "in-progress" ? "Active" : "Upcoming"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-primary text-balance">{week.theme}</h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-pretty">{week.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {week.days.slice(0, 3).map((day, index) => {
                      const topic = day.morning.split(" - ")[0]
                      return (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      )
                    })}
                    {week.days.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{week.days.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>5 days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      <span>{week.days.length} problems</span>
                    </div>
                  </div>
                  <Link href={`/week/${week.week}`}>
                    <Button
                      size="sm"
                      variant={status === "upcoming" ? "outline" : "default"}
                      disabled={status === "upcoming"}
                    >
                      {status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Start"}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>

              {status === "in-progress" && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary" />
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
