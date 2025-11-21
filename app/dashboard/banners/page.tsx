"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Layers, Upload, X, Image as ImageIcon, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface Banner {
  _id?: string
  image: string
  order?: number
  active?: boolean
  createdAt?: string
}

export default function DashboardBannersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoadingBanners, setIsLoadingBanners] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [formData, setFormData] = useState<Banner>({
    image: "",
    order: 0,
    active: true,
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
      fetchBanners()
    }
  }, [user])

  const fetchBanners = async () => {
    setIsLoadingBanners(true)
    try {
      // In a real app, this would fetch from your API
      // For now, we'll use localStorage
      const storedBanners = localStorage.getItem("banners")
      if (storedBanners) {
        const parsedBanners = JSON.parse(storedBanners)
        // Sort by order
        const sortedBanners = parsedBanners.sort((a: Banner, b: Banner) => (a.order || 0) - (b.order || 0))
        setBanners(sortedBanners)
      }
    } catch (error) {
      console.error("Error fetching banners:", error)
    } finally {
      setIsLoadingBanners(false)
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

    if (!formData.image) {
      alert("Please upload an image")
      return
    }

    try {
      let imageUrl = formData.image

      // If there's a new image file, upload it
      if (imageFile) {
        // In a real app, upload to your server/cloud storage
        // For now, we'll use the data URL
        imageUrl = imagePreview || formData.image
      }

      const bannerData: Banner = {
        ...formData,
        image: imageUrl,
      }

      if (editingBanner?._id) {
        // Update existing banner
        const updatedBanners = banners.map(banner =>
          banner._id === editingBanner._id ? { ...bannerData, _id: editingBanner._id } : banner
        )
        setBanners(updatedBanners)
        localStorage.setItem("banners", JSON.stringify(updatedBanners))
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('bannersUpdated'))
      } else {
        // Create new banner
        const newBanner: Banner = {
          ...bannerData,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          order: formData.order || banners.length,
        }
        const updatedBanners = [...banners, newBanner]
        setBanners(updatedBanners)
        localStorage.setItem("banners", JSON.stringify(updatedBanners))
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('bannersUpdated'))
      }

      // Reset form
      setFormData({
        image: "",
        order: banners.length,
        active: true,
      })
      setImagePreview(null)
      setImageFile(null)
      setEditingBanner(null)
      setShowForm(false)
      fetchBanners() // Refresh to get sorted order
      alert(editingBanner ? "Banner updated successfully!" : "Banner created successfully!")
    } catch (error) {
      console.error("Error saving banner:", error)
      alert("Error saving banner. Please try again.")
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData(banner)
    setImagePreview(banner.image)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) {
      return
    }

    const updatedBanners = banners.filter(banner => banner._id !== bannerId)
    setBanners(updatedBanners)
    localStorage.setItem("banners", JSON.stringify(updatedBanners))
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('bannersUpdated'))
    alert("Banner deleted successfully!")
  }

  const handleCancel = () => {
    setFormData({
      image: "",
      order: banners.length,
      active: true,
    })
    setImagePreview(null)
    setImageFile(null)
    setEditingBanner(null)
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

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Banners Management
                </h1>
                <p className="text-muted-foreground">
                  Create and manage homepage hero banners
                </p>
              </div>
              <Button onClick={() => {
                setShowForm(true)
                setEditingBanner(null)
                setFormData({
                  image: "",
                  order: banners.length,
                  active: true,
                })
                setImagePreview(null)
                setImageFile(null)
              }}>
                <Layers className="h-4 w-4 mr-2" />
                Add New Banner
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingBanner ? "Edit Banner" : "Create New Banner"}</CardTitle>
                <CardDescription>Upload an image for the homepage hero section</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="image">Banner Image *</Label>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative w-full h-96 rounded-lg overflow-hidden border border-border">
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
                          className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Order */}
                  <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      min="0"
                      value={formData.order || 0}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      placeholder="Display order (lower numbers appear first)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower numbers will appear first in the hero slider
                    </p>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active !== false}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="active">Active (show on homepage)</Label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingBanner ? "Update Banner" : "Create Banner"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Banners List */}
          <Card>
            <CardHeader>
              <CardTitle>All Banners</CardTitle>
              <CardDescription>Manage your homepage hero banners</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBanners ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading banners...</p>
                </div>
              ) : banners.length === 0 ? (
                <div className="text-center py-12">
                  <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No banners found</h3>
                  <p className="text-muted-foreground mb-4">Create your first banner to display on the homepage</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Layers className="h-4 w-4 mr-2" />
                    Add Banner
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {banners.map((banner) => (
                    <Card key={banner._id} className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={banner.image || "/placeholder.svg"}
                          alt="Banner"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          {banner.active !== false && (
                            <Badge className="bg-green-600 text-white">Active</Badge>
                          )}
                          <Badge className="bg-primary text-white">Order: {banner.order || 0}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEdit(banner)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDelete(banner._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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

