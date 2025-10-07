"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Image as ImageIcon,
  Search,
  Heart,
  Calendar,
  MapPin,
  Grid3X3,
  List,
  Share2,
  Download,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [galleryImages, setGalleryImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        const result = await response.json()
        
        if (result.success) {
          setGalleryImages(result.gallery)
        } else {
          console.error("Failed to fetch gallery:", result.error)
        }
      } catch (error) {
        console.error("Error fetching gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const staticGalleryImages = [
    {
      id: 1,
      title: "Education Program Launch",
      description: "Children learning with computers in our new digital learning center",
      image: "/children-learning-with-computers-in-classroom.jpg",
      category: "education",
      date: "2024-01-15",
      location: "Mumbai, Maharashtra",
      likes: 45,
      views: 234,
      tags: ["education", "children", "technology", "learning"],
    },
    {
      id: 2,
      title: "Health Camp Success",
      description: "Mobile health clinic providing free medical checkups in rural areas",
      image: "/mobile-health-clinic-in-rural-area.jpg",
      category: "healthcare",
      date: "2024-01-12",
      location: "Delhi, NCR",
      likes: 67,
      views: 189,
      tags: ["healthcare", "rural", "medical", "community"],
    },
    {
      id: 3,
      title: "Women Empowerment Workshop",
      description: "Women entrepreneurs working together in our skill development program",
      image: "/women-entrepreneurs-working-together.jpg",
      category: "women",
      date: "2024-01-10",
      location: "Bangalore, Karnataka",
      likes: 89,
      views: 312,
      tags: ["women", "empowerment", "entrepreneurship", "skills"],
    },
    {
      id: 4,
      title: "Temple Restoration Project",
      description: "Ancient temple construction site with dedicated workers",
      image: "/ancient-temple-construction-site-with-workers.jpg",
      category: "heritage",
      date: "2024-01-08",
      location: "Ayodhya, Uttar Pradesh",
      likes: 156,
      views: 445,
      tags: ["heritage", "temple", "restoration", "construction"],
    },
    {
      id: 5,
      title: "Community Health Center",
      description: "New rural healthcare facility construction in progress",
      image: "/rural-healthcare-facility-construction.jpg",
      category: "healthcare",
      date: "2024-01-05",
      location: "Pune, Maharashtra",
      likes: 78,
      views: 267,
      tags: ["healthcare", "infrastructure", "rural", "construction"],
    },
    {
      id: 6,
      title: "Water Well Construction",
      description: "Providing clean water access to remote villages",
      image: "/water-well-construction-in-rural-village.jpg",
      category: "infrastructure",
      date: "2024-01-03",
      location: "Rajasthan",
      likes: 92,
      views: 198,
      tags: ["water", "infrastructure", "rural", "clean water"],
    },
    {
      id: 7,
      title: "Classroom Learning",
      description: "Children studying in our newly established classroom",
      image: "/children-studying-in-classroom.jpg",
      category: "education",
      date: "2024-01-01",
      location: "Chennai, Tamil Nadu",
      likes: 54,
      views: 176,
      tags: ["education", "children", "classroom", "learning"],
    },
    {
      id: 8,
      title: "Temple Restoration Work",
      description: "Ancient temple with deity statue restoration work",
      image: "/ancient-temple-with-deity-statue-restoration-work.jpg",
      category: "heritage",
      date: "2023-12-28",
      location: "Gaya, Bihar",
      likes: 134,
      views: 389,
      tags: ["heritage", "temple", "restoration", "deity"],
    },
  ]

  // Use static images as fallback if no database images
  const displayImages = galleryImages.length > 0 ? galleryImages : staticGalleryImages

  const categories = [
    { id: "all", label: "All Photos", count: displayImages.length },
    { id: "education", label: "Education", count: displayImages.filter(img => img.category === "education").length },
    { id: "healthcare", label: "Healthcare", count: displayImages.filter(img => img.category === "healthcare").length },
    { id: "women", label: "Women Empowerment", count: displayImages.filter(img => img.category === "women").length },
    { id: "heritage", label: "Heritage", count: displayImages.filter(img => img.category === "heritage").length },
    { id: "infrastructure", label: "Infrastructure", count: displayImages.filter(img => img.category === "infrastructure").length },
    { id: "food", label: "Food Security", count: displayImages.filter(img => img.category === "food").length },
    { id: "environment", label: "Environment", count: displayImages.filter(img => img.category === "environment").length },
  ]

  const filteredImages = displayImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (image.tags && image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Impact Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the stories of change and transformation through our photo gallery. 
            Every image represents lives touched and communities empowered.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and Search */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {image.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{image.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {image.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(image.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src={image.image}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{image.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {image.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {image.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(image.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {image.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No photos found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
