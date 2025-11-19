"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Image as ImageIcon, Trash2, Calendar, FileImage } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface MediaItem {
  _id?: string
  title: string
  image: string
  category: string
  date: string
  type: "image" | "video" | "document"
  createdAt?: string
}

export default function DashboardMediaPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoadingMedia, setIsLoadingMedia] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos" | "documents">("all")

  const [formData, setFormData] = useState<MediaItem>({
    title: "",
    image: "",
    category: "General",
    date: new Date().toISOString().split('T')[0],
    type: "image",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      if (parsedUser.role !== 'admin') {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchMedia()
    }
  }, [user])

  const fetchMedia = async () => {
    setIsLoadingMedia(true)
    try {
      const storedMedia = localStorage.getItem("media")
      if (storedMedia) {
        setMediaItems(JSON.parse(storedMedia))
      }
    } catch (error) {
      console.error("Error fetching media:", error)
    } finally {
      setIsLoadingMedia(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = formData.image

      if (imageFile) {
        imageUrl = imagePreview || formData.image
      }

      const mediaData: MediaItem = {
        ...formData,
        image: imageUrl,
      }

      if (editingMedia?._id) {
        const updatedMedia = mediaItems.map(item =>
          item._id === editingMedia._id ? { ...mediaData, _id: editingMedia._id } : item
        )
        setMediaItems(updatedMedia)
        localStorage.setItem("media", JSON.stringify(updatedMedia))
      } else {
        const newMedia: MediaItem = {
          ...mediaData,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        const updatedMedia = [newMedia, ...mediaItems]
        setMediaItems(updatedMedia)
        localStorage.setItem("media", JSON.stringify(updatedMedia))
      }

      setFormData({
        title: "",
        image: "",
        category: "General",
        date: new Date().toISOString().split('T')[0],
        type: "image",
      })
      setImagePreview(null)
      setImageFile(null)
      setEditingMedia(null)
      setShowForm(false)
      alert(editingMedia ? "Media updated successfully!" : "Media uploaded successfully!")
    } catch (error) {
      console.error("Error saving media:", error)
      alert("Error saving media. Please try again.")
    }
  }

  const handleEdit = (media: MediaItem) => {
    setEditingMedia(media)
    setFormData(media)
    setImagePreview(media.image)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) {
      return
    }

    const updatedMedia = mediaItems.filter(item => item._id !== mediaId)
    setMediaItems(updatedMedia)
    localStorage.setItem("media", JSON.stringify(updatedMedia))
    alert("Media deleted successfully!")
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      image: "",
      category: "General",
      date: new Date().toISOString().split('T')[0],
      type: "image",
    })
    setImagePreview(null)
    setImageFile(null)
    setEditingMedia(null)
    setShowForm(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  const categories = ["General", "Education", "Healthcare", "Environment", "Community", "Events", "Reports"]
  const types = ["image", "video", "document"]

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
        return "🎥"
      case "document":
        return "📄"
      default:
        return "🖼️"
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Media Management
                </h1>
                <p className="text-muted-foreground">
                  Upload and manage media files (images, videos, documents)
                </p>
              </div>
              <Button onClick={() => {
                setShowForm(true)
                setEditingMedia(null)
                setFormData({
                  title: "",
                  image: "",
                  category: "General",
                  date: new Date().toISOString().split('T')[0],
                  type: "image",
                })
                setImagePreview(null)
                setImageFile(null)
              }}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingMedia ? "Edit Media" : "Upload New Media"}</CardTitle>
                <CardDescription>Upload images, videos, or documents to your media library</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="image">Media File *</Label>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImagePreview(null)
                              setImageFile(null)
                              setFormData({ ...formData, image: "" })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4, PDF up to 10MB</p>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*,video/*,.pdf"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter media title"
                      required
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <Label htmlFor="type">Media Type *</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as "image" | "video" | "document" })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingMedia ? "Update Media" : "Upload Media"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Filter Tabs */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
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
            </CardContent>
          </Card>

          {/* Media Grid */}
          <Card>
            <CardHeader>
              <CardTitle>All Media ({filteredMedia.length})</CardTitle>
              <CardDescription>Manage your media library</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingMedia ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading media...</p>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="text-center py-12">
                  <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No media found</h3>
                  <p className="text-muted-foreground mb-4">Upload your first media file to get started</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Media
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredMedia.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                        <div className="relative w-full aspect-square overflow-hidden bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
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
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEdit(item)
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(item._id!)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

