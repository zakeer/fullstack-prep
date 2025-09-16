"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/hooks/use-progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Clock, Target, Trophy, Flame } from "lucide-react"

export function ProgressAnalytics() {
  const { progress, isLoading } = useProgress()

  if (isLoading || !progress) {
    return <div className="animate-pulse">Loading analytics...</div>
  }

  const weeklyData = progress.weeks.map((week) => ({
    week: `Week ${week.weekNumber}`,
    timeSpent: Math.round(week.totalTimeSpent / 60),
    completion: week.completionPercentage,
  }))

  const sessionTypeData = [
    { name: "Morning (Theory)", value: 0, color: "#10b981" },
    { name: "Afternoon (Practical)", value: 0, color: "#3b82f6" },
    { name: "Evening (Behavioral)", value: 0, color: "#8b5cf6" },
    { name: "Coding Problems", value: 0, color: "#f59e0b" },
  ]

  // Calculate session type completion
  progress.weeks.forEach((week) => {
    week.days.forEach((day) => {
      day.sessions.forEach((session, index) => {
        if (session.completed) {
          sessionTypeData[index].value++
        }
      })
      if (day.codingProblemCompleted) {
        sessionTypeData[3].value++
      }
    })
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progress.totalTimeSpent / 60)}h</div>
            <p className="text-xs text-muted-foreground">
              Avg{" "}
              {Math.round(
                progress.totalTimeSpent / Math.max(progress.weeks.filter((w) => w.totalTimeSpent > 0).length, 1) / 60,
              )}
              h per active week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.overallProgress}%</div>
            <Progress value={progress.overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.streak}</div>
            <p className="text-xs text-muted-foreground">{progress.streak === 1 ? "day" : "days"} in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionTypeData.reduce((acc, item) => acc + item.value, 0)}</div>
            <p className="text-xs text-muted-foreground">Out of {progress.weeks.length * 5 * 4} total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="timeSpent" fill="#10b981" name="Hours Studied" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {sessionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Week-by-Week Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.weeks.map((week) => (
              <div key={week.weekNumber} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Week {week.weekNumber}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{Math.round(week.totalTimeSpent / 60)}h</Badge>
                    <Badge
                      variant={
                        week.completionPercentage === 100
                          ? "default"
                          : week.completionPercentage > 0
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {week.completionPercentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={week.completionPercentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
