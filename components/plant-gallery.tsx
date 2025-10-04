"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, Sun, Thermometer, ChevronRight } from "lucide-react"
import { PlantCareModal } from "@/components/plant-care-modal"

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

const plants: Plant[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "Tropical",
    difficulty: "Easy",
    image: "/monstera-deliciosa-plant-with-split-leaves.jpg",
    description: "A stunning tropical plant known for its large, split leaves and easy care requirements.",
    care: {
      watering: "Water when top 1-2 inches of soil are dry, typically every 1-2 weeks",
      light: "Bright, indirect light. Avoid direct sunlight which can scorch leaves",
      temperature: "65-85°F (18-29°C). Avoid cold drafts",
      humidity: "40-60% humidity. Use a humidifier or pebble tray if needed",
      fertilizer: "Monthly during growing season (spring/summer) with balanced liquid fertilizer",
      repotting: "Every 2-3 years or when rootbound, preferably in spring",
    },
    tips: [
      "Provide a moss pole for climbing support",
      "Wipe leaves regularly to remove dust",
      "Fenestrations (splits) develop with age and proper light",
    ],
  },
  {
    id: "2",
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    category: "Succulent",
    difficulty: "Easy",
    image: "/snake-plant-sansevieria-with-tall-green-leaves.jpg",
    description: "An extremely hardy plant perfect for beginners, known for its air-purifying qualities.",
    care: {
      watering: "Water every 2-6 weeks, allowing soil to dry completely between waterings",
      light: "Tolerates low to bright indirect light, very adaptable",
      temperature: "60-80°F (15-27°C). Very temperature tolerant",
      humidity: "Low to moderate humidity, very adaptable",
      fertilizer: "Light feeding 2-3 times during growing season",
      repotting: "Every 3-5 years, prefers to be slightly rootbound",
    },
    tips: [
      "Overwatering is the most common cause of problems",
      "Can propagate easily from leaf cuttings",
      "Excellent air purifier, especially at night",
    ],
  },
  {
    id: "3",
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    category: "Tree",
    difficulty: "Hard",
    image: "/fiddle-leaf-fig-tree-with-large-violin-shaped-leav.jpg",
    description: "A dramatic statement plant with large, violin-shaped leaves that requires consistent care.",
    care: {
      watering: "Water when top inch of soil is dry, typically weekly in growing season",
      light: "Bright, indirect light. Rotate regularly for even growth",
      temperature: "65-75°F (18-24°C). Avoid temperature fluctuations",
      humidity: "30-65% humidity. Benefits from regular misting",
      fertilizer: "Monthly during spring and summer with diluted liquid fertilizer",
      repotting: "Every 2 years in spring, or when rootbound",
    },
    tips: [
      "Consistency is key - avoid moving frequently",
      "Brown spots often indicate overwatering",
      "Prune in spring to encourage branching",
    ],
  },
  {
    id: "4",
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    category: "Vine",
    difficulty: "Easy",
    image: "/golden-pothos-vine-with-heart-shaped-variegated-le.jpg",
    description: "A versatile trailing vine that thrives in various conditions and is perfect for hanging baskets.",
    care: {
      watering: "Water when top inch of soil feels dry, typically every 1-2 weeks",
      light: "Low to bright indirect light. Variegation fades in low light",
      temperature: "65-85°F (18-29°C). Avoid cold drafts",
      humidity: "40-60% humidity, but adapts to lower levels",
      fertilizer: "Monthly during growing season with balanced liquid fertilizer",
      repotting: "Every 2-3 years or when rootbound",
    },
    tips: [
      "Can be propagated easily in water",
      "Trim regularly to maintain bushy growth",
      "Excellent for beginners and low-light areas",
    ],
  },
  {
    id: "5",
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    category: "Flowering",
    difficulty: "Medium",
    image: "/peace-lily-with-white-flowers-and-dark-green-leave.jpg",
    description: "An elegant flowering plant that produces beautiful white blooms and helps purify the air.",
    care: {
      watering: "Keep soil consistently moist but not waterlogged",
      light: "Low to medium indirect light. Avoid direct sunlight",
      temperature: "65-80°F (18-27°C). Sensitive to cold",
      humidity: "40-60% humidity. Benefits from regular misting",
      fertilizer: "Monthly during growing season with balanced fertilizer",
      repotting: "Every 1-2 years in spring when rootbound",
    },
    tips: [
      "Drooping leaves usually indicate need for water",
      "Remove spent flowers to encourage new blooms",
      "Excellent natural air purifier",
    ],
  },
  {
    id: "6",
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    category: "Tree",
    difficulty: "Medium",
    image: "/rubber-plant-ficus-with-glossy-dark-green-leaves.jpg",
    description: "A classic houseplant with glossy, dark green leaves that can grow into an impressive indoor tree.",
    care: {
      watering: "Water when top inch of soil is dry, reduce in winter",
      light: "Bright, indirect light. Can tolerate some direct morning sun",
      temperature: "60-80°F (15-27°C). Avoid cold drafts",
      humidity: "40-50% humidity. Wipe leaves regularly",
      fertilizer: "Monthly during growing season with balanced fertilizer",
      repotting: "Every 2-3 years or when rootbound",
    },
    tips: [
      "Prune in spring to control size and shape",
      "Wipe leaves weekly to maintain glossy appearance",
      "Can be trained as a tree or kept bushy",
    ],
  },
]

export function PlantGallery() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(plants.map((plant) => plant.category)))]
  const filteredPlants = filter === "All" ? plants : plants.filter((plant) => plant.category === filter)

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

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Plant Care Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of plants with detailed care guides and expert tips.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Plant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <Card key={plant.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <img
                  src={plant.image || "/placeholder.svg"}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">{plant.name}</CardTitle>
                    <CardDescription className="text-sm italic">{plant.scientificName}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(plant.difficulty)}>{plant.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{plant.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>Weekly</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sun className="h-3 w-3" />
                    <span>Indirect</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    <span>65-80°F</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setSelectedPlant(plant)}
                >
                  View Care Guide
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedPlant && (
        <PlantCareModal plant={selectedPlant} isOpen={!!selectedPlant} onClose={() => setSelectedPlant(null)} />
      )}
    </section>
  )
}
