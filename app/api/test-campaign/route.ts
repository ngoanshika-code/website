import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'

export async function POST() {
  try {
    await connectDB()
    
    // Create a minimal test campaign
    const testCampaign = new Campaign({
      title: 'Test Campaign',
      description: 'This is a test campaign',
      goalAmount: 1000,
      raisedAmount: 0,
      backersCount: 0,
      daysLeft: 30,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      location: 'Test Location',
      organizer: 'Test Organizer',
      category: 'test',
      categoryName: 'Test Category',
      status: 'active',
      progress: 0,
      expectedBeneficiaries: 10,
      expectedDuration: '1 month',
      impactDescription: 'Test impact',
      taxDeductible: true,
      securePayment: true,
      transparentReporting: true,
      milestones: [
        { amount: 500, description: 'Half way', completed: false },
        { amount: 1000, description: 'Complete', completed: false }
      ],
      images: ['https://res.cloudinary.com/djyp5yzil/image/upload/donation-campaigns/placeholder'],
      featuredImage: 'https://res.cloudinary.com/djyp5yzil/image/upload/donation-campaigns/placeholder'
    })
    
    await testCampaign.save()
    
    return NextResponse.json({
      success: true,
      message: 'Test campaign created successfully',
      campaign: testCampaign
    })
  } catch (error) {
    console.error('Test campaign creation failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

