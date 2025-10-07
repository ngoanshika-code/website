"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Shield,
  Heart,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock authentication - in real app, verify credentials with backend
      if (formData.email === "admin@anshikahelpinghands.org" && formData.password === "admin123") {
        // Store user session (in real app, use proper session management)
        localStorage.setItem("user", JSON.stringify({
          id: "1",
          name: "Admin User",
          email: formData.email,
          role: "admin",
          loginTime: new Date().toISOString(),
        }))
        
        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setErrors({ general: "Invalid email or password" })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ general: "Login failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const demoCredentials = [
    { label: "Admin", email: "admin@anshikahelpinghands.org", password: "admin123" },
    { label: "Volunteer", email: "volunteer@anshikahelpinghands.org", password: "volunteer123" },
    { label: "Donor", email: "donor@anshikahelpinghands.org", password: "donor123" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Welcome Back
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sign in to your Anshika Helping Hands Foundation account to access your dashboard and manage your contributions.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Sign In
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {errors.general}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <Separator className="my-6" />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demo Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Demo Credentials
                </CardTitle>
                <CardDescription>
                  Use these credentials to test different user roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demoCredentials.map((cred, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="font-medium text-sm">{cred.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <div>Email: {cred.email}</div>
                        <div>Password: {cred.password}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            email: cred.email,
                            password: cred.password,
                          }))
                        }}
                      >
                        Use These Credentials
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  About Anshika Helping Hands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Join our mission to create positive change in communities across India through 
                  education, healthcare, food security, and women empowerment programs.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="font-bold text-primary">15,000+</div>
                    <div className="text-muted-foreground">Lives Transformed</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/10 rounded-lg">
                    <div className="font-bold text-secondary">120+</div>
                    <div className="text-muted-foreground">Communities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Secure Login</h3>
                  <p className="text-sm text-muted-foreground">
                    Your login information is encrypted and secure. We use industry-standard 
                    security measures to protect your data.
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
