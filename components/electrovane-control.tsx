"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Droplets, Power, Settings, Wifi, WifiOff, AlertTriangle, CheckCircle, Timer } from "lucide-react"
import { WateringSchedule } from "@/components/watering-schedule"
import { SystemStatus } from "@/components/system-status"

interface ElectrovaleStatus {
  id: string
  name: string
  isConnected: boolean
  isActive: boolean
  flowRate: number // ml/min
  lastActivated: Date | null
  batteryLevel: number
  moistureLevel: number
  targetMoisture: number
}

export function ElectrovaleControl() {
  const [valves, setValves] = useState<ElectrovaleStatus[]>([
    {
      id: "valve-1",
      name: "Monstera Deliciosa",
      isConnected: true,
      isActive: false,
      flowRate: 150,
      lastActivated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      batteryLevel: 85,
      moistureLevel: 45,
      targetMoisture: 60,
    },
    {
      id: "valve-2",
      name: "Snake Plant",
      isConnected: true,
      isActive: false,
      flowRate: 100,
      lastActivated: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      batteryLevel: 92,
      moistureLevel: 30,
      targetMoisture: 40,
    },
    {
      id: "valve-3",
      name: "Fiddle Leaf Fig",
      isConnected: false,
      isActive: false,
      flowRate: 0,
      lastActivated: null,
      batteryLevel: 15,
      moistureLevel: 0,
      targetMoisture: 65,
    },
  ])

  const [isAutoMode, setIsAutoMode] = useState(true)
  const [systemAlert, setSystemAlert] = useState<string | null>(null)

  useEffect(() => {
    // Check for low battery or disconnected devices
    const lowBatteryValves = valves.filter((valve) => valve.batteryLevel < 20)
    const disconnectedValves = valves.filter((valve) => !valve.isConnected)

    if (lowBatteryValves.length > 0 || disconnectedValves.length > 0) {
      const alerts = []
      if (lowBatteryValves.length > 0) {
        alerts.push(`${lowBatteryValves.length} device(s) have low battery`)
      }
      if (disconnectedValves.length > 0) {
        alerts.push(`${disconnectedValves.length} device(s) are disconnected`)
      }
      setSystemAlert(alerts.join(", "))
    } else {
      setSystemAlert(null)
    }
  }, [valves])

  const toggleValve = (valveId: string) => {
    setValves((prev) =>
      prev.map((valve) =>
        valve.id === valveId
          ? {
              ...valve,
              isActive: !valve.isActive,
              lastActivated: !valve.isActive ? new Date() : valve.lastActivated,
            }
          : valve,
      ),
    )
  }

  const updateTargetMoisture = (valveId: string, newTarget: number) => {
    setValves((prev) => prev.map((valve) => (valve.id === valveId ? { ...valve, targetMoisture: newTarget } : valve)))
  }

  const getStatusColor = (valve: ElectrovaleStatus) => {
    if (!valve.isConnected) return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    if (valve.isActive) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    if (valve.moistureLevel < valve.targetMoisture - 10)
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  }

  const getStatusText = (valve: ElectrovaleStatus) => {
    if (!valve.isConnected) return "Offline"
    if (valve.isActive) return "Watering"
    if (valve.moistureLevel < valve.targetMoisture - 10) return "Needs Water"
    return "Optimal"
  }

  const formatLastActivated = (date: Date | null) => {
    if (!date) return "Never"
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Smart Watering Control</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor and control your automated plant watering system with real-time moisture sensing and smart
            scheduling.
          </p>
        </div>

        {/* System Alert */}
        {systemAlert && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>System Alert:</strong> {systemAlert}
            </AlertDescription>
          </Alert>
        )}

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Valves</p>
                  <p className="text-2xl font-bold">{valves.filter((v) => v.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                  <p className="text-2xl font-bold">{valves.filter((v) => v.isConnected).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Timer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Auto Mode</p>
                  <p className="text-2xl font-bold">{isAutoMode ? "ON" : "OFF"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                  <p className="text-2xl font-bold">
                    {valves.filter((v) => !v.isConnected || v.batteryLevel < 20).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Valve Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Valve Controls
                    </CardTitle>
                    <CardDescription>Manage individual plant watering systems</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Auto Mode</span>
                    <Switch checked={isAutoMode} onCheckedChange={setIsAutoMode} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {valves.map((valve) => (
                  <div key={valve.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {valve.isConnected ? (
                            <Wifi className="h-4 w-4 text-green-500" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-red-500" />
                          )}
                          <h3 className="font-semibold">{valve.name}</h3>
                        </div>
                        <Badge className={getStatusColor(valve)}>{getStatusText(valve)}</Badge>
                      </div>
                      <Button
                        variant={valve.isActive ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleValve(valve.id)}
                        disabled={!valve.isConnected || isAutoMode}
                      >
                        <Power className="h-4 w-4 mr-2" />
                        {valve.isActive ? "Stop" : "Start"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Moisture</p>
                        <p className="text-lg font-semibold">{valve.moistureLevel}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="text-lg font-semibold">{valve.targetMoisture}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Battery</p>
                        <p className="text-lg font-semibold">{valve.batteryLevel}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Last Watered</p>
                        <p className="text-lg font-semibold">{formatLastActivated(valve.lastActivated)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Target Moisture: {valve.targetMoisture}%</span>
                      </div>
                      <Slider
                        value={[valve.targetMoisture]}
                        onValueChange={(value) => updateTargetMoisture(valve.id, value[0])}
                        max={100}
                        min={20}
                        step={5}
                        className="w-full"
                        disabled={!valve.isConnected}
                      />
                    </div>

                    {/* Moisture Level Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Current Moisture Level</span>
                        <span className="text-sm font-medium">{valve.moistureLevel}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            valve.moistureLevel < valve.targetMoisture - 10
                              ? "bg-red-500"
                              : valve.moistureLevel >= valve.targetMoisture
                                ? "bg-green-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${Math.min(valve.moistureLevel, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* System Status & Schedule */}
          <div className="space-y-6">
            <SystemStatus valves={valves} />
            <WateringSchedule />
          </div>
        </div>
      </div>
    </div>
  )
}
