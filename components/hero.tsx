import { Button } from "@/components/ui/button"
import { Camera, ShoppingBag, Heart } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/beautiful-pink-farmer-background.jpg"
          alt="Beautiful agricultural landscape with pink sunset"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <Heart className="h-6 w-6 text-white" />
              <span className="text-white font-medium">Empowering Women Farmers</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
              Evolving, softly
              <span className="text-white"> & powerfully</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty">
              Join thousands of women transforming agriculture. Get expert guidance, sell your harvest, and build a
              sustainable farming future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                <Camera className="h-5 w-5 mr-2" />
                Check Plant Health
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Explore Marketplace
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Our Community</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                  <div className="text-white/80">Women Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15k+</div>
                  <div className="text-white/80">Products Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-white/80">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-white/80">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
