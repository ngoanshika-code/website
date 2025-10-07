"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Heart,
  Download,
  Share2,
  Mail,
  Phone,
  ArrowLeft,
  Gift,
  Users,
  GraduationCap,
  Stethoscope,
  Home,
  Utensils,
  HandHeart,
  Clock,
  MapPin,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const [donationData, setDonationData] = useState({
    amount: "",
    type: "",
    transactionId: "",
    paymentId: "",
    orderId: "",
    date: "",
    donorName: "Anonymous Donor",
  })

  const donationCategories = {
    general: { title: "General Fund", icon: Heart, color: "text-primary", bgColor: "bg-primary/10" },
    education: { title: "Education & Skills", icon: GraduationCap, color: "text-secondary", bgColor: "bg-secondary/10" },
    healthcare: { title: "Healthcare & Wellness", icon: Stethoscope, color: "text-accent", bgColor: "bg-accent/10" },
    food: { title: "Food Security", icon: Utensils, color: "text-primary", bgColor: "bg-primary/10" },
    shelter: { title: "Shelter & Housing", icon: Home, color: "text-secondary", bgColor: "bg-secondary/10" },
    women: { title: "Women Empowerment", icon: HandHeart, color: "text-accent", bgColor: "bg-accent/10" },
  }

  useEffect(() => {
    // Get donation data from URL params
    const amount = searchParams.get("amount") || "0"
    const type = searchParams.get("type") || "general"
    const paymentId = searchParams.get("paymentId") || ""
    const orderId = searchParams.get("orderId") || ""
    const transactionId = paymentId || `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
    const date = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    setDonationData({
      amount,
      type,
      transactionId,
      paymentId,
      orderId,
      date,
      donorName: "Anonymous Donor", // In real app, get from form data
    })
  }, [searchParams])

  const selectedCategory = donationCategories[donationData.type as keyof typeof donationCategories] || donationCategories.general

  const impactStories = [
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
      title: "Women Empowerment",
      description: "Self-help groups have empowered women to become entrepreneurs",
      image: "/women-entrepreneurs-working-together.jpg",
      impact: "500+ women empowered",
    },
  ]

  const handleDownloadReceipt = () => {
    // In a real application, this would generate and download a PDF receipt
    alert("Receipt download functionality will be implemented with PDF generation")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I just donated to Anshika Helping Hands Foundation",
        text: `I just donated ₹${donationData.amount} to support ${selectedCategory.title}. Join me in making a difference!`,
        url: window.location.origin,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I just donated ₹${donationData.amount} to support ${selectedCategory.title} at Anshika Helping Hands Foundation. Join me in making a difference! ${window.location.origin}`
      navigator.clipboard.writeText(shareText)
      alert("Share text copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Success Header */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Thank You for Your Generous Donation!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Your contribution of ₹{donationData.amount} will make a real difference in the lives of those who need it most.
            Together, we're building a better future for communities across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadReceipt} className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Your Impact
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transaction Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Donation Summary
                </CardTitle>
                <CardDescription>Your donation has been successfully processed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                      <p className="text-lg font-mono">{donationData.transactionId}</p>
                    </div>
                    {donationData.paymentId && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Payment ID</label>
                        <p className="text-lg font-mono">{donationData.paymentId}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Donation Date</label>
                      <p className="text-lg">{donationData.date}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Donor Name</label>
                      <p className="text-lg">{donationData.donorName}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Donation Category</label>
                      <div className="flex items-center gap-3 mt-2">
                        <div className={`p-2 rounded-full ${selectedCategory.bgColor}`}>
                          <selectedCategory.icon className={`h-5 w-5 ${selectedCategory.color}`} />
                        </div>
                        <span className="text-lg font-medium">{selectedCategory.title}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Amount Donated</label>
                      <p className="text-3xl font-bold text-primary">₹{donationData.amount}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Payment Status: Successful</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your donation has been processed successfully. You will receive a confirmation email with your tax-deductible receipt within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Impact Stories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Your Impact in Action
                </CardTitle>
                <CardDescription>See how donations like yours are transforming lives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {impactStories.map((story, index) => (
                    <div key={index} className="text-center">
                      <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="text-white text-sm font-medium">{story.impact}</div>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{story.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{story.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Email Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a confirmation email with your donation receipt within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Tax Receipt</h4>
                      <p className="text-sm text-muted-foreground">
                        Your 80G tax-deductible receipt will be sent to your email for income tax filing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Impact Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll keep you updated on how your donation is being used to create positive change.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-muted-foreground">donations@anshikahelpinghands.org</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Phone Support</div>
                      <div className="text-sm text-muted-foreground">+91 98765 43210</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Support Hours</div>
                      <div className="text-sm text-muted-foreground">Mon-Fri: 9 AM - 6 PM</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have any questions about your donation or need assistance, please don't hesitate to contact us.
                </p>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  About Anshika Helping Hands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/logo.png"
                    alt="Anshika Helping Hands Foundation"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Anshika Helping Hands Foundation</div>
                    <div className="text-sm text-muted-foreground">Registered NGO since 2015</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registration:</span>
                    <span>12A & 80G Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lives Impacted:</span>
                    <span className="font-semibold">15,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Communities:</span>
                    <span className="font-semibold">120+</span>
                  </div>
                </div>
                <Separator />
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Share Your Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  Share Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Help us spread the word and inspire others to make a difference.
                </p>
                <div className="space-y-2">
                  <Button onClick={handleShare} variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on Social Media
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/donation">Make Another Donation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <Card>
              <CardContent className="pt-6">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Homepage
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
