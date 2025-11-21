"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CreditCard,
  Smartphone,
  Building,
  Shield,
  CheckCircle,
  ArrowLeft,
  Gift,
  Users,
  GraduationCap,
  Stethoscope,
  Home,
  Utensils,
  HandHeart,
  Sprout,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { initializePayment, validateAmount } from "@/lib/payment"
import { TermsAndConditions } from "@/components/terms-and-conditions"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  amount: string
  customAmount: string
  donationType: string
  message: string
  anonymous: boolean
  recurring: boolean
  paymentMethod: string
  agreeToTerms: boolean
}

interface Errors {
  [key: string]: string
}

export default function DonationFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    amount: "",
    customAmount: "",
    donationType: "education",
    message: "",
    anonymous: false,
    recurring: false,
    paymentMethod: "card",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const predefinedAmounts = ["100", "500", "1000", "2500", "5000", "10000"]

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

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Errors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number must be 10 digits"
    
    const amount = formData.customAmount || formData.amount
    if (!amount) newErrors.amount = "Please select or enter an amount"
    else {
      const amountValidation = validateAmount(parseInt(amount))
      if (!amountValidation.valid) newErrors.amount = amountValidation.error || "Invalid amount"
    }
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const amount = parseInt(formData.customAmount || formData.amount)
      const selectedCategory = donationCategories.find(cat => cat.id === formData.donationType)
      
      // Initialize payment
      const paymentResult = await initializePayment({
        amount,
        currency: 'INR',
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        description: `Donation for ${selectedCategory?.title || 'Charitable Cause'}`,
        notes: {
          donationType: formData.donationType,
          message: formData.message,
          anonymous: formData.anonymous.toString(),
          recurring: formData.recurring.toString(),
        },
      })

      if (paymentResult.success) {
        // Redirect to success page with payment details
        router.push(`/donation/success?amount=${amount}&type=${formData.donationType}&paymentId=${paymentResult.paymentId}&orderId=${paymentResult.orderId}`)
      } else {
        alert(`Payment failed: ${paymentResult.error}`)
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      alert("Payment processing failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategory = donationCategories.find(cat => cat.id === formData.donationType)
  const donationAmount = formData.customAmount || formData.amount

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/donation" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Donation
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Your Donation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill in your details below to make a secure donation and help us create positive change in communities across India.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Please provide your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-red-500" : ""}
                      placeholder="Enter your 10-digit phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Donation Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Donation Details
                  </CardTitle>
                  <CardDescription>Choose your donation amount and category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Category */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Choose Donation Category</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {donationCategories.map((category) => {
                        const isSelected = formData.donationType === category.id
                        return (
                          <div
                            key={category.id}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.preventDefault()
                              handleInputChange("donationType", category.id)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                handleInputChange("donationType", category.id)
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
                    <Label className="text-base font-semibold mb-4 block">Donation Amount (₹) *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={formData.amount === amount ? "default" : "outline"}
                          onClick={() => {
                            handleInputChange("amount", amount)
                            handleInputChange("customAmount", "")
                          }}
                          className="h-12 font-semibold"
                        >
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="customAmount" className="text-sm font-medium">
                        Custom Amount (₹)
                      </Label>
                      <Input
                        id="customAmount"
                        type="number"
                        min="100"
                        value={formData.customAmount}
                        onChange={(e) => {
                          handleInputChange("customAmount", e.target.value)
                          handleInputChange("amount", "")
                        }}
                        placeholder="Enter custom amount (minimum ₹100)"
                        className="mt-2"
                      />
                      {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={formData.anonymous}
                        onCheckedChange={(checked) => handleInputChange("anonymous", checked)}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Make this donation anonymous
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recurring"
                        checked={formData.recurring}
                        onCheckedChange={(checked) => handleInputChange("recurring", checked)}
                      />
                      <Label htmlFor="recurring" className="text-sm">
                        Make this a recurring monthly donation
                      </Label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Share why you're donating or any special message"
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="relative">
                      <RadioGroupItem value="card" id="card" className="peer sr-only" />
                      <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200 cursor-pointer"
                      >
                        <CreditCard className="h-8 w-8 text-primary mb-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                        <span className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                      <Label
                        htmlFor="upi"
                        className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200 cursor-pointer"
                      >
                        <Smartphone className="h-8 w-8 text-primary mb-2" />
                        <span className="font-medium">UPI/Digital Wallet</span>
                        <span className="text-xs text-muted-foreground">PhonePe, GPay, Paytm</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                      <Label
                        htmlFor="netbanking"
                        className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-border hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200 cursor-pointer"
                      >
                        <Building className="h-8 w-8 text-primary mb-2" />
                        <span className="font-medium">Net Banking</span>
                        <span className="text-xs text-muted-foreground">All major banks</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
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
                      {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-6 min-w-[200px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Donate ₹${donationAmount || "0"} Now`
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Donation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCategory && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className={`p-2 rounded-full ${selectedCategory.bgColor}`}>
                      <selectedCategory.icon className={`h-5 w-5 ${selectedCategory.color}`} />
                    </div>
                    <div>
                      <div className="font-medium">{selectedCategory.title}</div>
                      <div className="text-sm text-muted-foreground">{selectedCategory.description}</div>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Donation Amount:</span>
                    <span className="font-semibold">₹{donationAmount || "0"}</span>
                  </div>
                  {formData.recurring && (
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <Badge variant="secondary">Monthly</Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="text-sm capitalize">{formData.paymentMethod}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₹{donationAmount || "0"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Impact Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Your Impact
                </CardTitle>
                <CardDescription>See how your donation makes a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {impactExamples.slice(0, 4).map((example, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-transparent border-l-2 border-green-200"
                    >
                      <div className="font-bold text-green-600 min-w-fit text-sm">{example.amount}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{example.impact}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tax Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Tax Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Your donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    50% tax deduction on your donation amount
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Official 80G receipt provided via email
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Valid for Income Tax returns filing
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Secure & Safe</h3>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                  </p>
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
