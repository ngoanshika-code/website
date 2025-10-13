"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Users,
  Calendar,
  MapPin,
  Target,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Share2,
  Clock,
  TrendingUp,
  Award,
  Shield,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Smartphone,
  Building,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TermsAndConditions } from "@/components/terms-and-conditions"

interface Campaign {
  _id: string
  title: string
  description: string
  aboutCampaign: string
  goalAmount: number
  raisedAmount: number
  backersCount: number
  progress: number
  category: string
  categoryName: string
  status: string
  location: string
  organizer: string
  startDate: string
  endDate: string
  daysLeft: number
  images: string[]
  featuredImage?: string
  expectedBeneficiaries: number
  expectedDuration: string
  impactDescription: string
  milestones: Array<{
    amount: number
    description: string
    completed: boolean
  }>
  createdAt: string
  updatedAt: string
}

export default function CampaignDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const campaignId = params.id as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [donationStep, setDonationStep] = useState(1) // 1: Form, 2: Payment
  const [donationForm, setDonationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: "500",
    customAmount: "",
    message: "",
    anonymous: false,
    recurring: false,
    agreeToTerms: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("card")

  const predefinedAmounts = ["100", "500", "1000", "2500", "5000", "10000"]

  const handleDonateNow = () => {
    setIsDonationModalOpen(true)
    setDonationStep(1)
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
    
    if (!donationForm.agreeToTerms) {
      alert("You must agree to the Terms & Conditions to proceed")
      return
    }
    
    setDonationStep(2)
  }

  const handlePaymentSubmit = () => {
    // In a real app, this would process the payment
    alert(`Payment processed for ${campaign?.title}. Amount: ₹${donationForm.customAmount || donationForm.amount}`)
    setIsDonationModalOpen(false)
    setDonationStep(1)
    // Reset form
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
      agreeToTerms: false,
    })
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
      agreeToTerms: false,
    })
    setDonationStep(1)
  }

  const fetchCampaign = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`)
      const result = await response.json()
      
      if (result.success) {
        setCampaign(result.campaign)
        console.log("Campaign fetched:", result.campaign)
        console.log("Campaign images:", result.campaign.images)
        console.log("Campaign featuredImage:", result.campaign.featuredImage)
        console.log("Image count:", result.campaign.images?.length || 0)
        console.log("Images array details:", result.campaign.images?.map((url, index) => ({ index, url })))
      } else {
        setError("Campaign not found")
        console.error("Failed to fetch campaign:", result.error)
      }
    } catch (error) {
      setError("Error loading campaign")
      console.error("Error fetching campaign:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (campaignId) {
      fetchCampaign()
    }
  }, [campaignId])

  // Reset image index when campaign changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [campaignId])

  // Auto-loop through images
  useEffect(() => {
    if (!campaign || !isAutoPlaying || !campaign.images || campaign.images.length <= 1) {
      console.log('Auto-play disabled:', { 
        hasCampaign: !!campaign, 
        isAutoPlaying, 
        hasImages: !!campaign?.images, 
        imageCount: campaign?.images?.length || 0 
      })
      return
    }

    console.log('Starting auto-play for', campaign.images.length, 'images')
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % campaign.images.length
        console.log('Auto-play: changing from', prev, 'to', nextIndex, 'of', campaign.images.length, 'images')
        console.log('Next image URL:', campaign.images[nextIndex])
        return nextIndex
      })
    }, 4000) // Change image every 4 seconds

    return () => {
      console.log('Clearing auto-play interval')
      clearInterval(interval)
    }
  }, [campaign, isAutoPlaying])

  const nextImage = () => {
    if (campaign && campaign.images && campaign.images.length > 0) {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % campaign.images.length
        console.log('Next image clicked:', prev, '->', nextIndex, 'of', campaign.images.length)
        console.log('Next image URL:', campaign.images[nextIndex])
        return nextIndex
      })
    }
  }

  const prevImage = () => {
    if (campaign && campaign.images && campaign.images.length > 0) {
      setCurrentImageIndex((prev) => {
        const prevIndex = (prev - 1 + campaign.images.length) % campaign.images.length
        console.log('Prev image clicked:', prev, '->', prevIndex, 'of', campaign.images.length)
        console.log('Prev image URL:', campaign.images[prevIndex])
        return prevIndex
      })
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
    console.log('Go to image clicked:', index, 'of', campaign.images?.length || 0)
    console.log('Image URL:', campaign.images?.[index])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <CardTitle className="text-2xl">Loading Campaign...</CardTitle>
            </div>
            <CardDescription>
              Please wait while we fetch the campaign details.
            </CardDescription>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center">
            <CardTitle className="text-2xl mb-4">Campaign Not Found</CardTitle>
            <CardDescription className="mb-6">
              {error || "The campaign you're looking for doesn't exist or has been removed."}
            </CardDescription>
            <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/donation">Back to Campaigns</Link>
            </Button>
              <Button variant="outline" onClick={fetchCampaign}>
                Try Again
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const remainingAmount = campaign.goalAmount - campaign.raisedAmount
  const daysLeft = campaign.daysLeft || Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <Image
            key={`${campaign._id}-${currentImageIndex}`}
            src={(() => {
              const imageUrl = campaign.images?.[currentImageIndex] || campaign.featuredImage || "https://res.cloudinary.com/djyp5yzil/image/upload/v1759814188/donation-campaigns/placeholder.svg"
              console.log(`Rendering image ${currentImageIndex}:`, imageUrl)
              return imageUrl
            })()}
            alt={campaign.title}
            fill
            className="object-cover transition-all duration-700 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
        </div>

        {/* Navigation Arrows - Show when multiple images */}
        {(campaign.images && campaign.images.length > 1) && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image Indicators - Show when multiple images */}
        {(campaign.images && campaign.images.length > 1) && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
            {(campaign.images || []).map((_, index) => (
              <button
                key={index}
                className={`w-5 h-5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentImageIndex
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-20 backdrop-blur-sm">
          {currentImageIndex + 1} / {(campaign.images || []).length}
          {isAutoPlaying && (
            <div className="inline-block ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
        </div>
        

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="text-center">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold mb-6">
                {campaign.categoryName}
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                {campaign.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Info Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Description & Actions */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">About This Campaign</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {campaign.description}
                </p>
                {campaign.aboutCampaign && (
                  <div className="mt-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {campaign.aboutCampaign}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 text-lg font-semibold shadow-xl"
                  onClick={handleDonateNow}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Donate Now
                </Button>
                <Button size="lg" variant="outline" className="px-10 py-4 text-lg font-semibold">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Campaign
                </Button>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-8">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      ₹{campaign.raisedAmount?.toLocaleString() || 0}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Raised</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-secondary mb-2">
                      ₹{campaign.goalAmount?.toLocaleString() || 0}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Goal</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-accent mb-2">
                      {campaign.backersCount || 0}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Backers</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {daysLeft}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Days Left</div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Campaign Progress</span>
                    <span className="text-lg font-bold text-primary">{campaign.progress || 0}%</span>
                  </div>
                  <Progress value={campaign.progress || 0} className="h-4 mb-3" />
                  <div className="text-sm text-muted-foreground">
                    {campaign.progress || 0}% Complete • ₹{remainingAmount.toLocaleString()} still needed
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Campaign Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Campaign Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Start Date</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(campaign.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">End Date</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">{campaign.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Organizer</div>
                        <div className="text-sm text-muted-foreground">{campaign.organizer}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Expected Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{campaign.expectedBeneficiaries?.toLocaleString() || 0} People</div>
                        <div className="text-sm text-muted-foreground">Will benefit from this campaign</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{campaign.expectedDuration || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground">Expected completion time</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {campaign.impactDescription || 'No impact description available.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Donation Card */}
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-center">Support This Campaign</CardTitle>
                  <CardDescription className="text-center">
                    Help us reach our goal of ₹{campaign.goalAmount?.toLocaleString() || 0}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ₹{remainingAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Still needed</div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={handleDonateNow}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Campaign
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-green-500" />
                      <span>Tax-deductible donation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Transparent reporting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Funding Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(campaign.milestones || []).map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">₹{milestone.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{milestone.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <Dialog open={isDonationModalOpen} onOpenChange={(open) => {
        setIsDonationModalOpen(open)
        if (!open) {
          resetDonationForm()
        }
      }}>
        <DialogContent className="w-[90vw] max-w-[1400px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {donationStep === 1 ? "Donation Details" : "Payment Method"}
            </DialogTitle>
            <DialogDescription>
              {donationStep === 1 
                ? `Supporting: ${campaign?.title}` 
                : "Choose your preferred payment method"
              }
            </DialogDescription>
          </DialogHeader>

          {donationStep === 1 ? (
            // Step 1: Donation Form
            <div className="space-y-6">
              {/* Campaign Info */}
              {campaign && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{campaign.title}</h3>
                      <p className="text-sm text-muted-foreground">{campaign.categoryName}</p>
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

              {/* Terms and Conditions */}
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={donationForm.agreeToTerms}
                    onCheckedChange={(checked) => setDonationForm(prev => ({ ...prev, agreeToTerms: !!checked }))}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="cursor-pointer">
                      I agree to the{" "}
                      <TermsAndConditions triggerText="Terms and Conditions" triggerClassName="text-primary hover:underline" />
                      {" "}and{" "}
                      <TermsAndConditions triggerText="Privacy Policy" triggerClassName="text-primary hover:underline" />
                      . I understand that my donation is non-refundable and will be used for charitable purposes.
                    </Label>
                  </div>
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
            // Step 2: Payment Method
            <div className="space-y-6">
              {/* Donation Summary */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-3">Donation Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Campaign:</span>
                    <span className="font-medium">{campaign?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Donor:</span>
                    <span className="font-medium">
                      {donationForm.anonymous ? "Anonymous" : `${donationForm.firstName} ${donationForm.lastName}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold text-primary">
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

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="font-semibold">Choose Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                    <Label
                      htmlFor="upi"
                      className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-medium">UPI/Digital Wallet</div>
                          <div className="text-sm text-muted-foreground">PhonePe, GPay, Paytm</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                    <Label
                      htmlFor="netbanking"
                      className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Building className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-medium">Net Banking</div>
                          <div className="text-sm text-muted-foreground">All major banks</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setDonationStep(1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handlePaymentSubmit} className="bg-primary hover:bg-primary/90">
                  Complete Donation
                  <Heart className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
