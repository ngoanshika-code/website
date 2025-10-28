"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Instagram, Facebook, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/donation", label: "Donation" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Bar with Contact Info */}
      <div className="hidden md:flex justify-end items-center h-8 px-4 sm:px-6 lg:px-8 bg-primary/5 text-sm">
        <div className="flex items-center space-x-6">
          <a href="tel:+919920446089" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            <span>+91 99204 46089</span>
          </a>
          <a href="mailto:anshikahelpinghandsfoundation@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            <span>anshikahelpinghandsfoundation@gmail.com</span>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Anshika Helping Hands Foundation"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-lg text-foreground">Anshika Helping Hands Foundation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/donation/form">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Contact Info */}
              <div className="px-3 py-2 border-t border-border mt-2 space-y-2">
                <a href="tel:+919920446089" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+91 99204 46089</span>
                </a>
                <a href="mailto:anshikahelpinghandsfoundation@gmail.com" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs break-all">anshikahelpinghandsfoundation@gmail.com</span>
                </a>
              </div>
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/donation/form">Donate Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
