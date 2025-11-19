"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    // Fetch blogs from localStorage (in a real app, this would be from an API)
    const storedBlogs = localStorage.getItem("blogs")
    if (storedBlogs) {
      try {
        const parsedBlogs = JSON.parse(storedBlogs)
        setBlogs(parsedBlogs.map((blog: any) => ({
          id: blog._id,
          title: blog.title,
          excerpt: blog.subtitle,
          image: blog.image,
          author: blog.author,
          date: blog.date,
          category: blog.category,
          readTime: "5 min read", // Default read time
        })))
      } catch (error) {
        console.error("Error parsing blogs:", error)
      }
    }
  }, [])

  // Animation variants
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-primary/10"
              variants={fadeInUp}
            >
              <BookOpen className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
              variants={fadeInUp}
            >
              Our Blogs
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Stories of impact, inspiration, and transformation from our journey of creating positive change
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">{blog.category}</Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {blogs.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No blogs available</h3>
              <p className="text-muted-foreground">Check back soon for new blog posts</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

