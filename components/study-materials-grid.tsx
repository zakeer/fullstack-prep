"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { studyMaterials } from "@/lib/study-materials"
import { BookOpen, Video, FileText, Clipboard, Code, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"

export function StudyMaterialsGrid() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText
      case "video":
        return Video
      case "documentation":
        return BookOpen
      case "cheatsheet":
        return Clipboard
      case "practice":
        return Code
      case "notes":
        return FileText
      default:
        return BookOpen
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800"
      case "backend":
        return "bg-green-100 text-green-800"
      case "database":
        return "bg-purple-100 text-purple-800"
      case "system-design":
        return "bg-orange-100 text-orange-800"
      case "behavioral":
        return "bg-pink-100 text-pink-800"
      case "algorithms":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studyMaterials.map((material) => {
        const TypeIcon = getTypeIcon(material.type)

        return (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                <TypeIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getCategoryColor(material.category)}>{material.category.replace("-", " ")}</Badge>
                <Badge className={getDifficultyColor(material.difficulty)}>{material.difficulty}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-pretty">{material.description}</p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{material.estimatedTime}min</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Week {material.weekRelevance.join(", ")}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {material.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {material.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{material.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                {material.externalUrl ? (
                  <Button asChild size="sm" className="flex-1">
                    <a href={material.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Resource
                    </a>
                  </Button>
                ) : (
                  <Link href={`/materials/${material.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      View Material
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
