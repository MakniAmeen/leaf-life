"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Droplets, Sun, Thermometer, Wind, Zap, RotateCcw, Lightbulb } from "lucide-react"

interface Plant {
  id: string
  name: string
  scientificName: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  image: string
  description: string
  care: {
    watering: string
    light: string
    temperature: string
    humidity: string
    fertilizer: string
    repotting: string
  }
  tips: string[]
}

interface PlantCareModalProps {
  plant: Plant
  isOpen: boolean
  onClose: () => void
}

export function PlantCareModal({ plant, isOpen, onClose }: PlantCareModalProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const careItems = [
    { icon: Droplets, label: "Watering", content: plant.care.watering },
    { icon: Sun, label: "Light", content: plant.care.light },
    { icon: Thermometer, label: "Temperature", content: plant.care.temperature },
    { icon: Wind, label: "Humidity", content: plant.care.humidity },
    { icon: Zap, label: "Fertilizer", content: plant.care.fertilizer },
    { icon: RotateCcw, label: "Repotting", content: plant.care.repotting },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{plant.name}</DialogTitle>
              <p className="text-muted-foreground italic mb-2">{plant.scientificName}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{plant.category}</Badge>
                <Badge className={getDifficultyColor(plant.difficulty)}>{plant.difficulty}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Plant Image */}
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img src={plant.image || "/placeholder.svg"} alt={plant.name} className="w-full h-full object-cover" />
          </div>

          {/* Plant Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About This Plant</h3>
            <p className="text-muted-foreground leading-relaxed">{plant.description}</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Care Instructions */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Care Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careItems.map((item, index) => (
              <div key={index} className="flex gap-3 p-4 rounded-lg bg-muted/50">
                <item.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Tips */}
        {plant.tips.length > 0 && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Expert Tips
              </h3>
              <ul className="space-y-2">
                {plant.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
