"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Upload, X, AlertTriangle, Info, Loader2 } from "lucide-react"
import { DiagnosticResults } from "@/components/diagnostic-results"

// This interface must exactly match the JSON response from your Python API
interface DiagnosticResult {
  condition: string
  severity: "low" | "medium" | "high"
  confidence: number
  description: string
  causes: string[]
  solutions: string[]
  prevention: string[]
}

export function PhotoDiagnostic() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<DiagnosticResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError("Image size must be less than 10MB")
      return
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return
    }
    setSelectedImage(file)
    setError(null)
    setResults(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleImageSelect(files[0])
      }
    },
    [handleImageSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleImageSelect(files[0])
      }
    },
    [handleImageSelect],
  )

  const clearImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setResults(null)
    setError(null)
  }

  // --- THIS IS THE UPDATED PART ---
  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError(null)
    setResults(null) // Clear previous results

    const formData = new FormData()
    formData.append("file", selectedImage)
    
    // The URL of your running Python API
    const API_URL = "http://127.0.0.1:5000/api/diagnose"

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "An error occurred while communicating with the server.")
      }

      const resultData: DiagnosticResult = await response.json()
      setResults(resultData)

    } catch (err: any) {
      setError(err.message || "Failed to analyze image. Please ensure the Python API server is running.")
    } finally {
      setIsAnalyzing(false)
    }
  }
  // --- END OF UPDATED PART ---

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Plant Health Diagnostic</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your plant to get instant AI-powered health analysis, diagnostic insights, and treatment
            recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Plant Photo
              </CardTitle>
              <CardDescription>Take a clear photo of the affected plant parts for best results</CardDescription>
            </CardHeader>
            <CardContent>
              {!imagePreview ? (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop your image here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                  <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP (max 10MB)</p>
                  <input id="file-input" type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Plant preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={clearImage}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {selectedImage?.name} ({Math.round((selectedImage?.size || 0) / 1024)}KB)
                    </div>
                    <Button onClick={analyzeImage} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Plant"
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Photography Tips
              </CardTitle>
              <CardDescription>Follow these tips for accurate diagnosis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Good Lighting</h4>
                    <p className="text-sm text-muted-foreground">
                      Use natural light or bright indoor lighting. Avoid shadows and flash.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Focus on Problems</h4>
                    <p className="text-sm text-muted-foreground">
                      Capture affected leaves, stems, or roots clearly and up close.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Multiple Angles</h4>
                    <p className="text-sm text-muted-foreground">
                      Include both close-up details and overall plant condition.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Clean Background</h4>
                    <p className="text-sm text-muted-foreground">
                      Use a plain background to help the AI focus on the plant.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {results && (
          <div className="mt-8">
            <DiagnosticResults results={results} />
          </div>
        )}
      </div>
    </div>
  )
}


