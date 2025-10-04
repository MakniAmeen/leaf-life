"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Shield, Lightbulb, Target } from "lucide-react"

interface DiagnosticResult {
  condition: string
  severity: "low" | "medium" | "high"
  confidence: number
  description: string
  causes: string[]
  solutions: string[]
  prevention: string[]
}

interface DiagnosticResultsProps {
  results: DiagnosticResult
}

export function DiagnosticResults({ results }: DiagnosticResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return CheckCircle
      case "medium":
        return AlertTriangle
      case "high":
        return AlertTriangle
      default:
        return AlertTriangle
    }
  }

  const SeverityIcon = getSeverityIcon(results.severity)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                <SeverityIcon className="h-6 w-6" />
                Diagnostic Results
              </CardTitle>
              <CardDescription>AI analysis completed with {results.confidence}% confidence</CardDescription>
            </div>
            <Badge className={getSeverityColor(results.severity)}>{results.severity.toUpperCase()} SEVERITY</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{results.condition}</h3>
              <p className="text-muted-foreground leading-relaxed">{results.description}</p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{results.confidence}%</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground capitalize">{results.severity}</div>
                <div className="text-xs text-muted-foreground">Severity</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Possible Causes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-red-500" />
              Possible Causes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fungal infection caused by <em>Alternaria solani</em> thriving in warm, humid weather.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Overhead watering that splashes spores from soil onto lower leaves.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Poor air circulation due to dense planting or lack of pruning.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Infected soil or plant debris harboring fungal spores.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contaminated tools or seeds carrying the pathogen.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Weak plants caused by nutrient deficiencies, especially nitrogen and potassium.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Treatment Solutions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Treatment Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Remove and destroy infected leaves and plant debris immediately.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apply copper-based or organic fungicides like neem oil or Bordeaux mixture.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For severe cases, use fungicides containing chlorothalonil, mancozeb, or azoxystrobin.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Avoid watering leaves; water at soil level instead.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fertilize with a balanced NPK formula to strengthen plant defenses.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Prevention Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-blue-500" />
              Prevention Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rotate tomato crops every 2–3 years; avoid planting near potatoes or peppers.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use disease-resistant tomato varieties whenever possible.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ensure proper spacing and stake plants to promote airflow.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Water early in the day using drip irrigation or soaker hoses.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mulch the soil to prevent spore splash and retain moisture.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Disinfect gardening tools and clear plant debris at season’s end.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {results.severity === "high" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Urgent Action Required:</strong> This condition requires immediate attention to prevent further
            damage or plant loss. Consider consulting with a local plant expert or nursery for additional guidance.
          </AlertDescription>
        </Alert>
      )}

      {results.confidence < 70 && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <strong>Low Confidence Analysis:</strong> The AI analysis has lower confidence in this diagnosis. Consider
            taking additional photos with better lighting or different angles for more accurate results.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
