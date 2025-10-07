"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  GraduationCap,
  Stethoscope,
  Home,
  Utensils,
  HandHeart,
  Globe,
  Heart,
  CreditCard,
  Smartphone,
  Building,
  X,
  Upload,
  Image as ImageIcon,
  Calendar,
  User,
  Mail,
  Phone,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react"

interface DonationFormPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}

const donationCategories = [
  {
    id: "education",
    name: "Education & Skills",
    icon: GraduationCap,
    description: "Support digital learning centers and vocational training",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    icon: Stethoscope,
    description: "Mobile health clinics and preventive care",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "food",
    name: "Food Security",
    icon: Utensils,
    description: "Community kitchens and nutrition programs",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "shelter",
    name: "Shelter & Housing",
    icon: Home,
    description: "Safe housing and infrastructure development",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "women",
    name: "Women Empowerment",
    icon: HandHeart,
    description: "Self-help groups and entrepreneurship training",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    id: "environment",
    name: "Environmental Conservation",
    icon: Globe,
    description: "Tree plantation and renewable energy projects",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
]

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI", icon: Smartphone },
  { id: "netbanking", name: "Net Banking", icon: Building },
]

const amountPresets = [500, 1000, 2500, 5000, 10000]

export function DonationFormPopup({ isOpen, onClose, onSubmit }: DonationFormPopupProps) {
  const [formData, setFormData] = useState({
    // Campaign Information
    title: "",
    description: "",
    aboutCampaign: "",
    goalAmount: "",
    raisedAmount: "0",
    backersCount: "0",
    daysLeft: "",
    
    // Campaign Details
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    location: "",
    organizer: "",
    category: "",
    categoryName: "",
    
    // Campaign Status
    status: "active", // active, completed, paused, cancelled
    progress: "0",
    
    // Expected Impact
    expectedBeneficiaries: "",
    expectedDuration: "",
    impactDescription: "",
    
    // Campaign Features
    taxDeductible: true,
    securePayment: true,
    transparentReporting: true,
    
    // Funding Milestones
    milestones: [
      { amount: "", description: "", completed: false },
      { amount: "", description: "", completed: false },
      { amount: "", description: "", completed: false },
    ],
    
    // Images
    images: [] as File[],
    featuredImage: null as File | null,
  })

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [imagePreviews])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Campaign title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Campaign description is required"
    }

    if (!formData.aboutCampaign.trim()) {
      newErrors.aboutCampaign = "About campaign section is required"
    }

    if (!formData.goalAmount.trim()) {
      newErrors.goalAmount = "Goal amount is required"
    } else if (isNaN(Number(formData.goalAmount)) || Number(formData.goalAmount) <= 0) {
      newErrors.goalAmount = "Please enter a valid goal amount"
    }

    if (!formData.endDate.trim()) {
      newErrors.endDate = "End date is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.organizer.trim()) {
      newErrors.organizer = "Organizer is required"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.expectedBeneficiaries.trim()) {
      newErrors.expectedBeneficiaries = "Expected beneficiaries is required"
    }

    if (!formData.expectedDuration.trim()) {
      newErrors.expectedDuration = "Expected duration is required"
    }

    if (!formData.impactDescription.trim()) {
      newErrors.impactDescription = "Impact description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 3) {
      alert("Maximum 3 images allowed")
      return
    }
    
    // Create preview URLs for the uploaded images
    const previewUrls = files.map(file => URL.createObjectURL(file))
    
    setFormData(prev => ({ ...prev, images: files }))
    setImagePreviews(previewUrls)
  }

  const removeImage = (index: number) => {
    // Clean up the preview URL to prevent memory leaks
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index])
    }
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const updateMilestone = (index: number, field: string, value: any) => {
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

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const selectedCategoryData = donationCategories.find(cat => cat.id === formData.category)
      
      // Prepare form data for API submission
      const apiFormData = new FormData()
      
      // Add all form fields
      apiFormData.append('title', formData.title)
      apiFormData.append('description', formData.description)
      apiFormData.append('aboutCampaign', formData.aboutCampaign)
      apiFormData.append('goalAmount', formData.goalAmount)
      apiFormData.append('raisedAmount', formData.raisedAmount)
      apiFormData.append('backersCount', formData.backersCount)
      apiFormData.append('daysLeft', formData.daysLeft)
      apiFormData.append('startDate', formData.startDate)
      apiFormData.append('endDate', formData.endDate)
      apiFormData.append('location', formData.location)
      apiFormData.append('organizer', formData.organizer)
      apiFormData.append('category', formData.category)
      apiFormData.append('categoryName', selectedCategoryData?.name || "")
      apiFormData.append('status', formData.status)
      apiFormData.append('progress', formData.progress)
      apiFormData.append('expectedBeneficiaries', formData.expectedBeneficiaries)
      apiFormData.append('expectedDuration', formData.expectedDuration)
      apiFormData.append('impactDescription', formData.impactDescription)
      apiFormData.append('taxDeductible', formData.taxDeductible.toString())
      apiFormData.append('securePayment', formData.securePayment.toString())
      apiFormData.append('transparentReporting', formData.transparentReporting.toString())
      apiFormData.append('milestones', JSON.stringify(formData.milestones))
      
      // Add images
      formData.images.forEach((file) => {
        apiFormData.append('images', file)
      })

      // Debug logging
      console.log('Submitting campaign with FormData:', {
        title: formData.title,
        goalAmount: formData.goalAmount,
        milestones: formData.milestones,
        imagesCount: formData.images.length
      })

      // Submit to API
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        body: apiFormData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`Server error: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('API Response:', result)

      if (result.success) {
        onSubmit(result.campaign)
        handleClose()
      } else {
        throw new Error(result.error || 'Failed to create campaign')
      }
    } catch (error) {
      console.error("Error submitting campaign:", error)
      alert(`Error creating campaign: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Clean up all preview URLs to prevent memory leaks
    imagePreviews.forEach(url => URL.revokeObjectURL(url))
    
    setFormData({
      title: "",
      description: "",
      aboutCampaign: "",
      goalAmount: "",
      raisedAmount: "0",
      backersCount: "0",
      daysLeft: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      location: "",
      organizer: "",
      category: "",
      categoryName: "",
      status: "active",
      progress: "0",
      expectedBeneficiaries: "",
      expectedDuration: "",
      impactDescription: "",
      taxDeductible: true,
      securePayment: true,
      transparentReporting: true,
      milestones: [
        { amount: "", description: "", completed: false },
        { amount: "", description: "", completed: false },
        { amount: "", description: "", completed: false },
      ],
      images: [],
      featuredImage: null,
    })
    setImagePreviews([])
    setErrors({})
    onClose()
  }

  const selectedCategory = donationCategories.find(cat => cat.id === formData.category)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="w-[98vw] max-w-none max-h-[90vh] overflow-y-auto"
        style={{ width: '98vw', maxWidth: 'none' }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Create New Donation Campaign
          </DialogTitle>
          <DialogDescription>
            Create a new donation campaign that will appear on the donations page
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4 inline mr-2" />
                Campaign Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Temple Restoration"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4 inline mr-2" />
                Short Description *
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="e.g., Earn Divine Blessings by Help to Rebuild Lord Hanuman Temple in Ayodhya Kshetra"
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="aboutCampaign" className="text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4 inline mr-2" />
                About This Campaign *
              </Label>
              <Textarea
                id="aboutCampaign"
                value={formData.aboutCampaign}
                onChange={(e) => handleInputChange("aboutCampaign", e.target.value)}
                placeholder="Join us in rebuilding the sacred Lord Hanuman Temple in Ayodhya Kshetra..."
                rows={4}
                className={errors.aboutCampaign ? "border-red-500" : ""}
              />
              {errors.aboutCampaign && (
                <p className="text-sm text-red-500">{errors.aboutCampaign}</p>
              )}
            </div>
          </div>

          {/* Campaign Goals & Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Goals & Progress</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="goalAmount" className="text-sm font-medium text-muted-foreground">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Goal Amount *
                </Label>
                <Input
                  id="goalAmount"
                  type="number"
                  value={formData.goalAmount}
                  onChange={(e) => handleInputChange("goalAmount", e.target.value)}
                  placeholder="100000"
                  className={errors.goalAmount ? "border-red-500" : ""}
                />
                {errors.goalAmount && (
                  <p className="text-sm text-red-500">{errors.goalAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="raisedAmount" className="text-sm font-medium text-muted-foreground">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Raised Amount
                </Label>
                <Input
                  id="raisedAmount"
                  type="number"
                  value={formData.raisedAmount}
                  onChange={(e) => handleInputChange("raisedAmount", e.target.value)}
                  placeholder="65441"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backersCount" className="text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4 inline mr-2" />
                  Backers Count
                </Label>
                <Input
                  id="backersCount"
                  type="number"
                  value={formData.backersCount}
                  onChange={(e) => handleInputChange("backersCount", e.target.value)}
                  placeholder="2522"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daysLeft" className="text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Days Left
                </Label>
                <Input
                  id="daysLeft"
                  type="number"
                  value={formData.daysLeft}
                  onChange={(e) => handleInputChange("daysLeft", e.target.value)}
                  placeholder="279"
                />
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Details</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  End Date *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-muted-foreground">
                  <Globe className="h-4 w-4 inline mr-2" />
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Ayodhya, Uttar Pradesh"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer" className="text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4 inline mr-2" />
                  Organizer *
                </Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => handleInputChange("organizer", e.target.value)}
                  placeholder="Ayodhya Temple Trust"
                  className={errors.organizer ? "border-red-500" : ""}
                />
                {errors.organizer && (
                  <p className="text-sm text-red-500">{errors.organizer}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-muted-foreground">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {donationCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-muted-foreground">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Completed
                      </div>
                    </SelectItem>
                    <SelectItem value="paused">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        Paused
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Cancelled
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Expected Impact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Expected Impact</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="expectedBeneficiaries" className="text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4 inline mr-2" />
                  Expected Beneficiaries *
                </Label>
                <Input
                  id="expectedBeneficiaries"
                  value={formData.expectedBeneficiaries}
                  onChange={(e) => handleInputChange("expectedBeneficiaries", e.target.value)}
                  placeholder="5,000 People"
                  className={errors.expectedBeneficiaries ? "border-red-500" : ""}
                />
                {errors.expectedBeneficiaries && (
                  <p className="text-sm text-red-500">{errors.expectedBeneficiaries}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedDuration" className="text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Expected Duration *
                </Label>
                <Input
                  id="expectedDuration"
                  value={formData.expectedDuration}
                  onChange={(e) => handleInputChange("expectedDuration", e.target.value)}
                  placeholder="12 months"
                  className={errors.expectedDuration ? "border-red-500" : ""}
                />
                {errors.expectedDuration && (
                  <p className="text-sm text-red-500">{errors.expectedDuration}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impactDescription" className="text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4 inline mr-2" />
                Impact Description *
              </Label>
              <Textarea
                id="impactDescription"
                value={formData.impactDescription}
                onChange={(e) => handleInputChange("impactDescription", e.target.value)}
                placeholder="This restoration will benefit thousands of devotees who visit the temple annually, preserving our cultural heritage for future generations."
                rows={3}
                className={errors.impactDescription ? "border-red-500" : ""}
              />
              {errors.impactDescription && (
                <p className="text-sm text-red-500">{errors.impactDescription}</p>
              )}
            </div>
          </div>

          {/* Campaign Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Features</h3>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxDeductible"
                  checked={formData.taxDeductible}
                  onCheckedChange={(checked) => handleInputChange("taxDeductible", checked)}
                />
                <Label htmlFor="taxDeductible" className="text-sm">
                  Tax-deductible donation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="securePayment"
                  checked={formData.securePayment}
                  onCheckedChange={(checked) => handleInputChange("securePayment", checked)}
                />
                <Label htmlFor="securePayment" className="text-sm">
                  Secure payment processing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transparentReporting"
                  checked={formData.transparentReporting}
                  onCheckedChange={(checked) => handleInputChange("transparentReporting", checked)}
                />
                <Label htmlFor="transparentReporting" className="text-sm">
                  Transparent reporting
                </Label>
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
                    <Label className="text-sm font-medium text-muted-foreground">
                      Milestone {index + 1} Amount
                    </Label>
                    <Input
                      type="number"
                      value={milestone.amount}
                      onChange={(e) => updateMilestone(index, "amount", e.target.value)}
                      placeholder="25000"
                    />
                  </div>
                  <div className="flex-2 space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Description
                    </Label>
                    <Input
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, "description", e.target.value)}
                      placeholder="Complete foundation restoration"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={milestone.completed}
                      onCheckedChange={(checked) => updateMilestone(index, "completed", checked)}
                    />
                    <Label className="text-sm">Completed</Label>
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

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images (Optional)</h3>
            <div className="space-y-4">
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
                  Upload Images (Max 3)
                </Button>
                <span className="text-sm text-muted-foreground">
                  {formData.images.length}/3 images selected
                </span>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        {imagePreviews[index] ? (
                          <img
                            src={imagePreviews[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
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

          {/* Campaign Summary */}
          {(formData.title || formData.goalAmount) && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Campaign Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.title && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Campaign Title:</span>
                    <p className="text-lg font-semibold">{formData.title}</p>
                  </div>
                )}
                {formData.description && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Description:</span>
                    <p className="text-sm mt-1">{formData.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {formData.goalAmount && (
                    <div className="flex justify-between">
                      <span>Goal Amount:</span>
                      <span className="font-bold text-lg">₹{parseInt(formData.goalAmount).toLocaleString()}</span>
                    </div>
                  )}
                  {formData.raisedAmount && (
                    <div className="flex justify-between">
                      <span>Raised Amount:</span>
                      <span className="font-bold text-green-600">₹{parseInt(formData.raisedAmount).toLocaleString()}</span>
                    </div>
                  )}
                  {formData.backersCount && (
                    <div className="flex justify-between">
                      <span>Backers:</span>
                      <span className="font-semibold">{formData.backersCount}</span>
                    </div>
                  )}
                  {formData.daysLeft && (
                    <div className="flex justify-between">
                      <span>Days Left:</span>
                      <span className="font-semibold">{formData.daysLeft}</span>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-sm">{formData.location}</span>
                    </div>
                  )}
                  {formData.organizer && (
                    <div className="flex justify-between">
                      <span>Organizer:</span>
                      <span className="text-sm">{formData.organizer}</span>
                    </div>
                  )}
                  {selectedCategory && (
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <selectedCategory.icon className="h-3 w-3" />
                        {selectedCategory.name}
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge 
                      variant={formData.status === 'active' ? 'default' : formData.status === 'completed' ? 'secondary' : 'destructive'}
                    >
                      {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                {formData.expectedBeneficiaries && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Expected Impact:</span>
                    <p className="text-sm mt-1">{formData.expectedBeneficiaries} will benefit • {formData.expectedDuration}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
