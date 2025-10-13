"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Phone } from "lucide-react"

interface TermsAndConditionsProps {
  triggerText?: string
  triggerClassName?: string
  variant?: "link" | "button"
}

export function TermsAndConditions({ 
  triggerText = "Terms & Conditions", 
  triggerClassName = "",
  variant = "link"
}: TermsAndConditionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const termsContent = `
Terms & Conditions

Anshika Helping Hands Foundation
Contact: +91 8286149546

Welcome to Anshika Helping Hands Foundation ("we," "our," or "us"). By visiting or using our website, you agree to follow the Terms & Conditions below. Please read them carefully.

⸻

1. Purpose of Our NGO
	•	We are a non-profit organization working to support people in need.
	•	All donations and contributions are used only for charitable purposes and welfare activities.

⸻

2. Donations & Payments
	•	Donations made to our NGO are voluntary and non-refundable.
	•	We ensure that all donations are used responsibly for the intended charitable causes.
	•	We do not misuse funds or share donor information with third parties.

⸻

3. Transparency
	•	We maintain proper records of all financial transactions.
	•	Donors can request general updates about how their contributions are being utilized.

⸻

4. Use of Website
	•	Visitors must use our website only for lawful purposes.
	•	Any attempt to misuse, copy, or damage the content of this website is strictly prohibited.

⸻

5. Limitation of Liability
	•	While we try to provide accurate and updated information, we do not guarantee that the website will always be error-free or uninterrupted.
	•	We are not responsible for any loss, damage, or misuse caused due to external links or third-party services.

⸻

6. Privacy Policy
	•	Personal details shared with us (such as name, email, or phone number) will be kept confidential.
	•	We will never sell or misuse donor or visitor information.

⸻

7. Changes to Terms
	•	We may update these Terms & Conditions from time to time.
	•	Any changes will be updated on this page, and continued use of the website will mean acceptance of the new terms.

⸻

8. Contact Us

For any queries, clarifications, or support, please contact us:
📞 +91 8286149546
`

  const renderTrigger = () => {
    if (variant === "button") {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(true)}
          className={triggerClassName}
        >
          {triggerText}
        </Button>
      )
    }
    
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className={`text-muted-foreground hover:text-primary transition-colors underline ${triggerClassName}`}
      >
        {triggerText}
      </button>
    )
  }

  return (
    <>
      {renderTrigger()}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Terms & Conditions
            </DialogTitle>
            <DialogDescription className="text-center">
              Anshika Helping Hands Foundation
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 text-sm leading-relaxed">
              {termsContent.split('\n').map((line, index) => {
                if (line.trim() === '') return <br key={index} />
                
                if (line.includes('⸻')) {
                  return <hr key={index} className="border-border my-4" />
                }
                
                if (line.includes('📞')) {
                  return (
                    <div key={index} className="flex items-center gap-2 text-primary font-semibold">
                      <Phone className="h-4 w-4" />
                      <span>{line.replace('📞', '').trim()}</span>
                    </div>
                  )
                }
                
                if (line.startsWith('\t•')) {
                  return (
                    <div key={index} className="ml-4 flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{line.replace('\t•', '').trim()}</span>
                    </div>
                  )
                }
                
                if (line.includes(':')) {
                  return (
                    <h3 key={index} className="font-semibold text-foreground mt-6 mb-2">
                      {line}
                    </h3>
                  )
                }
                
                if (line.includes('Contact:')) {
                  return (
                    <div key={index} className="text-center text-lg font-semibold text-primary">
                      {line}
                    </div>
                  )
                }
                
                if (line.includes('Welcome to') || line.includes('By visiting')) {
                  return (
                    <p key={index} className="text-muted-foreground italic">
                      {line}
                    </p>
                  )
                }
                
                return (
                  <p key={index} className="text-foreground">
                    {line}
                  </p>
                )
              })}
            </div>
          </ScrollArea>
          
          <div className="flex justify-center pt-4">
            <Button onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
