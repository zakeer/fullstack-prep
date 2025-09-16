"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen, Code, Users, Brain, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/hooks/use-progress"

export function QuickActions() {
  const { progress } = useProgress()

  const getCurrentWeekDay = () => {
    if (!progress) return { week: 1, day: 1 }
    const currentWeek =
      progress.weeks.find((w) => w.completionPercentage > 0 && w.completionPercentage < 100) || progress.weeks[0]
    const currentDay = currentWeek.days.find((d) => !d.completedAt) || currentWeek.days[0]
    return { week: currentWeek.weekNumber, day: currentDay.dayNumber }
  }

  const { week, day } = getCurrentWeekDay()

  const actions = [
    {
      title: "Continue Today's Study",
      description: `Week ${week}, Day ${day} - Current Session`,
      icon: Play,
      variant: "default" as const,
      time: "2h remaining",
      href: `/week/${week}/day/${day}`,
      badge: "Active",
      badgeVariant: "default" as const,
    },
    {
      title: "Coding Problems",
      description: "Practice algorithm challenges",
      icon: Code,
      variant: "outline" as const,
      time: "150+ problems",
      href: "/problems",
      badge: "Practice",
      badgeVariant: "secondary" as const,
    },
    {
      title: "Study Materials",
      description: "Review notes and resources",
      icon: BookOpen,
      variant: "outline" as const,
      time: "Library",
      href: "/materials",
      badge: "Reference",
      badgeVariant: "outline" as const,
    },
    {
      title: "Progress Analytics",
      description: "Track your study journey",
      icon: Users,
      variant: "outline" as const,
      time: `${progress?.streak || 0} day streak`,
      href: "/progress",
      badge: "Analytics",
      badgeVariant: "outline" as const,
    },
  ]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-start gap-3 w-full group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <action.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">{action.title}</span>
                  </div>
                  <Badge variant={action.badgeVariant} className="text-xs">
                    {action.badge}
                  </Badge>
                </div>

                <div className="w-full space-y-2">
                  <p className="text-xs text-left opacity-80 line-clamp-2">{action.description}</p>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs opacity-60">{action.time}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
