"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, BookOpen, ExternalLink, Bookmark } from "lucide-react"
import Link from "next/link"
import type { StudyMaterial } from "@/lib/study-materials"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MaterialViewerProps {
  material: StudyMaterial
}

export function MaterialViewer({ material }: MaterialViewerProps) {
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/materials">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Materials
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-2xl">{material.title}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                {material.externalUrl && (
                  <Button asChild size="sm">
                    <a href={material.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      External Link
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{material.description}</p>

            <div className="flex items-center gap-4 flex-wrap">
              <Badge className={getCategoryColor(material.category)}>{material.category.replace("-", " ")}</Badge>
              <Badge className={getDifficultyColor(material.difficulty)}>{material.difficulty}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{material.estimatedTime} minutes</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Week {material.weekRelevance.join(", ")}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {material.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>

        {material.content && (
          <>
            <Separator />
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "")
                      return !inline && match ? (
                        <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {material.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
