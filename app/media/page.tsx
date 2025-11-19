"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Image as ImageIcon, FileText, Download, Play, Calendar } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function MediaPage() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos" | "documents">("all")
  const [mediaItems, setMediaItems] = useState<any[]>([])

  useEffect(() => {
    // Fetch media from localStorage (in a real app, this would be from an API)
    const storedMedia = localStorage.getItem("media")
    if (storedMedia) {
      try {
        const parsedMedia = JSON.parse(storedMedia)
        setMediaItems(parsedMedia.map((item: any) => ({
          id: item._id,
          type: item.type,
          title: item.title,
          thumbnail: item.image,
          date: item.date,
          category: item.category,
        })))
      } catch (error) {
        console.error("Error parsing media:", error)
      }
    }
  }, [])

  const filteredMedia = activeTab === "all" 
    ? mediaItems 
    : mediaItems.filter(item => {
        if (activeTab === "images") return item.type === "image"
        if (activeTab === "videos") return item.type === "video"
        if (activeTab === "documents") return item.type === "document"
        return true
      })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      default:
        return <ImageIcon className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-primary/10"
              variants={fadeInUp}
            >
              <ImageIcon className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
              variants={fadeInUp}
            >
              Media Gallery
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Explore our photos, videos, and documents showcasing our impact and activities
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "all", label: "All Media" },
              { id: "images", label: "Images" },
              { id: "videos", label: "Videos" },
              { id: "documents", label: "Documents" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={activeTab === tab.id ? "bg-primary hover:bg-primary/90" : ""}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            key={activeTab}
          >
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="relative w-full aspect-square overflow-hidden bg-muted">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      {item.type === "video" && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 rounded-full p-4">
                            <Play className="h-8 w-8 text-primary fill-primary" />
                          </div>
                        </div>
                      )}
                      {item.type === "document" && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 rounded-full p-4">
                            <Download className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-black/50 text-white border-0">
                        {getTypeIcon(item.type)}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No media available</h3>
              <p className="text-muted-foreground">Check back soon for new media content</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

