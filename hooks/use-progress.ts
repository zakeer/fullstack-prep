"use client"

import { useState, useEffect } from "react"
import { progressStore, type UserProgress } from "@/lib/progress-store"

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProgress = () => {
      const userProgress = progressStore.getProgress()
      setProgress(userProgress)
      setIsLoading(false)
    }

    loadProgress()
  }, [])

  const completeSession = (weekNumber: number, dayNumber: number, sessionId: string, timeSpent?: number) => {
    progressStore.completeSession(weekNumber, dayNumber, sessionId, timeSpent)
    setProgress(progressStore.getProgress())
  }

  const completeCodingProblem = (weekNumber: number, dayNumber: number, timeSpent?: number) => {
    progressStore.completeCodingProblem(weekNumber, dayNumber, timeSpent)
    setProgress(progressStore.getProgress())
  }

  const resetProgress = () => {
    progressStore.resetProgress()
    setProgress(progressStore.getProgress())
  }

  const getWeekProgress = (weekNumber: number) => {
    return progress?.weeks.find((w) => w.weekNumber === weekNumber)
  }

  const getDayProgress = (weekNumber: number, dayNumber: number) => {
    const week = getWeekProgress(weekNumber)
    return week?.days.find((d) => d.dayNumber === dayNumber)
  }

  const getSessionProgress = (weekNumber: number, dayNumber: number, sessionId: string) => {
    const day = getDayProgress(weekNumber, dayNumber)
    return day?.sessions.find((s) => s.sessionId === sessionId)
  }

  return {
    progress,
    isLoading,
    completeSession,
    completeCodingProblem,
    resetProgress,
    getWeekProgress,
    getDayProgress,
    getSessionProgress,
  }
}
