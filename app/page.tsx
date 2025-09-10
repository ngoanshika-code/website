"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
      image: "/diverse-group-of-volunteers-helping-community-memb.jpg",
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
      image: "/mobile-health-clinic-in-rural-area.jpg",
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
      image: "/women-entrepreneurs-working-together.jpg",
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/diverse-group-of-volunteers-helping-community-memb.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 via-red-400/80 to-pink-400/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
            <motion.div 
              className="relative"
              key={currentSlide}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideIn}
            >
              {/* Main Content */}
              <motion.h1 
                className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 text-balance leading-tight"
                variants={fadeInUp}
              >
                {heroSlides[currentSlide].title.includes("Helping Hands") ? (
                  <>
                    SUPPORT COMMUNITIES WITH <span className="text-blue-200 drop-shadow-lg">ANSHIKA HELPING HANDS</span>
                  </>
                ) : heroSlides[currentSlide].title.includes("Healthcare") ? (
                  <>
                    <span className="text-blue-200 drop-shadow-lg">HEALTHCARE ACCESS</span> FOR EVERY COMMUNITY
                  </>
                ) : (
                  <>
                    <span className="text-blue-200 drop-shadow-lg">WOMEN EMPOWERMENT</span> & LEADERSHIP
                  </>
                )}
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl text-white/90 mb-8 text-pretty leading-relaxed max-w-2xl"
                variants={fadeInUp}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full text-lg lg:text-xl shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/donation">DONATE NOW</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Blue Circular Frame */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-6 border-blue-500 shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <Image
                    src={heroSlides[currentSlide].image || "/placeholder.svg"}
                    alt="Hero slide"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Badges */}
                {heroSlides[currentSlide].badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${
                      badge.position === "top-left"
                        ? "-top-3 -left-6"
                        : badge.position === "top-right"
                          ? "-top-3 -right-6"
                          : badge.position === "bottom-left"
                            ? "-bottom-3 -left-6"
                            : "-bottom-3 -right-6"
                    } bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <badge.icon className="h-3.5 w-3.5 text-orange-500" />
                    <span className="text-xs font-semibold text-gray-800">{badge.text}</span>
                  </motion.div>
                ))}
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

        {/* Social Media Icons */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
          <div className="bg-pink-600 hover:bg-pink-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24 5.367 18.641.001.012.001z" />
            </svg>
          </div>
          <div className="bg-red-600 hover:bg-red-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <div className="bg-green-600 hover:bg-green-700 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
        </div>

        {/* WhatsApp Fixed Button */}
        <div className="fixed bottom-6 left-6 z-30">
          <div className="bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-2xl cursor-pointer transition-all duration-200 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
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
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/donation">Start Donating</Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">Get Involved</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
