"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, BookOpen, Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface Blog {
  _id?: string
  title: string
  subtitle: string
  image: string
  date: string
  author: string
  category: string
  createdAt?: string
}

export default function DashboardBlogsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [formData, setFormData] = useState<Blog>({
    title: "",
    subtitle: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
    author: "Anshika Foundation",
    category: "Education",
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
      fetchBlogs()
    }
  }, [user])

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true)
    try {
      // In a real app, this would fetch from your API
      // For now, we'll use localStorage
      const storedBlogs = localStorage.getItem("blogs")
      if (storedBlogs) {
        setBlogs(JSON.parse(storedBlogs))
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setIsLoadingBlogs(false)
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

      // If there's a new image file, upload it
      if (imageFile) {
        // In a real app, upload to your server/cloud storage
        // For now, we'll use the data URL
        imageUrl = imagePreview || formData.image
      }

      const blogData: Blog = {
        ...formData,
        image: imageUrl,
      }

      if (editingBlog?._id) {
        // Update existing blog
        const updatedBlogs = blogs.map(blog =>
          blog._id === editingBlog._id ? { ...blogData, _id: editingBlog._id } : blog
        )
        setBlogs(updatedBlogs)
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      } else {
        // Create new blog
        const newBlog: Blog = {
          ...blogData,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        const updatedBlogs = [newBlog, ...blogs]
        setBlogs(updatedBlogs)
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      }

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        image: "",
        date: new Date().toISOString().split('T')[0],
        author: "Anshika Foundation",
        category: "Education",
      })
      setImagePreview(null)
      setImageFile(null)
      setEditingBlog(null)
      setShowForm(false)
      alert(editingBlog ? "Blog updated successfully!" : "Blog created successfully!")
    } catch (error) {
      console.error("Error saving blog:", error)
      alert("Error saving blog. Please try again.")
    }
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData(blog)
    setImagePreview(blog.image)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return
    }

    const updatedBlogs = blogs.filter(blog => blog._id !== blogId)
    setBlogs(updatedBlogs)
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
    alert("Blog deleted successfully!")
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      subtitle: "",
      image: "",
      date: new Date().toISOString().split('T')[0],
      author: "Anshika Foundation",
      category: "Education",
    })
    setImagePreview(null)
    setImageFile(null)
    setEditingBlog(null)
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

  const categories = ["Education", "Healthcare", "Environment", "Community", "General"]

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Blogs Management
                </h1>
                <p className="text-muted-foreground">
                  Create and manage blog posts
                </p>
              </div>
              <Button onClick={() => {
                setShowForm(true)
                setEditingBlog(null)
                setFormData({
                  title: "",
                  subtitle: "",
                  image: "",
                  date: new Date().toISOString().split('T')[0],
                  author: "Anshika Foundation",
                  category: "Education",
                })
                setImagePreview(null)
                setImageFile(null)
              }}>
                <BookOpen className="h-4 w-4 mr-2" />
                Create New Blog
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</CardTitle>
                <CardDescription>Fill in the details to create a new blog post</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="image">Blog Image</Label>
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

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter blog title"
                      required
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <Label htmlFor="subtitle">Subtitle *</Label>
                    <Textarea
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Enter blog subtitle/description"
                      rows={3}
                      required
                    />
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

                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Enter author name"
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingBlog ? "Update Blog" : "Create Blog"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Blogs List */}
          <Card>
            <CardHeader>
              <CardTitle>All Blogs</CardTitle>
              <CardDescription>Manage your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBlogs ? (
                <div className="text-center py-8">
                  <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading blogs...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
                  <p className="text-muted-foreground mb-4">Create your first blog post to get started</p>
                  <Button onClick={() => setShowForm(true)}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Blog
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <Card key={blog._id} className="overflow-hidden group hover:shadow-lg transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-primary text-white">{blog.category}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{blog.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <User className="h-4 w-4" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEdit(blog)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDelete(blog._id!)}
                          >
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

