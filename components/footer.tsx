import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"
import { TermsAndConditions } from "@/components/terms-and-conditions"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="Anshika Helping Hands Foundation"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-lg text-foreground">Anshika Helping Hands Foundation</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Dedicated to creating positive change in communities through compassionate action, education, and
              sustainable development programs.
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Heart className="h-4 w-4 text-primary mr-2" />
              Making a difference, one life at a time
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <Link 
                href="https://www.instagram.com/anshikahelpinghands?igsh=cnZpa3M4ZXd0dXZo" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </Link>
              <Link 
                href="https://www.facebook.com/share/1BAfy4GJcE/?mibextid=wwXIfr" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </Link>
              <Link 
                href="mailto:anshikahelpinghandsfoundation@gmail.com"
                className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
              </Link>
              <Link 
                href="https://share.google/lv8Tan60Ino69gCx1" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors"
              >
                <MapPin className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/donation" className="text-muted-foreground hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <a href="mailto:anshikahelpinghandsfoundation@gmail.com" className="text-sm hover:text-primary transition-colors">
                  anshikahelpinghandsfoundation@gmail.com
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <a href="tel:+919920446089" className="text-sm hover:text-primary transition-colors">
                  +91 99204 46089
                </a>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin className="h-4 w-4 mr-3 text-primary mt-0.5" />
                <a 
                  href="https://share.google/lv8Tan60Ino69gCx1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors"
                >
                  View Location on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
              <p className="text-muted-foreground">© 2025 Anshika Helping Hands Foundation. All rights reserved.</p>
              <p className="text-muted-foreground/70 text-xs">
                Develop by{" "}
                <Link 
                  href="https://www.aitiksoftware.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  AITIK Software pvt ltd
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <TermsAndConditions triggerText="Terms & Conditions" />
              <TermsAndConditions triggerText="Privacy Policy" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
