export interface SessionProgress {
  sessionId: string
  completed: boolean
  timeSpent: number // in minutes
  completedAt?: Date
  notes?: string
}

export interface DayProgress {
  weekNumber: number
  dayNumber: number
  sessions: SessionProgress[]
  codingProblemCompleted: boolean
  codingProblemTime?: number
  totalTimeSpent: number
  completedAt?: Date
}

export interface WeekProgress {
  weekNumber: number
  days: DayProgress[]
  totalTimeSpent: number
  completionPercentage: number
}

export interface UserProgress {
  weeks: WeekProgress[]
  totalTimeSpent: number
  overallProgress: number
  streak: number
  lastStudyDate?: Date
  startDate: Date
}

class ProgressStore {
  private storageKey = "interview-prep-progress"

  getProgress(): UserProgress {
    if (typeof window === "undefined") {
      return this.getDefaultProgress()
    }

    const stored = localStorage.getItem(this.storageKey)
    if (!stored) {
      const defaultProgress = this.getDefaultProgress()
      this.saveProgress(defaultProgress)
      return defaultProgress
    }

    try {
      const parsed = JSON.parse(stored)
      // Convert date strings back to Date objects
      if (parsed.lastStudyDate) parsed.lastStudyDate = new Date(parsed.lastStudyDate)
      if (parsed.startDate) parsed.startDate = new Date(parsed.startDate)

      parsed.weeks.forEach((week: WeekProgress) => {
        week.days.forEach((day: DayProgress) => {
          if (day.completedAt) day.completedAt = new Date(day.completedAt)
          day.sessions.forEach((session: SessionProgress) => {
            if (session.completedAt) session.completedAt = new Date(session.completedAt)
          })
        })
      })

      return parsed
    } catch {
      return this.getDefaultProgress()
    }
  }

  saveProgress(progress: UserProgress): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.storageKey, JSON.stringify(progress))
  }

  private getDefaultProgress(): UserProgress {
    return {
      weeks: Array.from({ length: 6 }, (_, i) => ({
        weekNumber: i + 1,
        days: Array.from({ length: 5 }, (_, j) => ({
          weekNumber: i + 1,
          dayNumber: j + 1,
          sessions: [
            { sessionId: "morning", completed: false, timeSpent: 0 },
            { sessionId: "afternoon", completed: false, timeSpent: 0 },
            { sessionId: "evening", completed: false, timeSpent: 0 },
          ],
          codingProblemCompleted: false,
          totalTimeSpent: 0,
        })),
        totalTimeSpent: 0,
        completionPercentage: 0,
      })),
      totalTimeSpent: 0,
      overallProgress: 0,
      streak: 0,
      startDate: new Date(),
    }
  }

  completeSession(weekNumber: number, dayNumber: number, sessionId: string, timeSpent = 0): void {
    const progress = this.getProgress()
    const week = progress.weeks.find((w) => w.weekNumber === weekNumber)
    const day = week?.days.find((d) => d.dayNumber === dayNumber)
    const session = day?.sessions.find((s) => s.sessionId === sessionId)

    if (session && !session.completed) {
      session.completed = true
      session.timeSpent = timeSpent
      session.completedAt = new Date()

      if (day) {
        day.totalTimeSpent += timeSpent
        this.updateDayProgress(day)
      }

      if (week) {
        this.updateWeekProgress(week)
      }

      this.updateOverallProgress(progress)
      this.updateStreak(progress)
      this.saveProgress(progress)
    }
  }

  completeCodingProblem(weekNumber: number, dayNumber: number, timeSpent = 0): void {
    const progress = this.getProgress()
    const week = progress.weeks.find((w) => w.weekNumber === weekNumber)
    const day = week?.days.find((d) => d.dayNumber === dayNumber)

    if (day && !day.codingProblemCompleted) {
      day.codingProblemCompleted = true
      day.codingProblemTime = timeSpent
      day.totalTimeSpent += timeSpent

      this.updateDayProgress(day)

      if (week) {
        this.updateWeekProgress(week)
      }

      this.updateOverallProgress(progress)
      this.updateStreak(progress)
      this.saveProgress(progress)
    }
  }

  private updateDayProgress(day: DayProgress): void {
    const completedSessions = day.sessions.filter((s) => s.completed).length
    const totalSessions = day.sessions.length + 1 // +1 for coding problem
    const codingCompleted = day.codingProblemCompleted ? 1 : 0

    if (completedSessions + codingCompleted === totalSessions) {
      day.completedAt = new Date()
    }
  }

  private updateWeekProgress(week: WeekProgress): void {
    const totalSessions = week.days.length * 4 // 3 sessions + 1 coding problem per day
    const completedSessions = week.days.reduce((acc, day) => {
      const sessionCount = day.sessions.filter((s) => s.completed).length
      const codingCount = day.codingProblemCompleted ? 1 : 0
      return acc + sessionCount + codingCount
    }, 0)

    week.completionPercentage = Math.round((completedSessions / totalSessions) * 100)
    week.totalTimeSpent = week.days.reduce((acc, day) => acc + day.totalTimeSpent, 0)
  }

  private updateOverallProgress(progress: UserProgress): void {
    const totalSessions = progress.weeks.length * 5 * 4 // 6 weeks * 5 days * 4 sessions
    const completedSessions = progress.weeks.reduce((acc, week) => {
      return (
        acc +
        week.days.reduce((dayAcc, day) => {
          const sessionCount = day.sessions.filter((s) => s.completed).length
          const codingCount = day.codingProblemCompleted ? 1 : 0
          return dayAcc + sessionCount + codingCount
        }, 0)
      )
    }, 0)

    progress.overallProgress = Math.round((completedSessions / totalSessions) * 100)
    progress.totalTimeSpent = progress.weeks.reduce((acc, week) => acc + week.totalTimeSpent, 0)
  }

  private updateStreak(progress: UserProgress): void {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Simple streak calculation - count consecutive days with any activity
    let streak = 0
    const currentDate = new Date(today)

    for (let i = 0; i < 42; i++) {
      // Check last 42 days (6 weeks)
      const hasActivity = progress.weeks.some((week) =>
        week.days.some(
          (day) =>
            day.sessions.some((session) => session.completedAt && this.isSameDay(session.completedAt, currentDate)) ||
            (day.completedAt && this.isSameDay(day.completedAt, currentDate)),
        ),
      )

      if (hasActivity) {
        streak++
      } else if (streak > 0) {
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    progress.streak = streak
    if (progress.weeks.some((w) => w.days.some((d) => d.sessions.some((s) => s.completed)))) {
      progress.lastStudyDate = today
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString()
  }

  resetProgress(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.storageKey)
  }
}

export const progressStore = new ProgressStore()
