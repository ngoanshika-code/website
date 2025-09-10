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
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState("500")
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState("general")

  const predefinedAmounts = ["100", "500", "1000", "2500", "5000", "10000"]

  const donationCategories = [
    {
      id: "general",
      title: "General Fund",
      description: "Support all our programs and operations",
      icon: Heart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "education",
      title: "Education & Skills",
      description: "Fund schools, vocational training, and digital literacy",
      icon: GraduationCap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: "healthcare",
      title: "Healthcare & Wellness",
      description: "Support medical camps and health awareness programs",
      icon: Stethoscope,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: "food",
      title: "Food Security",
      description: "Fight hunger through nutrition and farming programs",
      icon: Utensils,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "shelter",
      title: "Shelter & Housing",
      description: "Provide safe housing and infrastructure development",
      icon: Home,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: "women",
      title: "Women Empowerment",
      description: "Support women's entrepreneurship and leadership programs",
      icon: HandHeart,
      color: "text-accent",
      bgColor: "bg-accent/10",
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
      title: "Women Empowerment",
      description: "Self-help groups have empowered women to become entrepreneurs",
      image: "/women-entrepreneurs-working-together.jpg",
      impact: "500+ women empowered",
    },
  ]

  const donationCampaigns = [
    {
      id: 1,
      title: "Earn Divine Blessings by Help to Rebuild Lord Hanuman Temple in Ayodhya Kshetra",
      image: "/ancient-temple-construction-site-with-workers.jpg",
      raised: 65441.0,
      backers: 2522,
      progress: 65,
      category: "Temple Restoration",
    },
    {
      id: 2,
      title: "Help us to Restore the 120 Year Old Shankar Mahadev Temple in Gaya",
      image: "/old-damaged-temple-structure-needing-restoration.jpg",
      raised: 67098.0,
      backers: 0,
      progress: 12,
      category: "Heritage Conservation",
    },
    {
      id: 3,
      title: "Restore the Ancient Shani Dev Temple at Kamkheda Tirth Kshetra",
      image: "/ancient-temple-with-deity-statue-restoration-work.jpg",
      raised: 690052.0,
      backers: 1564,
      progress: 85,
      category: "Sacred Site Revival",
    },
    {
      id: 4,
      title: "Build New Community Health Center for Rural Villages",
      image: "/rural-healthcare-facility-construction.jpg",
      raised: 125000.0,
      backers: 456,
      progress: 45,
      category: "Healthcare Infrastructure",
    },
    {
      id: 5,
      title: "Establish Digital Learning Centers for Underprivileged Children",
      image: "/children-learning-with-computers-in-classroom.jpg",
      raised: 89500.0,
      backers: 234,
      progress: 30,
      category: "Education Technology",
    },
    {
      id: 6,
      title: "Provide Clean Water Access to 50 Remote Villages",
      image: "/water-well-construction-in-rural-village.jpg",
      raised: 234000.0,
      backers: 789,
      progress: 78,
      category: "Water & Sanitation",
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Active Donation Campaigns</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our ongoing campaigns and make a direct impact on the causes you care about most
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {campaign.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2 leading-tight">{campaign.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-2xl font-bold text-primary">₹{campaign.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">Raised</span>
                    </div>

                    <Progress value={campaign.progress} className="h-2" />

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{campaign.progress}% Complete</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {campaign.backers} Backers
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold" size="lg">
                    Donate Now →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                  <RadioGroup
                    value={donationType}
                    onValueChange={setDonationType}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {donationCategories.map((category) => (
                      <div key={category.id} className="relative">
                        <RadioGroupItem value={category.id} id={category.id} className="peer sr-only" />
                        <Label
                          htmlFor={category.id}
                          className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200"
                        >
                          <div className={`p-2 rounded-full ${category.bgColor}`}>
                            <category.icon className={`h-5 w-5 ${category.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{category.title}</div>
                            <div className="text-sm text-muted-foreground">{category.description}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Donation Amount */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Select Donation Amount</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
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
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount("")
                      }}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Personal Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea id="message" placeholder="Share why you're donating or any special message" />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Payment Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                    >
                      <CreditCard className="h-6 w-6 text-primary" />
                      <span className="font-medium">Credit/Debit Card</span>
                      <span className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                    >
                      <Smartphone className="h-6 w-6 text-primary" />
                      <span className="font-medium">UPI/Digital Wallet</span>
                      <span className="text-xs text-muted-foreground">PhonePe, GPay, Paytm</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                    >
                      <Building className="h-6 w-6 text-primary" />
                      <span className="font-medium">Net Banking</span>
                      <span className="text-xs text-muted-foreground">All major banks</span>
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg h-12"
                >
                  Donate ₹{customAmount || selectedAmount || "0"} Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Impact Examples */}
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Your Impact
                </CardTitle>
                <CardDescription>See how your donation makes a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {impactExamples.map((example, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border-l-2 border-primary/20"
                    >
                      <div className="font-bold text-primary min-w-fit text-sm">{example.amount}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{example.impact}</div>
                    </div>
                  ))}
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
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Have questions about donating? Our team is here to help you make a meaningful contribution.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">📧</div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">donations@anshikahelpinghands.org</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">📞</div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">+91 98765 43210</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">⏰</div>
                    <div>
                      <div className="font-medium">Hours</div>
                      <div className="text-muted-foreground">Mon-Fri: 9 AM - 6 PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
