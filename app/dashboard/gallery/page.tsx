"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Star,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Gallery Form Component
function GalleryForm({ galleryItem, onClose, onSave }) {
  const [formData, setFormData] = useState({
    category: galleryItem?.category || '',
    location: galleryItem?.location || '',
    date: galleryItem?.date ? new Date(galleryItem.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    tags: galleryItem?.tags?.join(', ') || '',
    featured: galleryItem?.featured || false,
    active: galleryItem?.active !== undefined ? galleryItem.active : true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(galleryItem?.image || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'women', label: 'Women Empowerment' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'food', label: 'Food Security' },
    { value: 'environment', label: 'Environment' },
    { value: 'other', label: 'Other' },
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      if (formData.category) {
        formDataToSend.append('category', formData.category)
      }
      if (formData.location) {
        formDataToSend.append('location', formData.location)
      }
      formDataToSend.append('date', formData.date)
      if (formData.tags) {
        formDataToSend.append('tags', formData.tags)
      }
      formDataToSend.append('featured', formData.featured.toString())
      formDataToSend.append('active', formData.active.toString())

      if (galleryItem) {
        // Update existing
        if (galleryItem.image) {
          formDataToSend.append('existingImage', galleryItem.image)
        }
        if (imageFile) {
          formDataToSend.append('newImage', imageFile)
        }

        const response = await fetch(`/api/gallery/${galleryItem._id}`, {
          method: 'PUT',
          body: formDataToSend,
        })

        if (response.ok) {
          const result = await response.json()
          onSave(result.gallery)
        } else {
          const result = await response.json()
          alert(`Failed to update gallery item: ${result.error || 'Unknown error'}`)
        }
      } else {
        // Create new
        if (imageFile) {
          formDataToSend.append('image', imageFile)
        }

        const response = await fetch('/api/gallery', {
          method: 'POST',
          body: formDataToSend,
        })

        if (response.ok) {
          const result = await response.json()
          onSave(result.gallery)
        } else {
          const result = await response.json()
          alert(`Failed to create gallery item: ${result.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error('Error saving gallery item:', error)
      alert('Error saving gallery item. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category || undefined} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter location (optional)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            placeholder="education, children, learning"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image')?.click()}
            className="w-full"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            {imageFile ? 'Change Image' : galleryItem ? 'Update Image' : 'Select Image (optional)'}
          </Button>
          {imagePreview && (
            <div className="relative h-48 w-full rounded-lg overflow-hidden mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => handleInputChange('active', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : galleryItem ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default function DashboardGalleryPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [galleryItems, setGalleryItems] = useState([])
  const [isLoadingGallery, setIsLoadingGallery] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const fetchGallery = async () => {
    setIsLoadingGallery(true)
    try {
      const response = await fetch('/api/gallery?active=false')
      const result = await response.json()
      
      if (result.success) {
        setGalleryItems(result.gallery)
      } else {
        console.error("Failed to fetch gallery:", result.error)
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setIsLoadingGallery(false)
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }

    fetchGallery()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'women', label: 'Women Empowerment' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'food', label: 'Food Security' },
    { value: 'environment', label: 'Environment' },
    { value: 'other', label: 'Other' },
  ]

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = searchTerm === "" || 
                         item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleEdit = (item) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (item) => {
    if (!confirm(`Are you sure you want to delete this gallery item?`)) {
      return
    }

    try {
      const response = await fetch(`/api/gallery/${item._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setGalleryItems(galleryItems.filter(i => i._id !== item._id))
        alert('Gallery item deleted successfully!')
      } else {
        const result = await response.json()
        alert(`Failed to delete: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      alert('Error deleting gallery item. Please try again.')
    }
  }

  const handleSave = async (savedItem) => {
    if (selectedItem) {
      setGalleryItems(galleryItems.map(i => i._id === savedItem._id ? savedItem : i))
    } else {
      setGalleryItems([savedItem, ...galleryItems])
    }
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    setSelectedItem(null)
    alert('Gallery item saved successfully!')
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
                  Gallery Management
                </h1>
                <p className="text-muted-foreground">
                  Manage gallery photos and images
                </p>
              </div>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Photo
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Photos</p>
                    <p className="text-2xl font-bold">{galleryItems.length}</p>
                  </div>
                  <ImageIcon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold text-green-500">
                      {galleryItems.filter(i => i.active).length}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Featured</p>
                    <p className="text-2xl font-bold text-yellow-500">
                      {galleryItems.filter(i => i.featured).length}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold text-purple-500">
                      {galleryItems.reduce((sum, i) => sum + (i.views || 0), 0)}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search gallery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={categoryFilter === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter(category.value)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          {isLoadingGallery ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No gallery items found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || categoryFilter !== 'all' ? 'Try adjusting your filters' : 'Create your first gallery item'}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Photo
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={item.image}
                      alt="Gallery image"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.featured && (
                        <Badge className="text-xs bg-yellow-500">
                          <Star className="h-3 w-3" />
                        </Badge>
                      )}
                      {!item.active && (
                        <Badge variant="destructive" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Photo</DialogTitle>
            <DialogDescription>
              Create a new gallery item
            </DialogDescription>
          </DialogHeader>
          <GalleryForm 
            galleryItem={null}
            onClose={() => setIsCreateDialogOpen(false)}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
            <DialogDescription>
              Update gallery item
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <GalleryForm 
              galleryItem={selectedItem}
              onClose={() => {
                setIsEditDialogOpen(false)
                setSelectedItem(null)
              }}
              onSave={handleSave}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

