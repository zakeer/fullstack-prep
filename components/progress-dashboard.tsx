"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, Target, Flame } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"

export function ProgressDashboard() {
  const { progress, isLoading } = useProgress()

  if (isLoading || !progress) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/3 mb-2" />
              <div className="h-2 bg-muted rounded w-full mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const currentWeek =
    progress.weeks.find((w) => w.completionPercentage > 0 && w.completionPercentage < 100) || progress.weeks[0]
  const currentDay = currentWeek.days.find((d) => !d.completedAt) || currentWeek.days[0]
  const completedDays = progress.weeks.reduce((acc, week) => acc + week.days.filter((day) => day.completedAt).length, 0)
  const totalDays = progress.weeks.length * 5 // 6 weeks * 5 days
  const daysRemaining = totalDays - completedDays

  const stats = [
    {
      title: "Overall Progress",
      value: `${progress.overallProgress}%`,
      progress: progress.overallProgress,
      icon: Target,
      description: `Week ${currentWeek.weekNumber}, Day ${currentDay.dayNumber}`,
      color: "text-blue-600",
    },
    {
      title: "Study Time",
      value: `${Math.round(progress.totalTimeSpent / 60)}h`,
      progress: Math.min((progress.totalTimeSpent / (42 * 5 * 60)) * 100, 100),
      icon: Clock,
      description: `${Math.round(currentWeek.totalTimeSpent / 60)}h this week`,
      color: "text-green-600",
    },
    {
      title: "Completed Days",
      value: `${completedDays}/${totalDays}`,
      progress: (completedDays / totalDays) * 100,
      icon: CheckCircle,
      description: "Days fully completed",
      color: "text-emerald-600",
    },
    {
      title: "Study Streak",
      value: `${progress.streak}`,
      progress: Math.min((progress.streak / 7) * 100, 100),
      icon: Flame,
      description: progress.streak === 1 ? "day" : "days",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <Progress value={stat.progress} className="mt-2 transition-all duration-500 ease-out" />
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
