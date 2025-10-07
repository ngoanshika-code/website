"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar as CalendarIcon,
  User,
  CreditCard,
  Heart,
  GraduationCap,
  Stethoscope,
  Home,
  Utensils,
  HandHeart,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  X,
  ChevronDown,
  Upload,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { DonationFormPopup } from "@/components/donation-form-popup"

// Edit Campaign Form Component
function EditCampaignForm({ campaign, onClose, onSave }) {
  const [formData, setFormData] = useState({
    // Campaign Information
    title: campaign.title || '',
    description: campaign.description || '',
    aboutCampaign: campaign.aboutCampaign || '',
    goalAmount: campaign.goalAmount || 0,
    raisedAmount: campaign.raisedAmount || 0,
    backersCount: campaign.backersCount || 0,
    daysLeft: campaign.daysLeft || 0,
    
    // Campaign Details
    startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
    location: campaign.location || '',
    organizer: campaign.organizer || '',
    category: campaign.category || '',
    categoryName: campaign.categoryName || '',
    
    // Campaign Status
    status: campaign.status || 'active',
    progress: campaign.progress || 0,
    
    // Expected Impact
    expectedBeneficiaries: campaign.expectedBeneficiaries || '',
    expectedDuration: campaign.expectedDuration || '',
    impactDescription: campaign.impactDescription || '',
    
    // Campaign Features
    taxDeductible: campaign.taxDeductible !== undefined ? campaign.taxDeductible : true,
    securePayment: campaign.securePayment !== undefined ? campaign.securePayment : true,
    transparentReporting: campaign.transparentReporting !== undefined ? campaign.transparentReporting : true,
    
    // Funding Milestones
    milestones: campaign.milestones || [
      { amount: "", description: "", completed: false },
      { amount: "", description: "", completed: false },
      { amount: "", description: "", completed: false },
    ],
    
    // Images
    images: campaign.images || [],
    featuredImage: campaign.featuredImage || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newImages, setNewImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [imagesToRemove, setImagesToRemove] = useState([])

  const categories = [
    { value: 'education', label: 'Education & Skills' },
    { value: 'healthcare', label: 'Healthcare & Wellness' },
    { value: 'food', label: 'Food Security' },
    { value: 'shelter', label: 'Shelter & Housing' },
    { value: 'women', label: 'Women Empowerment' },
    { value: 'environment', label: 'Environmental Conservation' },
  ]

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'paused', label: 'Paused' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateMilestone = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }))
  }

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { amount: "", description: "", completed: false }]
    }))
  }

  const removeMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length + formData.images.length + newImages.length > 3) {
      alert("Maximum 3 images allowed")
      return
    }
    
    const previewUrls = files.map(file => URL.createObjectURL(file))
    
    setNewImages(prev => [...prev, ...files])
    setImagePreviews(prev => [...prev, ...previewUrls])
  }

  const removeExistingImage = (index) => {
    const imageToRemove = formData.images[index]
    setImagesToRemove(prev => [...prev, imageToRemove])
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      featuredImage: prev.featuredImage === imageToRemove ? (prev.images[0] || '') : prev.featuredImage
    }))
  }

  const removeNewImage = (index) => {
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index])
    }
    
    setNewImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const setFeaturedImage = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: imageUrl
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Map category value to categoryName
      const selectedCategory = categories.find(cat => cat.value === formData.category)
      
      // Prepare FormData for image uploads
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('aboutCampaign', formData.aboutCampaign)
      formDataToSend.append('goalAmount', formData.goalAmount.toString())
      formDataToSend.append('raisedAmount', formData.raisedAmount.toString())
      formDataToSend.append('backersCount', formData.backersCount.toString())
      formDataToSend.append('daysLeft', formData.daysLeft.toString())
      formDataToSend.append('startDate', formData.startDate)
      formDataToSend.append('endDate', formData.endDate)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('organizer', formData.organizer)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('categoryName', selectedCategory?.label || formData.categoryName)
      formDataToSend.append('status', formData.status)
      formDataToSend.append('progress', formData.progress.toString())
      formDataToSend.append('expectedBeneficiaries', formData.expectedBeneficiaries)
      formDataToSend.append('expectedDuration', formData.expectedDuration)
      formDataToSend.append('impactDescription', formData.impactDescription)
      formDataToSend.append('taxDeductible', formData.taxDeductible.toString())
      formDataToSend.append('securePayment', formData.securePayment.toString())
      formDataToSend.append('transparentReporting', formData.transparentReporting.toString())
      formDataToSend.append('milestones', JSON.stringify(formData.milestones))
      
      // Add existing images
      formDataToSend.append('existingImages', JSON.stringify(formData.images))
      formDataToSend.append('featuredImage', formData.featuredImage)
      formDataToSend.append('imagesToRemove', JSON.stringify(imagesToRemove))
      
      // Add new images
      newImages.forEach((file) => {
        formDataToSend.append('newImages', file)
      })

      const response = await fetch(`/api/campaigns/${campaign._id}`, {
        method: 'PUT',
        body: formDataToSend,
      })

      if (response.ok) {
        const result = await response.json()
        onSave(result.campaign)
      } else {
        const result = await response.json()
        alert(`Failed to update campaign: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating campaign:', error)
      alert('Error updating campaign. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campaign Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="title">Campaign Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description *</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutCampaign">About This Campaign *</Label>
          <Textarea
            id="aboutCampaign"
            value={formData.aboutCampaign}
            onChange={(e) => handleInputChange('aboutCampaign', e.target.value)}
            rows={4}
            required
          />
        </div>
      </div>

      {/* Campaign Goals & Progress */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Goals & Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="goalAmount">Goal Amount (₹) *</Label>
            <Input
              id="goalAmount"
              type="number"
              value={formData.goalAmount}
              onChange={(e) => handleInputChange('goalAmount', parseInt(e.target.value) || 0)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="raisedAmount">Raised Amount (₹)</Label>
            <Input
              id="raisedAmount"
              type="number"
              value={formData.raisedAmount}
              onChange={(e) => handleInputChange('raisedAmount', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backersCount">Backers Count</Label>
            <Input
              id="backersCount"
              type="number"
              value={formData.backersCount}
              onChange={(e) => handleInputChange('backersCount', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="daysLeft">Days Left</Label>
            <Input
              id="daysLeft"
              type="number"
              value={formData.daysLeft}
              onChange={(e) => handleInputChange('daysLeft', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizer">Organizer *</Label>
            <Input
              id="organizer"
              value={formData.organizer}
              onChange={(e) => handleInputChange('organizer', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
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
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Expected Impact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Expected Impact</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expectedBeneficiaries">Expected Beneficiaries *</Label>
            <Input
              id="expectedBeneficiaries"
              value={formData.expectedBeneficiaries}
              onChange={(e) => handleInputChange('expectedBeneficiaries', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedDuration">Expected Duration *</Label>
            <Input
              id="expectedDuration"
              value={formData.expectedDuration}
              onChange={(e) => handleInputChange('expectedDuration', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="impactDescription">Impact Description *</Label>
          <Textarea
            id="impactDescription"
            value={formData.impactDescription}
            onChange={(e) => handleInputChange('impactDescription', e.target.value)}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Campaign Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <input
              type="checkbox"
              id="taxDeductible"
              checked={formData.taxDeductible}
              onChange={(e) => handleInputChange('taxDeductible', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="taxDeductible" className="text-sm">Tax-deductible donation</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <input
              type="checkbox"
              id="securePayment"
              checked={formData.securePayment}
              onChange={(e) => handleInputChange('securePayment', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="securePayment" className="text-sm">Secure payment processing</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <input
              type="checkbox"
              id="transparentReporting"
              checked={formData.transparentReporting}
              onChange={(e) => handleInputChange('transparentReporting', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="transparentReporting" className="text-sm">Transparent reporting</Label>
          </div>
        </div>
      </div>

      {/* Funding Milestones */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Funding Milestones</h3>
          <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Milestone {index + 1} Amount</Label>
                <Input
                  type="number"
                  value={milestone.amount}
                  onChange={(e) => updateMilestone(index, "amount", e.target.value)}
                  placeholder="25000"
                />
              </div>
              <div className="flex-2 space-y-2">
                <Label>Description</Label>
                <Input
                  value={milestone.description}
                  onChange={(e) => updateMilestone(index, "description", e.target.value)}
                  placeholder="Complete foundation restoration"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={(e) => updateMilestone(index, "completed", e.target.checked)}
                  className="rounded"
                />
                <Label>Completed</Label>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeMilestone(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Image Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Images</h3>
        
        {/* Existing Images */}
        {formData.images && formData.images.length > 0 && (
          <div className="space-y-3">
            <Label>Current Images</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`Campaign image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFeaturedImage(imageUrl)}
                      className={`h-6 w-6 p-0 ${formData.featuredImage === imageUrl ? 'bg-primary text-primary-foreground' : 'bg-white'}`}
                      title="Set as featured image"
                    >
                      ⭐
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeExistingImage(index)}
                      className="h-6 w-6 p-0"
                      title="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  {formData.featuredImage === imageUrl && (
                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                      Featured
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Image Upload */}
        <div className="space-y-3">
          <Label>Add New Images</Label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('imageUpload')?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Images (Max 3 total)
            </Button>
            <span className="text-sm text-muted-foreground">
              {formData.images.length + newImages.length}/3 images
            </span>
          </div>

          {/* New Image Previews */}
          {newImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {newImages.map((file, index) => (
                <div key={index} className="relative">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    {imagePreviews[index] && (
                      <img
                        src={imagePreviews[index]}
                        alt={`New image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => removeNewImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <p className="text-xs text-center mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Campaign'}
        </Button>
      </div>
    </form>
  )
}

export default function DonationsManagementPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")
  const [organizerFilter, setOrganizerFilter] = useState("")
  const [startDateFilter, setStartDateFilter] = useState(null)
  const [endDateFilter, setEndDateFilter] = useState(null)
  const [minGoalAmount, setMinGoalAmount] = useState("")
  const [maxGoalAmount, setMaxGoalAmount] = useState("")
  const [minRaisedAmount, setMinRaisedAmount] = useState("")
  const [maxRaisedAmount, setMaxRaisedAmount] = useState("")
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false)

  const fetchCampaigns = async () => {
    setIsLoadingCampaigns(true)
    try {
      const response = await fetch('/api/campaigns')
      const result = await response.json()
      
      if (result.success) {
        setCampaigns(result.campaigns)
        console.log("Campaigns fetched:", result.campaigns)
      } else {
        console.error("Failed to fetch campaigns:", result.error)
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setIsLoadingCampaigns(false)
    }
  }

  useEffect(() => {
    // Check if user is logged in
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

    // Fetch campaigns when component loads
    fetchCampaigns()
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
          <p className="text-muted-foreground">Loading donations...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock donation data
  const donations = [
    {
      id: "DON001",
      donorName: "Priya Sharma",
      donorEmail: "priya.sharma@email.com",
      donorPhone: "+91 98765 43210",
      amount: 5000,
      category: "education",
      categoryName: "Education & Skills",
      status: "completed",
      paymentMethod: "card",
      transactionId: "TXN123456789",
      paymentId: "pay_abc123def456",
      date: "2024-01-15",
      message: "Supporting digital learning centers for underprivileged children",
      anonymous: false,
      recurring: false,
    },
    {
      id: "DON002",
      donorName: "Rajesh Kumar",
      donorEmail: "rajesh.kumar@email.com",
      donorPhone: "+91 87654 32109",
      amount: 2500,
      category: "healthcare",
      categoryName: "Healthcare & Wellness",
      status: "completed",
      paymentMethod: "upi",
      transactionId: "TXN987654321",
      paymentId: "pay_xyz789abc123",
      date: "2024-01-14",
      message: "Monthly recurring donation for health camps",
      anonymous: false,
      recurring: true,
    },
    {
      id: "DON003",
      donorName: "Anonymous",
      donorEmail: "anonymous@email.com",
      donorPhone: "+91 76543 21098",
      amount: 10000,
      category: "general",
      categoryName: "General Fund",
      status: "completed",
      paymentMethod: "netbanking",
      transactionId: "TXN456789123",
      paymentId: "pay_def456ghi789",
      date: "2024-01-13",
      message: "",
      anonymous: true,
      recurring: false,
    },
    {
      id: "DON004",
      donorName: "Anita Devi",
      donorEmail: "anita.devi@email.com",
      donorPhone: "+91 65432 10987",
      amount: 3000,
      category: "women",
      categoryName: "Women Empowerment",
      status: "pending",
      paymentMethod: "card",
      transactionId: "TXN789123456",
      paymentId: "",
      date: "2024-01-12",
      message: "Supporting women entrepreneurship programs",
      anonymous: false,
      recurring: false,
    },
    {
      id: "DON005",
      donorName: "Suresh Patel",
      donorEmail: "suresh.patel@email.com",
      donorPhone: "+91 54321 09876",
      amount: 1500,
      category: "food",
      categoryName: "Food Security",
      status: "failed",
      paymentMethod: "upi",
      transactionId: "TXN321654987",
      paymentId: "",
      date: "2024-01-11",
      message: "Fighting hunger through nutrition programs",
      anonymous: false,
      recurring: false,
    },
    {
      id: "DON006",
      donorName: "Meera Singh",
      donorEmail: "meera.singh@email.com",
      donorPhone: "+91 43210 98765",
      amount: 7500,
      category: "shelter",
      categoryName: "Shelter & Housing",
      status: "completed",
      paymentMethod: "card",
      transactionId: "TXN654987321",
      paymentId: "pay_jkl012mno345",
      date: "2024-01-10",
      message: "Providing safe housing for families",
      anonymous: false,
      recurring: false,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>
      case "completed":
        return <Badge variant="default" className="bg-blue-500">Completed</Badge>
      case "paused":
        return <Badge variant="secondary" className="bg-yellow-500">Paused</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "education":
        return <GraduationCap className="h-4 w-4 text-blue-500" />
      case "healthcare":
        return <Stethoscope className="h-4 w-4 text-green-500" />
      case "food":
        return <Utensils className="h-4 w-4 text-orange-500" />
      case "shelter":
        return <Home className="h-4 w-4 text-purple-500" />
      case "women":
        return <HandHeart className="h-4 w-4 text-pink-500" />
      default:
        return <Heart className="h-4 w-4 text-red-500" />
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "upi":
        return <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center">U</div>
      case "netbanking":
        return <div className="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">N</div>
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    // Search filter
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Status filter
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter
    
    // Location filter
    const matchesLocation = !locationFilter || campaign.location.toLowerCase().includes(locationFilter.toLowerCase())
    
    // Organizer filter
    const matchesOrganizer = !organizerFilter || campaign.organizer.toLowerCase().includes(organizerFilter.toLowerCase())
    
    // Date range filters
    const campaignStartDate = new Date(campaign.startDate || campaign.createdAt)
    const campaignEndDate = new Date(campaign.endDate)
    
    const matchesStartDate = !startDateFilter || campaignStartDate >= startDateFilter
    const matchesEndDate = !endDateFilter || campaignEndDate <= endDateFilter
    
    // Amount range filters
    const goalAmount = campaign.goalAmount || 0
    const raisedAmount = campaign.raisedAmount || 0
    
    const matchesMinGoal = !minGoalAmount || goalAmount >= parseInt(minGoalAmount)
    const matchesMaxGoal = !maxGoalAmount || goalAmount <= parseInt(maxGoalAmount)
    const matchesMinRaised = !minRaisedAmount || raisedAmount >= parseInt(minRaisedAmount)
    const matchesMaxRaised = !maxRaisedAmount || raisedAmount <= parseInt(maxRaisedAmount)
    
    return matchesSearch && matchesStatus && matchesCategory && matchesLocation && 
           matchesOrganizer && matchesStartDate && matchesEndDate &&
           matchesMinGoal && matchesMaxGoal && matchesMinRaised && matchesMaxRaised
  })

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign)
    setIsViewDialogOpen(true)
  }

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign)
    setIsEditDialogOpen(true)
  }

  const handleDeleteCampaign = async (campaign) => {
    if (!confirm(`Are you sure you want to delete the campaign "${campaign.title}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/campaigns/${campaign._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Remove campaign from local state
        setCampaigns(campaigns.filter(c => c._id !== campaign._id))
        alert(`Campaign "${campaign.title}" deleted successfully!`)
      } else {
        const result = await response.json()
        alert(`Failed to delete campaign: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting campaign:', error)
      alert('Error deleting campaign. Please try again.')
    }
  }

  const handleCreateDonation = async (campaignData) => {
    try {
      console.log("New campaign created:", campaignData)
      alert(`Campaign "${campaignData.title}" created successfully!`)
      
      // Refresh the campaigns list
      await fetchCampaigns()
    } catch (error) {
      console.error("Error handling campaign creation:", error)
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setLocationFilter("")
    setOrganizerFilter("")
    setStartDateFilter(null)
    setEndDateFilter(null)
    setMinGoalAmount("")
    setMaxGoalAmount("")
    setMinRaisedAmount("")
    setMaxRaisedAmount("")
  }

  // Calculate statistics from campaigns data
  const totalGoalAmount = campaigns.reduce((sum, campaign) => sum + (campaign.goalAmount || 0), 0)
  const totalRaisedAmount = campaigns.reduce((sum, campaign) => sum + (campaign.raisedAmount || 0), 0)
  const activeCampaigns = campaigns.filter(c => c.status === "active").length
  const completedCampaigns = campaigns.filter(c => c.status === "completed").length
  const pausedCampaigns = campaigns.filter(c => c.status === "paused").length
  const cancelledCampaigns = campaigns.filter(c => c.status === "cancelled").length

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Campaigns Management
                </h1>
                <p className="text-muted-foreground">
                  Manage all donation campaigns and their progress
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create a New Campaign
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Raised</p>
                    <p className="text-2xl font-bold">₹{totalRaisedAmount.toLocaleString()}</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                    <p className="text-2xl font-bold text-green-500">{activeCampaigns}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-blue-500">{completedCampaigns}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Campaigns</p>
                    <p className="text-2xl font-bold text-purple-500">{campaigns.length}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Filters */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Advanced Filters
                </CardTitle>
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search and Status Filters */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("all")}
                  >
                    All ({campaigns.length})
                  </Button>
                  <Button
                    variant={statusFilter === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("active")}
                  >
                    Active ({activeCampaigns})
                  </Button>
                  <Button
                    variant={statusFilter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("completed")}
                  >
                    Completed ({completedCampaigns})
                  </Button>
                  <Button
                    variant={statusFilter === "paused" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("paused")}
                  >
                    Paused ({pausedCampaigns})
                  </Button>
                </div>
              </div>

              {/* Category and Location Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="education">Education & Skills</SelectItem>
                      <SelectItem value="healthcare">Healthcare & Wellness</SelectItem>
                      <SelectItem value="food">Food Security</SelectItem>
                      <SelectItem value="shelter">Shelter & Housing</SelectItem>
                      <SelectItem value="women">Women Empowerment</SelectItem>
                      <SelectItem value="environment">Environmental Conservation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Organizer</Label>
                  <Input
                    placeholder="Filter by organizer..."
                    value={organizerFilter}
                    onChange={(e) => setOrganizerFilter(e.target.value)}
                  />
                </div>
              </div>

              {/* Date Range Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDateFilter ? startDateFilter.toLocaleDateString() : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDateFilter}
                        onSelect={setStartDateFilter}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDateFilter ? endDateFilter.toLocaleDateString() : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDateFilter}
                        onSelect={setEndDateFilter}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Amount Range Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Goal Amount Range</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min goal (₹)"
                      value={minGoalAmount}
                      onChange={(e) => setMinGoalAmount(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max goal (₹)"
                      value={maxGoalAmount}
                      onChange={(e) => setMaxGoalAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Raised Amount Range</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min raised (₹)"
                      value={minRaisedAmount}
                      onChange={(e) => setMinRaisedAmount(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max raised (₹)"
                      value={maxRaisedAmount}
                      onChange={(e) => setMaxRaisedAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>
                {filteredCampaigns.length} campaign(s) found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <Table className="min-w-[1000px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Goal Amount</TableHead>
                      <TableHead>Raised</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right min-w-[250px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingCampaigns ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            Loading campaigns...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredCampaigns.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <div className="text-center">
                            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
                            <p className="text-muted-foreground mb-4">
                              Try adjusting your search or filter criteria
                            </p>
                            <Button onClick={() => {
                              setSearchTerm("")
                              setStatusFilter("all")
                            }}>
                              Clear Filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign._id}>
                          <TableCell className="font-medium">
                            <div className="max-w-xs">
                              <div className="font-semibold truncate">{campaign.title}</div>
                              <div className="text-xs text-muted-foreground truncate">{campaign.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{campaign.organizer}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">₹{campaign.goalAmount?.toLocaleString() || 0}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-green-600">₹{campaign.raisedAmount?.toLocaleString() || 0}</div>
                            <div className="text-xs text-muted-foreground">{campaign.backersCount || 0} backers</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(campaign.category)}
                              <span className="text-sm">{campaign.categoryName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(campaign.status)}
                              {getStatusBadge(campaign.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{campaign.location}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{new Date(campaign.endDate).toLocaleDateString()}</div>
                            <div className="text-xs text-muted-foreground">{campaign.daysLeft || 0} days left</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewCampaign(campaign)}
                                className="h-8 px-3"
                                title="View Campaign Details"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCampaign(campaign)}
                                className="h-8 px-3"
                                title="Edit Campaign"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCampaign(campaign)}
                                className="h-8 px-3"
                                title="Delete Campaign"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Campaign Modal */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Campaign Details - {selectedCampaign?.title}</DialogTitle>
            <DialogDescription>
              Complete information about this campaign
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              {/* Campaign Image */}
              {selectedCampaign.featuredImage && (
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedCampaign.featuredImage}
                    alt={selectedCampaign.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Campaign Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Campaign Title</label>
                  <p className="text-lg font-semibold">{selectedCampaign.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Organizer</label>
                  <p className="text-lg">{selectedCampaign.organizer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(selectedCampaign.category)}
                    <span>{selectedCampaign.categoryName}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedCampaign.status)}
                    {getStatusBadge(selectedCampaign.status)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Goal Amount</label>
                  <p className="text-lg font-bold text-primary">₹{selectedCampaign.goalAmount?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Raised Amount</label>
                  <p className="text-lg font-bold text-green-600">₹{selectedCampaign.raisedAmount?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Progress</label>
                  <p className="text-lg">{selectedCampaign.progress || 0}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Backers</label>
                  <p className="text-lg">{selectedCampaign.backersCount || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-lg">{selectedCampaign.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Date</label>
                  <p className="text-lg">{new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Days Left</label>
                  <p className="text-lg">{selectedCampaign.daysLeft || 0} days</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                  <p className="text-lg">{new Date(selectedCampaign.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-lg mt-2 leading-relaxed">{selectedCampaign.description}</p>
              </div>

              {/* Milestones */}
              {selectedCampaign.milestones && selectedCampaign.milestones.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Milestones</label>
                  <div className="mt-2 space-y-2">
                    {selectedCampaign.milestones.map((milestone, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium">{milestone.title}</div>
                        <div className="text-sm text-muted-foreground">{milestone.description}</div>
                        <div className="text-sm text-muted-foreground">Target: ₹{milestone.targetAmount?.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEditCampaign(selectedCampaign)
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Campaign
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/donation/${selectedCampaign._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Public Page
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ width: '90%', minWidth: '1000px' }}>
          <DialogHeader>
            <DialogTitle>Edit Campaign - {selectedCampaign?.title}</DialogTitle>
            <DialogDescription>
              Update campaign information
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <EditCampaignForm 
              campaign={selectedCampaign}
              onClose={() => setIsEditDialogOpen(false)}
              onSave={(updatedCampaign) => {
                // Update the campaign in the local state
                setCampaigns(campaigns.map(c => 
                  c._id === updatedCampaign._id ? updatedCampaign : c
                ))
                setIsEditDialogOpen(false)
                alert('Campaign updated successfully!')
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Donation Dialog */}
      <DonationFormPopup
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateDonation}
      />
    </div>
  )
}

