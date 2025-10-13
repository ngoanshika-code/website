"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  BookOpen,
  Utensils,
  Home,
  Stethoscope,
  Award,
  Globe,
  HandHeart,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Shield,
  Gift,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  const slideIn = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.5, ease: "easeInOut" }
  }

  const heroSlides = [
    {
      title: "Extending Helping Hands to Build Better Communities",
      subtitle: "Transforming Lives Since 2015",
      description:
        "Join Anshika Helping Hands Foundation in our mission to create lasting positive change through compassionate action, quality education, healthcare access, and sustainable community development programs that transform lives across India.",
      image: "/Anshika1.jpeg",
      stats: { number: "15,000+", label: "Lives Transformed" },
      secondaryStat: { number: "120+", label: "Communities" },
      badges: [
        { text: "Tax Exemption", icon: Shield, position: "top-left" },
        { text: "Verified NGO", icon: CheckCircle, position: "top-right" },
        { text: "Timely Updates", icon: Clock, position: "bottom-left" },
        { text: "Donate Products", icon: Gift, position: "bottom-right" },
      ],
    },
    {
      title: "Healthcare Access for Every Community",
      subtitle: "Healing Hearts, Saving Lives",
      description:
        "Through mobile health clinics, preventive care programs, and mental health support, we ensure that quality healthcare reaches even the most remote communities across India.",
      image: "/anshika2.jpeg",
      stats: { number: "25+", label: "Health Camps" },
      secondaryStat: { number: "10,000+", label: "Patients Treated" },
      badges: [
        { text: "Free Treatment", icon: Heart, position: "top-left" },
        { text: "Mobile Clinics", icon: Stethoscope, position: "top-right" },
        { text: "24/7 Support", icon: Clock, position: "bottom-left" },
        { text: "Expert Doctors", icon: Award, position: "bottom-right" },
      ],
    },
    {
      title: "Women Empowerment & Leadership",
      subtitle: "Inspiring Change, Creating Leaders",
      description:
        "Our women empowerment programs focus on entrepreneurship training, leadership development, and creating self-help groups that enable women to achieve economic independence.",
      image: "/Anshika3.jpeg",
      stats: { number: "500+", label: "Women Empowered" },
      secondaryStat: { number: "50+", label: "Self-Help Groups" },
      badges: [
        { text: "Skill Training", icon: GraduationCap, position: "top-left" },
        { text: "Micro Finance", icon: Gift, position: "top-right" },
        { text: "Leadership Dev", icon: Users, position: "bottom-left" },
        { text: "Success Stories", icon: Award, position: "bottom-right" },
      ],
    },
  ]

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const impactStats = [
    { number: "15,000+", label: "Lives Transformed", icon: Heart },
    { number: "120+", label: "Communities Served", icon: Users },
    { number: "85+", label: "Education Programs", icon: BookOpen },
    { number: "500+", label: "Active Volunteers", icon: Users },
    { number: "25+", label: "Healthcare Camps", icon: Stethoscope },
    { number: "50+", label: "Awards Received", icon: Award },
  ]

  const programs = [
    {
      title: "Education & Skill Development",
      description:
        "Comprehensive education programs, vocational training, and digital literacy initiatives for sustainable growth.",
      icon: GraduationCap,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Healthcare & Wellness",
      description:
        "Mobile health clinics, preventive care programs, and mental health support for holistic well-being.",
      icon: Stethoscope,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Food Security & Nutrition",
      description: "Community kitchens, nutrition education, and sustainable farming initiatives to combat hunger.",
      icon: Utensils,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Shelter & Infrastructure",
      description: "Safe housing projects, clean water access, and community infrastructure development programs.",
      icon: Home,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Women Empowerment",
      description:
        "Self-help groups, entrepreneurship training, and leadership development for women's economic independence.",
      icon: HandHeart,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Environmental Conservation",
      description: "Tree plantation drives, waste management, and renewable energy projects for a sustainable future.",
      icon: Globe,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  const successStories = [
    {
      name: "Priya Sharma",
      story:
        "From a small village girl to a successful entrepreneur, our vocational training program helped Priya start her own tailoring business.",
      image: "/young-indian-woman-entrepreneur-smiling.jpg",
      impact: "Now employs 15 women",
    },
    {
      name: "Rajesh Kumar",
      story:
        "Our healthcare program provided life-saving treatment for Rajesh's diabetes, and now he advocates for health awareness in his community.",
      image: "/middle-aged-indian-man-healthcare-volunteer.jpg",
      impact: "Reached 500+ families",
    },
    {
      name: "Anita Devi",
      story:
        "Through our education support, Anita became the first in her family to graduate college and is now a teacher in her village.",
      image: "/young-indian-woman-teacher-with-children.jpg",
      impact: "Teaching 200+ children",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          <Image
            src={heroSlides[currentSlide].image || "/placeholder.svg"}
            alt="Hero background"
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Slider Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 rounded-full p-3 transition-all duration-200 shadow-lg"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 rounded-full p-3 transition-all duration-200 shadow-lg"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="flex flex-col items-center justify-center min-h-screen py-20">
            <motion.div 
              className="relative mt-112"
              key={currentSlide}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideIn}
            >
              {/* Donate Now Button */}
              <motion.div variants={fadeInUp}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full text-lg lg:text-xl shadow-xl"
                  >
                    <Link href="/donation/form">DONATE NOW</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>


      </section>

      <section className="py-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact Across India</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Together with our dedicated volunteers and generous donors, we've created meaningful change in communities
              across multiple states, touching thousands of lives with hope and opportunity.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {impactStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                    index % 3 === 0 ? "bg-primary/10" : index % 3 === 1 ? "bg-accent/10" : "bg-secondary/10"
                  }`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon
                    className={`h-8 w-8 ${
                      index % 3 === 0 ? "text-primary" : index % 3 === 1 ? "text-accent" : "text-secondary"
                    }`}
                  />
                </motion.div>
                <motion.div 
                  className="text-2xl lg:text-3xl font-bold text-foreground mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Comprehensive Programs</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We focus on six key areas to create sustainable positive change, addressing the root causes of poverty and
              inequality while empowering communities to build their own bright futures.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto transition-all duration-300 ${program.bgColor}`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <program.icon className={`h-8 w-8 ${program.color}`} />
                    </motion.div>
                    <CardTitle className="text-xl text-balance">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">{program.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-card to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Stories of Transformation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real stories from real people whose lives have been transformed through our programs and your generous
              support.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <motion.div 
                    className="relative h-48"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-semibold">{story.name}</div>
                      <div className="text-sm opacity-90">{story.impact}</div>
                    </div>
                  </motion.div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-warm-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            Your support can transform lives and build stronger communities. Join us in our mission to create lasting
            positive change across India. Every contribution, no matter the size, makes a meaningful impact.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  <Link href="/donation/form">Start Donating</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent font-semibold"
                >
                  <Link href="/contact">Get Involved</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stories of Transformation Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Real Impact Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Stories of Transformation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every donation creates a ripple effect of positive change. Here are real stories of lives transformed 
              through the generosity of our community.
            </p>
          </motion.div>

          {/* Stories Slider */}
          <motion.div 
            className="relative w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentStoryIndex * 100}%)` }}
              >
                {/* Story 1 */}
                <div className="w-full flex-shrink-0">
                  <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/Anshika1.jpeg"
                      alt="Transformation Story 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8 text-white">
                      <div className="text-center px-8">
                        <div className="flex items-center justify-center gap-8">
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-green-300">150+</div>
                            <div className="text-sm text-white/90">Children Helped</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-green-300">95%</div>
                            <div className="text-sm text-white/90">Success Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-green-300">3</div>
                            <div className="text-sm text-white/90">Teachers Hired</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story 2 */}
                <div className="w-full flex-shrink-0">
                  <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/anshika2.jpeg"
                      alt="Transformation Story 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8 text-white">
                      <div className="text-center px-8">
                        <div className="flex items-center justify-center gap-8">
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-blue-300">500+</div>
                            <div className="text-sm text-white/90">Families Served</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-blue-300">2K+</div>
                            <div className="text-sm text-white/90">Health Checkups</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-blue-300">15</div>
                            <div className="text-sm text-white/90">Villages Covered</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story 3 */}
                <div className="w-full flex-shrink-0">
                  <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/Anshika3.jpeg"
                      alt="Transformation Story 3"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8 text-white">
                      <div className="text-center px-8">
                        <div className="flex items-center justify-center gap-8">
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-orange-300">75</div>
                            <div className="text-sm text-white/90">Homes Built</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-orange-300">300+</div>
                            <div className="text-sm text-white/90">Lives Transformed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-orange-300">5</div>
                            <div className="text-sm text-white/90">Communities</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation Arrows - Positioned on sides */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : 2))}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 p-0 bg-black/50 hover:bg-black/70 border-white/20 text-white backdrop-blur-sm z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStoryIndex((prev) => (prev < 2 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 p-0 bg-black/50 hover:bg-black/70 border-white/20 text-white backdrop-blur-sm z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots Indicator - Positioned at bottom center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStoryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentStoryIndex === index
                      ? "bg-primary scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Be part of the next transformation story. Your donation can change lives today.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/donation/form">
                <Heart className="h-4 w-4 mr-2" />
                Create Your Impact Story
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Floating Social Media Icons */}
      <div className="fixed right-6 top-1/2 translate-y-8 z-30 flex flex-col gap-3">
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/anshikahelpinghands?igsh=cnZpa3M4ZXd0dXZo" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* Facebook */}
        <a 
          href="https://www.facebook.com/share/1BAfy4GJcE/?mibextid=wwXIfr" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>

        {/* Email */}
        <a 
          href="mailto:anshikahelpinghandsfoundation@gmail.com"
          className="bg-red-600 hover:bg-red-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z"/>
          </svg>
        </a>

        {/* Phone */}
        <a 
          href="tel:+919920446089"
          className="bg-green-600 hover:bg-green-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>

        {/* Google Maps */}
        <a 
          href="https://share.google/lv8Tan60Ino69gCx1" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-600 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </a>
      </div>

      <Footer />
    </div>
  )
}
