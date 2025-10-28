"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, Target, Eye, Users, Award, Globe, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
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

  const heroSlides = [
    {
      id: 1,
      title: "About Anshika Helping Hands Foundation",
      subtitle: "Serving Communities Since 2015",
      description: "Founded with a vision to create lasting positive change, we have been serving underprivileged communities across India with dedication, compassion, and innovative approaches to social development.",
      image: "/founder-of-ngo-working-with-community-members--ins.jpg",
      icon: Heart,
      stats: { number: "15,000+", label: "Lives Transformed" }
    },
    {
      id: 2,
      title: "Education for All",
      subtitle: "Empowering Through Learning",
      description: "We believe education is the foundation of change. Our 25+ education centers provide quality learning opportunities to children who would otherwise be left behind.",
      image: "/children-studying-in-classroom.jpg",
      icon: Users,
      stats: { number: "25+", label: "Education Centers" }
    },
    {
      id: 3,
      title: "Healthcare Access",
      subtitle: "Bringing Hope & Healing",
      description: "Our mobile health clinics and healthcare initiatives ensure that quality medical care reaches the most remote and underserved communities across India.",
      image: "/mobile-health-clinic-in-rural-area.jpg",
      icon: Heart,
      stats: { number: "50+", label: "Health Camps Annually" }
    },
    {
      id: 4,
      title: "Community Development",
      subtitle: "Building Sustainable Futures",
      description: "We work hand-in-hand with communities to create sustainable development programs that empower people to build better lives for themselves and their families.",
      image: "/diverse-group-of-volunteers-helping-community-memb.jpg",
      icon: Target,
      stats: { number: "120+", label: "Communities Served" }
    }
  ]

  const values = [
    {
      title: "Compassion",
      description:
        "We approach every situation with empathy and understanding, putting people first in all our initiatives.",
      icon: Heart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency in all our actions and financial dealings.",
      icon: Target,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Empowerment",
      description: "We believe in empowering communities to create sustainable positive change from within.",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Innovation",
      description:
        "We continuously seek creative solutions to address complex social challenges with modern approaches.",
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const achievements = [
    {
      year: "2015",
      title: "Foundation Established",
      description: "Started with a small team of 5 volunteers in rural Maharashtra",
      icon: Calendar,
    },
    {
      year: "2017",
      title: "First Education Center",
      description: "Opened our first learning center serving 50 children",
      icon: Target,
    },
    {
      year: "2019",
      title: "Healthcare Initiative",
      description: "Launched mobile health clinics reaching 10,000+ people annually",
      icon: Heart,
    },
    {
      year: "2021",
      title: "National Recognition",
      description: "Received the National NGO Excellence Award for community impact",
      icon: Award,
    },
    {
      year: "2023",
      title: "Multi-State Operations",
      description: "Expanded operations to 8 states across India",
      icon: Globe,
    },
  ]

  const teamMembers = [
    {
      name: "Anshika Sharma",
      role: "Founder & Director",
      image: "/young-indian-woman-entrepreneur-smiling.jpg",
      description: "Social entrepreneur with 10+ years in community development",
      education: "MBA in Social Entrepreneurship",
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Program Director",
      image: "/middle-aged-indian-man-healthcare-volunteer.jpg",
      description: "Medical doctor specializing in rural healthcare delivery",
      education: "MBBS, MD Community Medicine",
    },
    {
      name: "Priya Patel",
      role: "Education Program Manager",
      image: "/young-indian-woman-teacher-with-children.jpg",
      description: "Former teacher with expertise in inclusive education",
      education: "M.Ed in Special Education",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/founder-of-ngo-working-with-community-members--ins.jpg"
            alt="About hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 via-red-400/90 to-pink-400/90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                    <motion.div 
                      className="text-center lg:text-left"
                      initial="initial"
                      animate="animate"
                      variants={staggerContainer}
                    >
                      <motion.div 
                        className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <slide.icon className="h-4 w-4 text-primary" />
                        <span className="text-primary text-sm font-semibold">{slide.subtitle}</span>
                      </motion.div>
                      <motion.h1 
                        className="text-4xl lg:text-5xl font-bold text-white mb-6"
                        variants={fadeInUp}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        className="text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
                        variants={fadeInUp}
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div 
                        className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30"
                        variants={scaleIn}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-3xl font-bold text-white">{slide.stats.number}</div>
                        <div className="text-white/90 text-sm">{slide.stats.label}</div>
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="relative"
                      initial="initial"
                      animate="animate"
                      variants={fadeInRight}
                    >
                      <motion.div 
                        className="relative w-full h-52 lg:h-64 rounded-2xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
          </Carousel>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-6"
                variants={fadeInUp}
              >
                Our Journey of Impact
              </motion.h2>
              <motion.div 
                className="space-y-4 text-muted-foreground leading-relaxed"
                variants={staggerContainer}
              >
                <motion.p variants={fadeInUp}>
                  Anshika Helping Hands Foundation was born from a simple yet powerful belief: that every person
                  deserves access to basic necessities like quality education, healthcare, nutritious food, and safe
                  shelter. What started as a grassroots initiative in a small village in Maharashtra has grown into a
                  comprehensive organization serving over 15,000 people across 8 states in India.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Our journey began in 2015 when our founder, Anshika Sharma, witnessed the struggles of children in her
                  village who couldn't attend school due to poverty. Determined to make a difference, she started with
                  just ₹5,000 of her own savings and a dream to transform lives. Today, we work with a network of 500+
                  passionate volunteers, dedicated staff, and supportive partners to implement programs that create
                  sustainable change.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  We believe that true development comes from within communities themselves. That's why our approach
                  focuses on empowerment, capacity building, and creating local leadership to ensure our impact
                  continues long after our direct involvement. Every program we run is designed with community
                  participation at its core.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  From our humble beginnings, we've grown to operate 25+ education centers, conduct 50+ healthcare camps
                  annually, and provide food security to thousands of families. Our work has been recognized nationally,
                  but our greatest achievement remains the smiles on the faces of those whose lives we've touched.
                </motion.p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <motion.div 
                className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/founder-of-ngo-working-with-community-members--ins.jpg"
                  alt="Our founder working with community"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">States Covered</div>
              </motion.div>
              <motion.div 
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-accent">2015</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey & Milestones</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From a small village initiative to a nationally recognized organization, here are the key milestones that
              mark our journey of creating positive change.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            <motion.div 
              className="space-y-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="border-border hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`p-2 rounded-full ${index % 3 === 0 ? "bg-primary/10" : index % 3 === 1 ? "bg-accent/10" : "bg-secondary/10"}`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <achievement.icon
                                className={`h-5 w-5 ${index % 3 === 0 ? "text-primary" : index % 3 === 1 ? "text-accent" : "text-secondary"}`}
                              />
                            </motion.div>
                            <div>
                              <CardTitle className="text-lg">{achievement.title}</CardTitle>
                              <div className="text-sm font-semibold text-primary">{achievement.year}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="leading-relaxed">{achievement.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </motion.div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Target className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      To empower underprivileged communities across India through comprehensive programs in education,
                      healthcare, nutrition, and shelter, fostering sustainable development and creating opportunities for
                      individuals to build better lives for themselves and their families while preserving their cultural
                      identity and dignity.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4 mx-auto"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Eye className="h-8 w-8 text-secondary" />
                    </motion.div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      A world where every individual has equal access to opportunities for growth and development, where
                      communities are self-sufficient and resilient, and where compassion and solidarity guide our
                      collective efforts toward a more equitable society free from poverty, inequality, and social
                      injustice.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              These fundamental values guide everything we do and shape our approach to community development, ensuring
              we remain true to our mission while adapting to changing needs.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border text-center hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto transition-all duration-300 ${value.bgColor}`}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </motion.div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{value.description}</CardDescription>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our dedicated team of professionals brings together diverse expertise in social work, healthcare,
              education, and community development to drive our mission forward.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <motion.div 
                    className="relative h-64"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </motion.div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium text-base">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">{member.description}</p>
                    <p className="text-xs text-accent font-medium">{member.education}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-warm-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
              These numbers represent real lives transformed, communities empowered, and hope restored.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { number: "15,000+", label: "Lives Transformed" },
              { number: "120+", label: "Communities Served" },
              { number: "25+", label: "Education Centers" },
              { number: "500+", label: "Volunteers" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
