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
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const programData = {
  "education-skill-development": {
    title: "Skill & Education Development",
    subtitle: "Empowering Minds, Building Futures",
    icon: GraduationCap,
    intro: [
      "Education is the first step towards a better life, and skills are what help people build that life.",
      "At AHHF, we make sure that every child and youth gets the support they need to learn, grow, and succeed.",
      "We work on:",
    ],
    bullets: [
      "📚 Providing Educational Support: Distributing free books, stationery, school supplies, and other learning materials to students from underprivileged families.",
      "🎓 Skill Development Programs: Helping people learn practical and job-ready skills like computer knowledge, communication, and technical training so they can earn a stable income.",
      "🧭 Career Guidance & Counseling: Guiding students and youth about the right courses, skills, and career paths that suit their interests and help them achieve success.",
      "💬 Motivational & Awareness Sessions: Encouraging young people to stay positive, keep learning, and work hard toward their dreams.",
    ],
    closing: "Our aim is to build confident individuals who can stand on their own feet and contribute positively to society.",
    gallery: [
      "/children-studying-in-classroom.jpg",
      "/children-learning-with-computers-in-classroom.jpg",
      "/Anshika1.jpeg",
    ],
    stats: [
      { number: "5,000+", label: "Students Educated", icon: BookOpen },
      { number: "50+", label: "Schools Supported", icon: GraduationCap },
      { number: "85+", label: "Programs Launched", icon: Target },
      { number: "95%", label: "Success Rate", icon: CheckCircle },
    ],
  },
  "healthcare-wellness": {
    title: "Healthcare & Wellness",
    subtitle: "Healing Hearts, Saving Lives",
    icon: Stethoscope,
    intro: [
      "Good health is the foundation of a happy life.",
      "Many people in our communities cannot afford regular health check-ups or proper medical guidance — and that's where we step in.",
      "We organize and support:",
    ],
    bullets: [
      "🩺 Free Health Check-up Camps: Bringing doctors and healthcare professionals to local areas so that people can get medical check-ups without spending money.",
      "💊 Free Medical Consultancy: Providing free advice and basic treatment guidance to help people take care of their health.",
      "🍎 Health & Fitness Awareness: Teaching simple ways to stay fit — such as yoga, proper diet, and daily exercise — to improve overall well-being.",
      "📄 Government Health Scheme Assistance: Helping people understand and apply for government health benefits like Ayushman Bharat and other schemes.",
      "❤️ Mental & Emotional Wellness Sessions: Promoting awareness about mental health and stress management to create a more balanced life.",
    ],
    closing: "Our vision is to create a Healthy and Happy India where everyone has access to healthcare and the knowledge to live a healthy lifestyle.",
    gallery: [
      "/mobile-health-clinic-in-rural-area.jpg",
      "/rural-healthcare-facility-construction.jpg",
      "/anshika2.jpeg",
    ],
    stats: [
      { number: "10,000+", label: "Patients Treated", icon: Stethoscope },
      { number: "25+", label: "Health Camps", icon: Heart },
      { number: "50+", label: "Villages Covered", icon: Globe },
      { number: "100%", label: "Free Treatment", icon: Shield },
    ],
  },
  "food-security-nutrition": {
    title: "Food Security & Nutrition",
    subtitle: "Nourishing Bodies, Nourishing Hope",
    icon: Utensils,
    responsibilities: [
      "Community kitchens and meal programs",
      "Nutrition education and awareness campaigns",
      "Sustainable farming and agriculture initiatives",
      "Food bank and distribution centers",
      "School meal programs for children",
      "Kitchen garden development projects",
    ],
    challenges: [
      "Widespread malnutrition in rural areas",
      "Limited access to nutritious food",
      "Food insecurity during natural disasters",
      "Lack of awareness about balanced nutrition",
    ],
    gallery: [
      "/founder-of-ngo-working-with-community-members--ins.jpg",
      "/diverse-group-of-volunteers-helping-community-memb.jpg",
      "/Anshika3.jpeg",
    ],
    stats: [
      { number: "8,000+", label: "Meals Served", icon: Utensils },
      { number: "30+", label: "Community Kitchens", icon: Home },
      { number: "2,000+", label: "Families Fed", icon: Users },
      { number: "12+", label: "Months Running", icon: CheckCircle },
    ],
  },
  "shelter-infrastructure": {
    title: "Shelter & Infrastructure",
    subtitle: "Building Homes, Building Communities",
    icon: Home,
    responsibilities: [
      "Safe housing projects for the homeless",
      "Clean water access and sanitation facilities",
      "Community infrastructure development",
      "Disaster relief and rehabilitation",
      "Road construction and connectivity",
      "Solar power and renewable energy projects",
    ],
    challenges: [
      "Inadequate housing for low-income families",
      "Lack of clean water and sanitation facilities",
      "Poor infrastructure in rural areas",
      "Environmental vulnerabilities and natural disasters",
    ],
    gallery: [
      "/water-well-construction-in-rural-village.jpg",
      "/old-damaged-temple-structure-needing-restoration.jpg",
      "/ancient-temple-construction-site-with-workers.jpg",
    ],
    stats: [
      { number: "150+", label: "Homes Built", icon: Home },
      { number: "500+", label: "Water Wells", icon: Globe },
      { number: "75+", label: "Projects Completed", icon: CheckCircle },
      { number: "1,500+", label: "Lives Improved", icon: Users },
    ],
  },
  "women-empowerment": {
    title: "Women Empowerment",
    subtitle: "Inspiring Change, Creating Leaders",
    icon: HandHeart,
    responsibilities: [
      "Self-help groups and microfinance programs",
      "Entrepreneurship training and support",
      "Leadership development workshops",
      "Legal awareness and rights education",
      "Skill development for economic independence",
      "Domestic violence prevention and support",
    ],
    challenges: [
      "Gender inequality in education and employment",
      "Limited economic opportunities for women",
      "Lack of access to credit and resources",
      "Social and cultural barriers",
    ],
    gallery: [
      "/young-indian-woman-entrepreneur-smiling.jpg",
      "/women-entrepreneurs-working-together.jpg",
      "/young-indian-woman-teacher-with-children.jpg",
    ],
    stats: [
      { number: "500+", label: "Women Empowered", icon: Users },
      { number: "50+", label: "Self-Help Groups", icon: HandHeart },
      { number: "200+", label: "Entrepreneurs", icon: TrendingUp },
      { number: "15+", label: "Awards Won", icon: Award },
    ],
  },
  "environmental-conservation": {
    title: "Environmental Conservation",
    subtitle: "Protecting Nature, Securing Tomorrow",
    icon: Globe,
    intro: [
      "The environment is our home — it gives us air to breathe, water to drink, and food to eat.",
      "At AHHF, we believe it is our duty to protect and care for our planet so that our future generations can also enjoy its beauty.",
      "Our environmental efforts include:",
    ],
    bullets: [
      "🌳 Tree Plantation Drives: Organizing regular plantation events and encouraging people to plant trees in their localities.",
      "🧹 Cleanliness & Awareness Camps: Conducting cleanliness drives in schools, communities, and public areas to promote the importance of hygiene and waste management.",
      "🔄 Reduce, Reuse, Recycle Programs: Teaching people how to manage waste properly and reduce plastic usage.",
      "💧 Water & Energy Conservation Awareness: Guiding families and students on saving water, reducing electricity waste, and living a sustainable lifestyle.",
      "🌎 Eco-Education for Children: Conducting fun and informative sessions for school children to make them understand how to take care of our planet.",
    ],
    closing: "We believe that a clean and green environment means a healthy and safe life for everyone.",
    gallery: [
      "/ancient-temple-with-deity-statue-restoration-work.jpg",
      "/abstract-geometric-shapes.png",
      "/Anshika1.jpeg",
    ],
    stats: [
      { number: "10,000+", label: "Trees Planted", icon: Globe },
      { number: "25+", label: "Clean Villages", icon: Star },
      { number: "15+", label: "Solar Projects", icon: Lightbulb },
      { number: "100%", label: "Sustainable", icon: CheckCircle },
    ],
  },
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programData[params.slug as keyof typeof programData]

  if (!program) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const Icon = program.icon

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-primary/10"
              variants={fadeInUp}
            >
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
              variants={fadeInUp}
            >
              {program.title}
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              {program.subtitle}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/donation/form">
                  Support This Program
                  <Heart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Program Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See our impact in action through these inspiring images from the field.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {program.gallery.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64">
                    <Image src={image} alt={`${program.title} - Image ${index + 1}`} fill className="object-cover" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <Card className="border-border shadow-lg">
              <CardHeader className="pb-4">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                  {program.subtitle}
                </p>
                <CardTitle className="text-3xl mb-6">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 leading-relaxed">
                {/* Intro paragraphs */}
                {program.intro && program.intro.map((text, idx) => (
                  <p key={idx} className="text-muted-foreground text-lg">
                    {text}
                  </p>
                ))}
                
                {/* Bullet points */}
                {program.bullets && (
                  <ul className="mt-6 space-y-4 text-muted-foreground">
                    {program.bullets.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Closing statement */}
                {program.closing && (
                  <p className="pt-4 font-medium text-foreground text-lg">
                    {program.closing}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Together for Better Tomorrow Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  💖 Together for a Better Tomorrow
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                  At Anshika Helping Hands Foundation, we believe that change begins with a helping hand.
                  By supporting education, health, and the environment, we are building a stronger and more compassionate society — one step at a time.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        </div>
        <motion.div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Your support can help us expand our programs and reach more communities in need.
            Together, we can create lasting positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/donation/form">
                Donate Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Get Involved
                <Heart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

