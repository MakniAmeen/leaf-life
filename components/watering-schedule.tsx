"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react"

interface ScheduleEntry {
  id: string
  plantName: string
  time: string
  days: string[]
  duration: number // minutes
  isActive: boolean
}

export function WateringSchedule() {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([
    {
      id: "schedule-1",
      plantName: "Monstera Deliciosa",
      time: "08:00",
      days: ["Mon", "Wed", "Fri"],
      duration: 5,
      isActive: true,
    },
    {
      id: "schedule-2",
      plantName: "Snake Plant",
      time: "09:00",
      days: ["Sun"],
      duration: 3,
      isActive: true,
    },
    {
      id: "schedule-3",
      plantName: "Fiddle Leaf Fig",
      time: "07:30",
      days: ["Tue", "Sat"],
      duration: 7,
      isActive: false,
    },
  ])

  const toggleSchedule = (scheduleId: string) => {
    setSchedules((prev) =>
      prev.map((schedule) => (schedule.id === scheduleId ? { ...schedule, isActive: !schedule.isActive } : schedule)),
    )
  }

  const getNextWatering = (schedule: ScheduleEntry) => {
    const now = new Date()
    const today = now.getDay()
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const scheduleTime =
      Number.parseInt(schedule.time.split(":")[0]) * 60 + Number.parseInt(schedule.time.split(":")[1])

    // Find next occurrence
    for (let i = 0; i < 7; i++) {
      const checkDay = (today + i) % 7
      const dayName = dayNames[checkDay]

      if (schedule.days.includes(dayName)) {
        if (i === 0 && currentTime < scheduleTime) {
          return "Today"
        } else if (i === 1) {
          return "Tomorrow"
        } else if (i > 1) {
          return `${i} days`
        }
      }
    }
    return "Next week"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Watering Schedule
            </CardTitle>
            <CardDescription>Automated watering times for your plants</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="p-3 border border-border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{schedule.plantName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{schedule.time}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{schedule.duration}min</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {schedule.days.map((day) => (
                  <Badge key={day} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {day}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Next: {getNextWatering(schedule)}</span>
                <Button
                  variant={schedule.isActive ? "default" : "outline"}
                  size="sm"
                  className="h-6 text-xs px-2"
                  onClick={() => toggleSchedule(schedule.id)}
                >
                  {schedule.isActive ? "ON" : "OFF"}
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Schedules</span>
            <span className="font-medium">{schedules.filter((s) => s.isActive).length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
