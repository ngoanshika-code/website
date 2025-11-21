"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, Target, Users, Sprout, Handshake, Stethoscope, GraduationCap, Shield } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

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

  const values = [
    {
      title: "💖 Compassion",
      description:
        "We believe kindness can change lives. Every action we take begins with empathy and the desire to ease someone's pain or struggle. We treat everyone with respect, care, and understanding — because helping others is at the heart of who we are.",
      icon: Heart,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "🌱 Integrity",
      description:
        "We work with honesty, transparency, and accountability in all our programs and partnerships. Every donation, every effort, and every project is handled with complete sincerity and responsibility.",
      icon: Shield,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "🎓 Empowerment",
      description: "We don't just give help — we build strength. Through education, skills, and awareness, we empower individuals to become self-reliant and confident to create their own success.",
      icon: GraduationCap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "🩺 Commitment to Service",
      description:
        "Our promise is to serve those who need us the most. We are dedicated to making a real difference, not just through words but through consistent and meaningful action.",
      icon: Stethoscope,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "🌍 Sustainability",
      description:
        "We believe in creating long-lasting solutions that benefit both people and the planet. From education to healthcare to environmental programs, our focus is always on sustainable impact for future generations.",
      icon: Sprout,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "🤝 Unity & Collaboration",
      description:
        "We know that true change happens when people come together. By working hand in hand with communities, volunteers, partners, and supporters, we build stronger and more connected societies.",
      icon: Handshake,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  const teamMembers = [
    {
      name: "Pankaj Mishra",
      role: "Trustee & Founder",
      description: "A visionary leader and a devoted father whose personal journey inspired the creation of the foundation. Pankaj leads with compassion, guiding every initiative to ensure help reaches those who need it the most.",
    },
    {
      name: "Nisha Mishra",
      role: "Member",
      description: "A strong pillar of support and dedication, Nisha contributes actively to women empowerment and health awareness programs. Her caring nature and community spirit keep the foundation's heart alive.",
    },
    {
      name: "Kishan Suthar",
      role: "Member",
      description: "Focused on education and youth development, Kishan works closely with local communities to provide learning opportunities and skill-based programs for underprivileged children and young adults.",
    },
    {
      name: "Amit Shukla",
      role: "Member",
      description: "A passionate advocate for environmental care and community well-being, Amit helps organize awareness drives and sustainability projects that promote clean and green living.",
    },
    {
      name: "Shubham Dubey",
      role: "Member",
      description: "Dedicated to community service and social development, Shubham brings passion and commitment to our foundation's mission of creating positive change.",
    },
    {
      name: "Ankit Mishra",
      role: "Member",
      description: "An active contributor to our programs, Ankit works tirelessly to support our initiatives and help make a meaningful impact in the communities we serve.",
    },
    {
      name: "Jitendra Upadhyay",
      role: "Member",
      description: "Committed to our cause, Jitendra plays a vital role in organizing and executing our various programs, ensuring they reach those who need them most.",
    },
  ]

  // Carousel autoplay state
  const [teamCarouselApi, setTeamCarouselApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // Autoplay functionality for team carousel
  useEffect(() => {
    if (!teamCarouselApi) return

    setCurrent(teamCarouselApi.selectedScrollSnap())

    teamCarouselApi.on("select", () => {
      setCurrent(teamCarouselApi.selectedScrollSnap())
    })
  }, [teamCarouselApi])

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (!teamCarouselApi) return

    const interval = setInterval(() => {
      teamCarouselApi.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [teamCarouselApi])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">🌟 About Us</h2>
            <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-6">The Heart Behind Anshika Helping Hands Foundation (AHHF)</h3>
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Every great mission begins with a personal story — a story of courage, compassion, and the will to create change.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Anshika Helping Hands Foundation was founded with love and hope by Mr. Pankaj, a devoted father who turned his family&apos;s struggle into a mission to serve others.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="max-w-5xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            {/* Anshika's Story */}
            <Card className="border-border shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl lg:text-3xl mb-2">💖 The Story of Anshika – The Inspiration Behind Our Name</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-muted-foreground leading-relaxed text-base lg:text-lg">
                <p>
                  Anshika, the second child of our trustee Mr. Pankaj, was born a happy and smiling baby.
                </p>
                <p>
                  When she was just 2 years old, her parents discovered that she had a hearing disability. The news came as a shock — their world stopped for a moment.
                </p>
                <p>
                  Doctors advised that an urgent ear operation was needed, costing around ₹8–15 lakhs, a huge amount for the family.
                </p>
                <p>
                  Pankaj tried everything — he approached hospitals, applied for government schemes, and sought support for over a year and a half. Unfortunately, no help came.
                </p>
                <p>
                  In the end, Pankaj and his wife decided to sell her jewelry to arrange the money for Anshika&apos;s operation.
                </p>
                <p>
                  Finally, after months of struggle, the operation was successful.
                </p>
                <div className="p-6 bg-primary/5 rounded-lg border-l-4 border-primary my-6">
                  <p className="font-semibold text-foreground text-lg mb-2">
                    The day Anshika heard her father&apos;s voice for the first time, tears of joy rolled down his cheeks — and that moment changed everything.
                  </p>
                </div>
                <p className="font-semibold text-primary text-lg mt-6">
                  That was the day Pankaj made a promise to himself —
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-4 italic text-foreground font-medium text-lg lg:text-xl bg-primary/5 rounded-r-lg my-6">
                  &quot;If God has given me the strength to overcome this struggle, I will dedicate my life to helping others who face the same pain.&quot;
                </blockquote>
                <p className="font-semibold text-foreground text-lg mt-6">
                  And from that promise, Anshika Helping Hands Foundation (AHHF) was born.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Mission Section */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <Card className="border-border shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl lg:text-3xl mb-4">🌱 Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                    To bring positive change in society by helping people in three important areas of life — where Anshika&apos;s story continues to inspire hope and action:
                  </p>
                  
                  <div className="space-y-4 mt-6">
                    <div className="p-5 bg-primary/5 rounded-lg border-l-4 border-primary hover:bg-primary/10 transition-colors">
                      <h4 className="font-semibold text-lg mb-3">Skill & Education Development</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                        We help individuals, especially youth, learn useful skills and get career guidance so they can earn and live with dignity.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-2 text-sm lg:text-base">
                        Pankaj never wants anyone to suffer due to a lack of money or opportunity the way he once did.
                      </p>
                    </div>

                    <div className="p-5 bg-accent/5 rounded-lg border-l-4 border-accent hover:bg-accent/10 transition-colors">
                      <h4 className="font-semibold text-lg mb-3">Healthcare & Wellness</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                        We organize free health check-up camps, consultations, and awareness programs so that no one is left untreated because of financial struggle — just like Anshika once was.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-2 text-sm lg:text-base">
                        A healthy family is the foundation of a happy community.
                      </p>
                    </div>

                    <div className="p-5 bg-secondary/5 rounded-lg border-l-4 border-secondary hover:bg-secondary/10 transition-colors">
                      <h4 className="font-semibold text-lg mb-3">Environmental Conservation</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                        We believe that a clean and green environment is the root of good health and peace of mind.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-2 text-sm lg:text-base">
                        When nature is healthy, our lives are balanced.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-2 text-sm lg:text-base">
                        That&apos;s why we conduct cleanliness drives, tree plantations, and awareness programs for a sustainable future.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Section */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <Card className="border-border shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl lg:text-3xl mb-4">🌍 Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                    To create a compassionate India where no one suffers in silence — where every child can learn, every person can access healthcare, and every community thrives in a clean environment.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                    We dream of expanding our support across India, reaching every corner where people need help, guidance, and hope.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Together We Can Make a Difference */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Card className="border-border shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl lg:text-3xl mb-4">💫 Together, We Can Make a Difference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  At Anshika Helping Hands Foundation, every small act of kindness counts.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  We invite you to join us — as a volunteer, supporter, or donor — and be part of a movement that began with a little girl&apos;s smile and a father&apos;s unbreakable hope.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-4 italic text-foreground font-medium mt-6 text-lg lg:text-xl bg-primary/10 rounded-r-lg max-w-2xl mx-auto">
                  &quot;Helping one person might not change the world, but it could change the world for that one person.&quot;
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">🌟 Our Core Values</h2>
            <div className="text-muted-foreground max-w-2xl mx-auto leading-relaxed space-y-3">
              <p className="text-base lg:text-lg">
                These fundamental values guide everything we do and shape our approach to community development.
              </p>
              <p className="text-base lg:text-lg">
                They remind us to stay true to our mission while growing and adapting to the changing needs of society.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border text-center hover:shadow-xl transition-all duration-300 group h-full">
                  <CardHeader className="pb-4">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full mb-4 mx-auto transition-all duration-300 ${value.bgColor}`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon className={`h-8 w-8 lg:h-10 lg:w-10 ${value.color}`} />
                    </motion.div>
                    <CardTitle className="text-lg lg:text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed text-sm lg:text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-card to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">👥 Meet Our Leadership Team</h2>
            <div className="text-muted-foreground max-w-2xl mx-auto leading-relaxed space-y-3">
              <p className="text-base lg:text-lg">
                Our strength lies in our people — a passionate team committed to serving communities with compassion, honesty, and purpose.
              </p>
              <p className="text-base lg:text-lg">
                Each member of Anshika Helping Hands Foundation brings unique experience in social work, healthcare, education, and community development, working together to make a real difference in people&apos;s lives.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-12 lg:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-8 lg:mb-12 text-center">🌟 Leadership & Core Members</h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setTeamCarouselApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {teamMembers.map((member, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <motion.div
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeInUp}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-border hover:shadow-xl transition-all duration-300 h-full">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg lg:text-xl mb-2">{member.name}</CardTitle>
                          <CardDescription className="text-primary font-medium text-sm lg:text-base">{member.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">{member.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-background/80 hover:bg-background border-border" />
              <CarouselNext className="right-0 bg-background/80 hover:bg-background border-border" />
            </Carousel>
          </motion.div>

          {/* Extended Team Section */}
          <motion.div 
            className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t-2 border-border"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">💫 Our Extended Team</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Beyond our core members, many more volunteers, supporters, and field workers form the backbone of our foundation.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  They work tirelessly in different parts of India — organizing health camps, educational drives, and environmental awareness programs — spreading the message of kindness and hope every day.
                </p>
                <p className="text-muted-foreground leading-relaxed font-medium text-base lg:text-lg mt-6">
                  Together, we are building a movement where every helping hand creates a stronger, healthier, and happier India.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
