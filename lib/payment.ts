// Payment integration utilities for Razorpay
// This file contains the payment gateway integration logic

export interface PaymentOptions {
  amount: number
  currency: string
  orderId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  description: string
  notes?: Record<string, string>
}

export interface PaymentResponse {
  success: boolean
  paymentId?: string
  orderId?: string
  error?: string
}

// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890'
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'test_secret_key'

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Create Razorpay order (server-side)
export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    const response = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create order')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

// Initialize Razorpay payment
export const initializePayment = async (options: PaymentOptions): Promise<PaymentResponse> => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script')
    }

    // Create order
    const order = await createRazorpayOrder(options.amount, options.currency)

    // Initialize Razorpay
    const razorpay = new (window as any).Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: options.amount * 100, // Convert to paise
      currency: options.currency,
      name: 'Anshika Helping Hands Foundation',
      description: options.description,
      order_id: order.id,
      prefill: {
        name: options.customerName,
        email: options.customerEmail,
        contact: options.customerPhone,
      },
      notes: options.notes || {},
      theme: {
        color: '#f97316', // Orange color matching the theme
      },
      handler: function (response: any) {
        console.log('Payment successful:', response)
        // Handle successful payment
        return {
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        }
      },
      modal: {
        ondismiss: function () {
          console.log('Payment modal dismissed')
          return {
            success: false,
            error: 'Payment cancelled by user',
          }
        },
      },
    })

    // Open payment modal
    razorpay.open()

    // Return a promise that resolves when payment is completed
    return new Promise((resolve) => {
      razorpay.on('payment.success', (response: any) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        })
      })

      razorpay.on('payment.error', (error: any) => {
        resolve({
          success: false,
          error: error.description || 'Payment failed',
        })
      })
    })
  } catch (error) {
    console.error('Payment initialization error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment initialization failed',
    }
  }
}

// Verify payment (server-side)
export const verifyPayment = async (paymentId: string, orderId: string, signature: string) => {
  try {
    const response = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        orderId,
        signature,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to verify payment')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

// Format amount for display
export const formatAmount = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Validate payment amount
export const validateAmount = (amount: number): { valid: boolean; error?: string } => {
  if (amount < 100) {
    return { valid: false, error: 'Minimum donation amount is ₹100' }
  }
  if (amount > 1000000) {
    return { valid: false, error: 'Maximum donation amount is ₹10,00,000' }
  }
  return { valid: true }
}

// Payment methods configuration
export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NET_BANKING: 'netbanking',
  WALLET: 'wallet',
} as const

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS]

// Get payment method display name
export const getPaymentMethodName = (method: PaymentMethod): string => {
  const names = {
    [PAYMENT_METHODS.CARD]: 'Credit/Debit Card',
    [PAYMENT_METHODS.UPI]: 'UPI/Digital Wallet',
    [PAYMENT_METHODS.NET_BANKING]: 'Net Banking',
    [PAYMENT_METHODS.WALLET]: 'Digital Wallet',
  }
  return names[method] || 'Unknown'
}
