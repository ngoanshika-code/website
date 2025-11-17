"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "anshikahelpinghandsfoundation@gmail.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 99204 46089",
      description: "Mon-Fri 9AM-6PM IST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Shop No. 2, New Sagar Samrat, Opp. Blossoms School, Narmada Nagar, Bhayandar (East), Thane – 401105, Maharashtra, India",
      description: "Our main office location",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM",
      description: "Saturday: 10:00 AM - 4:00 PM",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Whether you have questions about our programs, want to volunteer, or need
            assistance, we're here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiry-type">Inquiry Type</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                          <SelectItem value="donation">Donation Questions</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="media">Media Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Enter the subject of your message"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter your message here..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-sm text-foreground mt-1">{info.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>


            {/* Emergency Contact */}
            <Card className="border-border bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">For urgent matters or emergencies:</p>
                <p className="font-semibold text-foreground">+91 99204 46089</p>
                <p className="text-xs text-muted-foreground mt-1">Available 24/7 for emergency situations</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>Visit our office or find us on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0233456789012!2d72.8533853!3d19.3040151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b167bbe02049%3A0x19667a7b339ad0e!2sAnshika%20Helping%20Hands%20Foundation!5e0!3m2!1sen-GB!2sin!4v1704723456789!5m2!1sen-GB!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anshika Helping Hands Foundation Location"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Shop No. 2, New Sagar Samrat, Opp. Blossoms School, Narmada Nagar, Bhayandar (East), Thane – 401105, Maharashtra, India</p>
                <a 
                  href="https://www.google.com/maps/place/Anshika+Helping+Hands+Foundation/@19.3040151,72.8533853,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b167bbe02049:0x19667a7b339ad0e!8m2!3d19.3040101!4d72.8559602!16s%2Fg%2F11yd6sfds1?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                >
                  Open in Google Maps
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
