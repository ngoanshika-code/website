import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'

export async function GET() {
  try {
    await connectDB()
    
    // Test MongoDB connection
    const count = await Campaign.countDocuments()
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      campaignCount: count
    })
  } catch (error) {
    console.error('MongoDB connection test failed:', error)
    return NextResponse.json(
      { success: false, error: 'MongoDB connection failed' },
      { status: 500 }
    )
  }
}

