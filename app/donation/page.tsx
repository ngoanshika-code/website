"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Utensils,
  Home,
  Stethoscope,
  CreditCard,
  Smartphone,
  Building,
  Users,
  GraduationCap,
  HandHeart,
  QrCode,
  Sprout,
  CheckCircle,
  Upload,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

interface Campaign {
  _id: string
  title: string
  description: string
  goalAmount: number
  raisedAmount: number
  backersCount: number
  progress: number
  category: string
  categoryName: string
  status: string
  location: string
  organizer: string
  endDate: string
  daysLeft: number
  images: string[]
  featuredImage?: string
}

interface DonationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  amount: string
  customAmount: string
  message: string
  anonymous: boolean
  recurring: boolean
}

export default function DonationPage() {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState("500")
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState("education")
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false)
  const [donationStep, setDonationStep] = useState(1) // 1: Form, 2: Payment
  const [donationForm, setDonationForm] = useState<DonationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: "",
    customAmount: "",
    message: "",
    anonymous: false,
    recurring: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true)
  const [campaignError, setCampaignError] = useState<string | null>(null)
  const [qrCodeError, setQrCodeError] = useState(false)
  const [isGeneralDonationDialogOpen, setIsGeneralDonationDialogOpen] = useState(false)
  const [generalQrCodeError, setGeneralQrCodeError] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptFileName, setReceiptFileName] = useState<string>("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [receiptError, setReceiptError] = useState("")

  const predefinedAmounts = ["100", "500", "1000", "2500", "5000", "10000"]

  const fetchCampaigns = async () => {
    setIsLoadingCampaigns(true)
    setCampaignError(null)
    try {
      const response = await fetch('/api/campaigns')
      const result = await response.json()
      
      if (result.success) {
        setCampaigns(result.campaigns)
        console.log("Campaigns fetched:", result.campaigns)
      } else {
        setCampaignError("Failed to load campaigns")
        console.error("Failed to fetch campaigns:", result.error)
      }
    } catch (error) {
      setCampaignError("Error loading campaigns")
      console.error("Error fetching campaigns:", error)
    } finally {
      setIsLoadingCampaigns(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const handleDonateNow = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setDonationForm(prev => ({
      ...prev,
      amount: "500",
      customAmount: "",
    }))
    setDonationStep(1)
    setQrCodeError(false)
    setIsDonationDialogOpen(true)
  }

  const handleViewDetails = (campaign: Campaign) => {
    // Navigate to campaign details page
    router.push(`/donation/${campaign._id}`)
  }

  const handleGeneralDonate = () => {
    const amount = customAmount || selectedAmount
    if (!amount || parseInt(amount) < 100) {
      alert("Please enter a valid amount (minimum ₹100)")
      return
    }
    setGeneralQrCodeError(false)
    setIsGeneralDonationDialogOpen(true)
  }

  const handleNextButton = () => {
    // Validate all fields
    const errors: { [key: string]: string } = {}
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Phone number must be 10 digits"
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    }
    
    const amount = customAmount || selectedAmount
    if (!amount || parseInt(amount) < 100) {
      errors.amount = "Please select or enter a valid amount (minimum ₹100)"
    }
    
    setFormErrors(errors)
    
    if (Object.keys(errors).length > 0) {
      return
    }
    
    setIsPaymentModalOpen(true)
  }

  const handleFormSubmit = () => {
    // Validate form
    if (!donationForm.firstName || !donationForm.lastName || !donationForm.email || !donationForm.phone) {
      alert("Please fill in all required fields")
      return
    }
    
    const amount = donationForm.customAmount || donationForm.amount
    if (!amount || parseInt(amount) < 100) {
      alert("Please enter a valid amount (minimum ₹100)")
      return
    }
    
    setDonationStep(2)
  }

  const handlePaymentSubmit = () => {
    // In a real app, this would process the payment
    if (selectedCampaign) {
      alert(`Payment processed for ${selectedCampaign.title}. Amount: ₹${donationForm.customAmount || donationForm.amount}`)
    }
    setIsDonationDialogOpen(false)
    setDonationStep(1)
    setSelectedCampaign(null)
  }

  const resetDonationForm = () => {
    setDonationForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      amount: "500",
      customAmount: "",
      message: "",
      anonymous: false,
      recurring: false,
    })
    setDonationStep(1)
    setQrCodeError(false)
  }

  const donationCategories = [
    {
      id: "education",
      title: "Skill & Education Development",
      description: "Empowering Minds, Building Futures",
      icon: GraduationCap,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "healthcare",
      title: "Healthcare & Wellness",
      description: "Healing Hearts, Saving Lives",
      icon: Stethoscope,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: "environment",
      title: "Environmental Conservation",
      description: "Protecting Nature, Securing Tomorrow",
      icon: Sprout,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  const impactExamples = [
    { amount: "₹100", impact: "Provides school supplies and books for 2 children for a month" },
    { amount: "₹500", impact: "Feeds a family of 4 nutritious meals for an entire week" },
    { amount: "₹1,000", impact: "Covers basic medical treatment and medicines for a patient" },
    { amount: "₹2,500", impact: "Sponsors a child's complete education including books and uniform for a month" },
    { amount: "₹5,000", impact: "Provides vocational training to help someone start their own business" },
    { amount: "₹10,000", impact: "Helps build essential infrastructure like clean water access for a community" },
  ]

  const donationStories = [
    {
      title: "Education Transformation",
      description: "Thanks to donors like you, we've established 25+ learning centers",
      image: "/children-studying-in-classroom.jpg",
      impact: "2,500+ children educated",
    },
    {
      title: "Healthcare Access",
      description: "Mobile health clinics reach remote villages with essential care",
      image: "/mobile-health-clinic-in-rural-area.jpg",
      impact: "10,000+ patients treated",
    },
    {
      title: "Environmental Conservation",
      description: "Protecting Nature, Securing Tomorrow",
      image: "/women-entrepreneurs-working-together.jpg",
      impact: "500+ Protecting Nature, Securing Tomorrow",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 bg-orange-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Every Donation Creates Impact</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Make a Difference Today</h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your generous donation helps us continue our mission of creating positive change in communities that need it
            most. Every contribution, no matter the size, transforms lives and builds hope for a better tomorrow.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Focus Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our ongoing campaigns and make a direct impact on the causes you care about most
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationCategories.map((category) => {
              const getImage = (id: string) => {
                switch (id) {
                  case "education":
                    return "/children-studying-in-classroom.jpg"
                  case "healthcare":
                    return "/mobile-health-clinic-in-rural-area.jpg"
                  case "environment":
                    return "/Anshika1.jpeg"
                  default:
                    return "/placeholder.svg"
                }
              }

              const getSlug = (id: string) => {
                const slugMap: Record<string, string> = {
                  education: "education-skill-development",
                  healthcare: "healthcare-wellness",
                  environment: "environmental-conservation",
                }
                return slugMap[id] || id
              }

              return (
                <Card
                  key={category.id}
                  className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getImage(category.id)}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {category.title}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${category.bgColor}`}>
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          asChild
                        >
                          <Link href={`/programs/${getSlug(category.id)}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        <Button 
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                          onClick={() => {
                            setDonationType(category.id)
                            setIsGeneralDonationDialogOpen(true)
                            setGeneralQrCodeError(false)
                          }}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Donate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


      <section className="py-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Donations in Action</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See how your contributions are making a real difference in communities across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donationStories.map((story, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold text-sm">{story.impact}</div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{story.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Donation Details</CardTitle>
                <CardDescription>Choose your donation amount and category to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Donation Category */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Choose Donation Category</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {donationCategories.map((category) => {
                      const isSelected = donationType === category.id
                      return (
                        <div
                          key={category.id}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.preventDefault()
                            setDonationType(category.id)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              setDonationType(category.id)
                            }
                          }}
                          className={`relative flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 select-none ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <div className={`p-2 rounded-full ${category.bgColor} ${isSelected ? "ring-2 ring-primary ring-offset-2 scale-110" : ""} transition-all duration-200`}>
                            <category.icon className={`h-5 w-5 ${category.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold text-base ${isSelected ? "text-primary" : "text-foreground"}`}>{category.title}</div>
                            <div className={`text-sm ${isSelected ? "text-primary/80" : "text-muted-foreground"}`}>{category.description}</div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 animate-in fade-in zoom-in duration-200">
                              <div className="bg-primary rounded-full p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Donation Amount */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Select Donation Amount *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                          if (formErrors.amount) {
                            setFormErrors(prev => ({ ...prev, amount: "" }))
                          }
                        }}
                        className="h-12 font-semibold"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="custom-amount" className="text-sm font-medium">
                      Custom Amount (₹)
                    </Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter custom amount (minimum ₹100)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount("")
                        if (formErrors.amount) {
                          setFormErrors(prev => ({ ...prev, amount: "" }))
                        }
                      }}
                      className={`mt-2 ${formErrors.amount ? "border-red-500" : ""}`}
                      min="100"
                    />
                    {formErrors.amount && <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Personal Information *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input 
                        id="first-name" 
                        placeholder="Enter your first name" 
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, firstName: e.target.value }))
                          if (formErrors.firstName) {
                            setFormErrors(prev => ({ ...prev, firstName: "" }))
                          }
                        }}
                        className={formErrors.firstName ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name *</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Enter your last name" 
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, lastName: e.target.value }))
                          if (formErrors.lastName) {
                            setFormErrors(prev => ({ ...prev, lastName: "" }))
                          }
                        }}
                        className={formErrors.lastName ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }))
                        if (formErrors.email) {
                          setFormErrors(prev => ({ ...prev, email: "" }))
                        }
                      }}
                      className={formErrors.email ? "border-red-500" : ""}
                      required
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                        if (formErrors.phone) {
                          setFormErrors(prev => ({ ...prev, phone: "" }))
                        }
                      }}
                      className={formErrors.phone ? "border-red-500" : ""}
                      required
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Share why you're donating or any special message" 
                      value={formData.message}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, message: e.target.value }))
                        if (formErrors.message) {
                          setFormErrors(prev => ({ ...prev, message: "" }))
                        }
                      }}
                      className={formErrors.message ? "border-red-500" : ""}
                      required
                    />
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                </div>

                <Button
                  size="lg"
                  type="button"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg h-12"
                  onClick={handleNextButton}
                >
                  Next
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* QR Code & Bank Details */}
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  Payment Details
                </CardTitle>
                <CardDescription>Scan QR code or transfer directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center">
                  <div className="p-4 bg-white rounded-lg border-2 border-primary/20 shadow-md">
                    <div className="w-48 h-48 bg-white flex items-center justify-center rounded-lg relative overflow-hidden">
                      <Image
                        src="/qr-code.png"
                        alt="Payment QR Code"
                        width={192}
                        height={192}
                        className="rounded-lg w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Account Details */}
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Bank Account Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Account Number:</span>
                      <span className="font-semibold text-foreground">077722010002763</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">IFSC Code:</span>
                      <span className="font-semibold text-foreground">UBIN0907774</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Bank:</span>
                      <span className="font-semibold text-foreground text-right">Union Bank of India</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground font-medium">Branch:</span>
                      <span className="font-semibold text-foreground text-right">Mira Bhayander Road (Kasturi Park) Branch, Thane - 401107</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-border">
                    You can also transfer directly to this bank account
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tax Benefits */}
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-secondary" />
                  Tax Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Your donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    50% tax deduction on your donation amount
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Official 80G receipt provided via email
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Valid for Income Tax returns filing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Registration No: 12A & 80G certified
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
            
          </div>
        </div>
      </div>

      {/* Donation Dialog */}
      <Dialog open={isDonationDialogOpen} onOpenChange={(open) => {
        setIsDonationDialogOpen(open)
        if (!open) {
          resetDonationForm()
        }
      }}>
        <DialogContent className="w-[90vw] max-w-[1400px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {donationStep === 1 ? "Donation Details" : "Complete Payment"}
            </DialogTitle>
            <DialogDescription>
              {donationStep === 1 
                ? `Supporting: ${selectedCampaign?.title || "General Donation"}` 
                : "Scan the QR code to complete your donation"
              }
            </DialogDescription>
          </DialogHeader>

          {donationStep === 1 ? (
            // Step 1: Donation Form
            <div className="space-y-6">
              {/* Campaign Info */}
              {selectedCampaign && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedCampaign.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCampaign.category}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={donationForm.firstName}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={donationForm.lastName}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={donationForm.email}
                    onChange={(e) => setDonationForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={donationForm.phone}
                    onChange={(e) => setDonationForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Donation Amount */}
              <div className="space-y-4">
                <h3 className="font-semibold">Donation Amount</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={donationForm.amount === amount ? "default" : "outline"}
                      onClick={() => setDonationForm(prev => ({ 
                        ...prev, 
                        amount: amount, 
                        customAmount: "" 
                      }))}
                      className="h-12 font-semibold"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="customAmount">Custom Amount (₹)</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    min="100"
                    value={donationForm.customAmount}
                    onChange={(e) => setDonationForm(prev => ({ 
                      ...prev, 
                      customAmount: e.target.value, 
                      amount: "" 
                    }))}
                    placeholder="Enter custom amount (minimum ₹100)"
                  />
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <h3 className="font-semibold">Additional Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={donationForm.anonymous}
                      onCheckedChange={(checked) => setDonationForm(prev => ({ ...prev, anonymous: !!checked }))}
                    />
                    <Label htmlFor="anonymous">Make this donation anonymous</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recurring"
                      checked={donationForm.recurring}
                      onCheckedChange={(checked) => setDonationForm(prev => ({ ...prev, recurring: !!checked }))}
                    />
                    <Label htmlFor="recurring">Make this a recurring monthly donation</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={donationForm.message}
                    onChange={(e) => setDonationForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Share why you're donating or any special message"
                    rows={3}
                  />
                </div>
              </div>

              {/* Proceed Button */}
              <div className="flex justify-end">
                <Button onClick={handleFormSubmit} className="bg-primary hover:bg-primary/90">
                  Proceed to Payment
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            // Step 2: Payment QR Code
            <div className="space-y-6">
              {/* Donation Summary */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-3">Donation Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Campaign:</span>
                    <span className="font-medium">{selectedCampaign?.title || "General Donation"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Donor:</span>
                    <span className="font-medium">
                      {donationForm.anonymous ? "Anonymous" : `${donationForm.firstName} ${donationForm.lastName}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold text-primary text-lg">
                      ₹{(donationForm.customAmount || donationForm.amount || "0").toLocaleString()}
                    </span>
                  </div>
                  {donationForm.recurring && (
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span className="text-orange-500 font-medium">Monthly</span>
                    </div>
                  )}
                </div>
              </div>

              {/* QR Code Payment Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-semibold text-xl mb-2 flex items-center justify-center gap-2">
                    <QrCode className="h-6 w-6 text-primary" />
                    Scan to Pay
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Scan the QR code below using any UPI app (PhonePe, GPay, Paytm, etc.) to complete your donation
                  </p>
                </div>

                {/* Bank Account Details */}
                <div className="w-full max-w-md mx-auto p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Bank Account Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Account Number:</span>
                      <span className="font-semibold text-foreground">077722010002763</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">IFSC Code:</span>
                      <span className="font-semibold text-foreground">UBIN0907774</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Bank:</span>
                      <span className="font-semibold text-foreground text-right">Union Bank of India</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground font-medium">Branch:</span>
                      <span className="font-semibold text-foreground text-right">Mira Bhayander Road (Kasturi Park) Branch, Thane - 401107</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-border">
                    You can also transfer directly to this bank account
                  </p>
                </div>

                {/* QR Code Display */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-6 bg-white rounded-lg border-2 border-primary/20 shadow-lg">
                    <div className="w-64 h-64 bg-white flex items-center justify-center rounded-lg relative overflow-hidden">
                      {!qrCodeError ? (
                        <Image
                          src="/qr-code.png"
                          alt="Payment QR Code"
                          width={256}
                          height={256}
                          className="rounded-lg w-full h-full object-contain"
                          onError={() => setQrCodeError(true)}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 rounded-lg w-full h-full">
                          <QrCode className="h-24 w-24 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground font-medium">QR Code Image</p>
                          <p className="text-xs text-muted-foreground mt-2">Please add your QR code image at /public/qr-code.png</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="w-full max-w-md space-y-3 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-center">Payment Instructions</h4>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Open any UPI app on your phone (PhonePe, GPay, Paytm, etc.)</li>
                      <li>Tap on &quot;Scan QR Code&quot; option</li>
                      <li>Point your camera at the QR code above</li>
                      <li>Enter the amount: <span className="font-semibold text-primary">₹{(donationForm.customAmount || donationForm.amount || "0").toLocaleString()}</span></li>
                      <li>Complete the payment</li>
                      <li>You will receive a confirmation email at <span className="font-medium">{donationForm.email}</span></li>
                    </ol>
                  </div>

                  {/* Alternative Payment Info */}
                  <div className="w-full max-w-md p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-center text-muted-foreground">
                      <span className="font-semibold">UPI ID:</span> anshikahelpinghands@paytm
                    </p>
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      You can also send payment directly to this UPI ID
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setDonationStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Form
                  </Button>
                  <Button 
                    onClick={handlePaymentSubmit} 
                    className="bg-primary hover:bg-primary/90"
                  >
                    I&apos;ve Completed Payment
                    <Heart className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* General Donation QR Code Dialog */}
      <Dialog open={isGeneralDonationDialogOpen} onOpenChange={(open) => {
        setIsGeneralDonationDialogOpen(open)
        if (!open) {
          setGeneralQrCodeError(false)
        }
      }}>
        <DialogContent className="w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Complete Your Donation
            </DialogTitle>
            <DialogDescription>
              Scan the QR code below to complete your donation of ₹{(customAmount || selectedAmount || "0").toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Donation Summary */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-3">Donation Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">
                    {donationCategories.find(cat => cat.id === donationType)?.title || "Charitable Cause"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold text-primary text-lg">
                    ₹{(customAmount || selectedAmount || "0").toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="w-full max-w-md mx-auto p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
              <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Bank Account Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Account Number:</span>
                  <span className="font-semibold text-foreground">077722010002763</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">IFSC Code:</span>
                  <span className="font-semibold text-foreground">UBIN0907774</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Bank:</span>
                  <span className="font-semibold text-foreground text-right">Union Bank of India</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground font-medium">Branch:</span>
                  <span className="font-semibold text-foreground text-right">Mira Bhayander Road (Kasturi Park) Branch, Thane - 401107</span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-border">
                You can also transfer directly to this bank account
              </p>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-6 bg-white rounded-lg border-2 border-primary/20 shadow-lg">
                <div className="w-64 h-64 bg-white flex items-center justify-center rounded-lg relative overflow-hidden">
                  {!generalQrCodeError ? (
                    <Image
                      src="/qr-code.png"
                      alt="Payment QR Code"
                      width={256}
                      height={256}
                      className="rounded-lg w-full h-full object-contain"
                      onError={() => setGeneralQrCodeError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 rounded-lg w-full h-full">
                      <QrCode className="h-24 w-24 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground font-medium">QR Code Image</p>
                      <p className="text-xs text-muted-foreground mt-2">Please add your QR code image at /public/qr-code.png</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="w-full space-y-3 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-center">Payment Instructions</h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Open any UPI app on your phone (PhonePe, GPay, Paytm, etc.)</li>
                  <li>Tap on &quot;Scan QR Code&quot; option</li>
                  <li>Point your camera at the QR code above</li>
                  <li>Enter the amount: <span className="font-semibold text-primary">₹{(customAmount || selectedAmount || "0").toLocaleString()}</span></li>
                  <li>Complete the payment</li>
                  <li>You will receive a confirmation email after payment</li>
                </ol>
              </div>

              {/* Alternative Payment Info */}
              <div className="w-full p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-center text-muted-foreground">
                  <span className="font-semibold">UPI ID:</span> anshikahelpinghands@paytm
                </p>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  You can also send payment directly to this UPI ID
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => setIsGeneralDonationDialogOpen(false)} 
                className="bg-primary hover:bg-primary/90"
              >
                I&apos;ve Completed Payment
                <Heart className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal with QR Code and Account Details */}
      <Dialog open={isPaymentModalOpen} onOpenChange={(open) => {
        setIsPaymentModalOpen(open)
        if (!open) {
          setReceiptFile(null)
          setReceiptFileName("")
          setReceiptError("")
        }
      }}>
        <DialogContent className="w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Complete Your Payment
            </DialogTitle>
            <DialogDescription>
              Scan the QR code or transfer directly to complete your donation of ₹{(customAmount || selectedAmount || "0").toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-6 bg-white rounded-lg border-2 border-primary/20 shadow-lg">
                <div className="w-64 h-64 bg-white flex items-center justify-center rounded-lg relative overflow-hidden">
                  <Image
                    src="/qr-code.png"
                    alt="Payment QR Code"
                    width={256}
                    height={256}
                    className="rounded-lg w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="w-full max-w-md mx-auto p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
              <h4 className="font-semibold text-center mb-4 flex items-center justify-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Bank Account Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Account Number:</span>
                  <span className="font-semibold text-foreground">077722010002763</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">IFSC Code:</span>
                  <span className="font-semibold text-foreground">UBIN0907774</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Bank:</span>
                  <span className="font-semibold text-foreground text-right">Union Bank of India</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground font-medium">Branch:</span>
                  <span className="font-semibold text-foreground text-right">Mira Bhayander Road (Kasturi Park) Branch, Thane - 401107</span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-border">
                You can also transfer directly to this bank account
              </p>
            </div>

            {/* Upload Receipt Section */}
            <div className="w-full max-w-md mx-auto space-y-4">
              <Label className="text-base font-semibold block">Upload Receipt *</Label>
              <div className="mt-2">
                <Input
                  id="receipt-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setReceiptFile(file)
                      setReceiptFileName(file.name)
                      setReceiptError("")
                    }
                  }}
                  className="hidden"
                  required
                />
                <Label
                  htmlFor="receipt-upload"
                  className={`flex items-center gap-2 cursor-pointer p-4 border-2 border-dashed rounded-lg transition-colors bg-muted/30 ${
                    receiptError ? "border-red-500 hover:border-red-600" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {receiptFileName || "Choose file or drag and drop"}
                  </span>
                </Label>
                {receiptFileName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-green-600">✓ {receiptFileName}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setReceiptFile(null)
                        setReceiptFileName("")
                        setReceiptError("")
                        const input = document.getElementById("receipt-upload") as HTMLInputElement
                        if (input) input.value = ""
                      }}
                      className="h-6 px-2 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                {receiptError && <p className="text-red-500 text-sm mt-1">{receiptError}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline"
                onClick={() => setIsPaymentModalOpen(false)} 
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  // Validate receipt upload
                  if (!receiptFile) {
                    setReceiptError("Please upload a receipt")
                    return
                  }
                  
                  setIsPaymentModalOpen(false)
                  setIsConfirmationDialogOpen(true)
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Submit
                <Heart className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <span className="text-2xl">Donation Submitted Successfully!</span>
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-4">
              Your donation has been submitted successfully. You will receive a confirmation email shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => setIsConfirmationDialogOpen(false)} 
              className="bg-primary hover:bg-primary/90"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
