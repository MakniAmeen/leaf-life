"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Wifi, Battery, Droplets } from "lucide-react"

interface ElectrovaleStatus {
  id: string
  name: string
  isConnected: boolean
  isActive: boolean
  flowRate: number
  lastActivated: Date | null
  batteryLevel: number
  moistureLevel: number
  targetMoisture: number
}

interface SystemStatusProps {
  valves: ElectrovaleStatus[]
}

export function SystemStatus({ valves }: SystemStatusProps) {
  const connectedValves = valves.filter((v) => v.isConnected)
  const activeValves = valves.filter((v) => v.isActive)
  const lowBatteryValves = valves.filter((v) => v.batteryLevel < 20)
  const needsWaterValves = valves.filter((v) => v.moistureLevel < v.targetMoisture - 10)

  const getSystemHealth = () => {
    const totalValves = valves.length
    const healthyValves = valves.filter(
      (v) => v.isConnected && v.batteryLevel >= 20 && v.moistureLevel >= v.targetMoisture - 10,
    ).length

    const healthPercentage = (healthyValves / totalValves) * 100

    if (healthPercentage >= 80) return { status: "Excellent", color: "text-green-600" }
    if (healthPercentage >= 60) return { status: "Good", color: "text-yellow-600" }
    return { status: "Needs Attention", color: "text-red-600" }
  }

  const systemHealth = getSystemHealth()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Status
        </CardTitle>
        <CardDescription>Real-time monitoring of your watering system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="font-medium">System Health</span>
          <Badge className={`${systemHealth.color} bg-transparent border-current`}>{systemHealth.status}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-sm">Connected Devices</span>
            </div>
            <span className="font-medium">
              {connectedValves.length}/{valves.length}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Active Watering</span>
            </div>
            <span className="font-medium">{activeValves.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Low Battery</span>
            </div>
            <span className="font-medium">{lowBatteryValves.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-red-500" />
              <span className="text-sm">Needs Water</span>
            </div>
            <span className="font-medium">{needsWaterValves.length}</span>
          </div>
        </div>

        {lowBatteryValves.length > 0 && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Low Battery Alert</p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              {lowBatteryValves.map((v) => v.name).join(", ")} need battery replacement
            </p>
          </div>
        )}

        {needsWaterValves.length > 0 && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Watering Alert</p>
            <p className="text-xs text-red-700 dark:text-red-300">
              {needsWaterValves.map((v) => v.name).join(", ")} need watering
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
