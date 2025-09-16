"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { materialCategories, materialTypes } from "@/lib/study-materials"
import { useState } from "react"

export function MaterialsFilters() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const difficulties = [
    { id: "all", label: "All Levels" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Category</h4>
          <div className="space-y-2">
            {materialCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="w-full justify-between"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Type</h4>
          <div className="space-y-2">
            {materialTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
                className="w-full justify-start"
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Difficulty</h4>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty.id}
                variant={selectedDifficulty === difficulty.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className="w-full justify-start"
              >
                {difficulty.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
