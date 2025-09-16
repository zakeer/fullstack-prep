"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock, Target } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

export function ProgressCalendar() {
  const { progress } = useProgress()

  if (!progress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Study Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Generate calendar data for the 6-week program
  const generateCalendarData = () => {
    const calendarData = []
    let dayCounter = 1

    for (let week = 1; week <= 6; week++) {
      const weekData = progress.weeks.find((w) => w.weekNumber === week)

      for (let day = 1; day <= 7; day++) {
        if (day <= 5) {
          // Only weekdays have study sessions
          const dayData = weekData?.days.find((d) => d.dayNumber === day)
          calendarData.push({
            date: dayCounter,
            week,
            day,
            isStudyDay: true,
            isCompleted: dayData?.completedAt ? true : false,
            isActive: dayData && !dayData.completedAt && week === getCurrentWeek(),
            timeSpent: dayData?.timeSpent || 0,
            sessionsCompleted: dayData?.sessionsCompleted || 0,
            totalSessions: 3, // Morning, afternoon, evening
          })
        } else {
          calendarData.push({
            date: dayCounter,
            week,
            day,
            isStudyDay: false,
            isCompleted: false,
            isActive: false,
            timeSpent: 0,
            sessionsCompleted: 0,
            totalSessions: 0,
          })
        }
        dayCounter++
      }
    }
    return calendarData
  }

  const getCurrentWeek = () => {
    const currentWeek = progress.weeks.find((w) => w.completionPercentage > 0 && w.completionPercentage < 100)
    return currentWeek?.weekNumber || 1
  }

  const calendarData = generateCalendarData()
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const getDayStatus = (dayData: any) => {
    if (!dayData.isStudyDay) return "rest"
    if (dayData.isCompleted) return "completed"
    if (dayData.isActive) return "active"
    if (dayData.week < getCurrentWeek()) return "missed"
    return "upcoming"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"
      case "active":
        return "bg-blue-500 text-white"
      case "missed":
        return "bg-red-100 text-red-700"
      case "rest":
        return "bg-gray-100 text-gray-500"
      default:
        return "bg-gray-50 text-gray-700 border-2 border-dashed border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "active":
        return <Target className="h-3 w-3" />
      case "missed":
        return <Clock className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          6-Week Study Calendar
        </CardTitle>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded" />
            <span>Rest Day</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
            {weekDays.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarData.map((dayData, index) => {
              const status = getDayStatus(dayData)
              return (
                <div
                  key={index}
                  className={cn(
                    "relative h-16 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105",
                    getStatusColor(status),
                  )}
                >
                  <div className="flex items-center gap-1">
                    {getStatusIcon(status)}
                    <span>Day {dayData.date}</span>
                  </div>

                  {dayData.isStudyDay && (
                    <div className="text-xs opacity-75 mt-1">
                      {dayData.isCompleted ? (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          {Math.round(dayData.timeSpent / 60)}h
                        </Badge>
                      ) : dayData.isActive ? (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          Week {dayData.week}
                        </Badge>
                      ) : null}
                    </div>
                  )}

                  {/* Week separator */}
                  {(index + 1) % 7 === 0 && index < calendarData.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                      Week {Math.floor(index / 7) + 1}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
