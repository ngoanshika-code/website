"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  Users,
  GraduationCap,
  Stethoscope,
  Home,
  Utensils,
  HandHeart,
  TrendingUp,
  Award,
  Clock,
  LogOut,
  Settings,
  Bell,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false)
  const [showCampaignsTable, setShowCampaignsTable] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const fetchCampaigns = async () => {
    setIsLoadingCampaigns(true)
    try {
      const response = await fetch('/api/campaigns')
      const result = await response.json()
      
      if (result.success) {
        setCampaigns(result.campaigns)
      } else {
        console.error("Failed to fetch campaigns:", result.error)
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setIsLoadingCampaigns(false)
    }
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Remove the campaign from the local state
        setCampaigns(campaigns.filter(campaign => campaign._id !== campaignId))
        alert('Campaign deleted successfully!')
      } else {
        alert('Failed to delete campaign')
      }
    } catch (error) {
      console.error('Error deleting campaign:', error)
      alert('Error deleting campaign')
    }
  }

  const handleEditCampaign = (campaignId: string) => {
    // Navigate to edit page (you can create this page later)
    router.push(`/dashboard/campaigns/edit/${campaignId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userStats = [
    { label: "Total Donations", value: "₹25,000", icon: Heart, color: "text-red-500" },
    { label: "Volunteer Hours", value: "120 hrs", icon: Clock, color: "text-blue-500" },
    { label: "Events Attended", value: "8", icon: Calendar, color: "text-green-500" },
    { label: "Impact Score", value: "95%", icon: TrendingUp, color: "text-purple-500" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "donation",
      title: "Donated ₹5,000 to Education Fund",
      description: "Supporting digital learning centers for underprivileged children",
      date: "2024-01-15",
      amount: "₹5,000",
      status: "completed",
    },
    {
      id: 2,
      type: "volunteer",
      title: "Volunteered at Health Camp",
      description: "Mobile health clinic in rural village - 8 hours",
      date: "2024-01-12",
      amount: null,
      status: "completed",
    },
    {
      id: 3,
      type: "donation",
      title: "Monthly Recurring Donation",
      description: "General fund contribution - automatic payment",
      date: "2024-01-01",
      amount: "₹2,500",
      status: "completed",
    },
    {
      id: 4,
      type: "event",
      title: "Women Empowerment Workshop",
      description: "Attended entrepreneurship training session",
      date: "2023-12-28",
      amount: null,
      status: "completed",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Health Camp",
      date: "2024-01-25",
      time: "9:00 AM - 5:00 PM",
      location: "Village Health Center, Delhi",
      volunteers: 15,
      maxVolunteers: 20,
    },
    {
      id: 2,
      title: "Education Drive Launch",
      date: "2024-02-01",
      time: "10:00 AM - 2:00 PM",
      location: "Community Center, Mumbai",
      volunteers: 8,
      maxVolunteers: 12,
    },
    {
      id: 3,
      title: "Food Distribution Program",
      date: "2024-02-05",
      time: "8:00 AM - 12:00 PM",
      location: "Slum Area, Bangalore",
      volunteers: 25,
      maxVolunteers: 30,
    },
  ]

  const donationCategories = [
    { name: "Education & Skills", amount: "₹15,000", percentage: 60, icon: GraduationCap, color: "text-blue-500" },
    { name: "Healthcare & Wellness", amount: "₹5,000", percentage: 20, icon: Stethoscope, color: "text-green-500" },
    { name: "Food Security", amount: "₹3,000", percentage: 12, icon: Utensils, color: "text-orange-500" },
    { name: "Women Empowerment", amount: "₹2,000", percentage: 8, icon: HandHeart, color: "text-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground">
                  Here's your impact dashboard and recent activities
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* User Stats */}
            {userStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaigns Management */}
              {user.role === 'admin' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-primary" />
                          Campaign Management
                        </CardTitle>
                        <CardDescription>Manage donation campaigns</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setShowCampaignsTable(!showCampaignsTable)
                            if (!showCampaignsTable && campaigns.length === 0) {
                              fetchCampaigns()
                            }
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {showCampaignsTable ? 'Hide' : 'View'} Campaigns
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="/donation/form">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Campaign
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {showCampaignsTable && (
                    <CardContent>
                      {isLoadingCampaigns ? (
                        <div className="text-center py-8">
                          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-muted-foreground">Loading campaigns...</p>
                        </div>
                      ) : campaigns.length === 0 ? (
                        <div className="text-center py-8">
                          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
                          <p className="text-muted-foreground mb-4">Create your first campaign to get started</p>
                          <Button asChild>
                            <Link href="/donation/form">Create Campaign</Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-sm text-muted-foreground">
                            {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} found
                          </div>
                          <div className="border border-border rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[800px]">
                                <thead className="bg-muted/50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Campaign</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Goal</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Raised</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Created</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground min-w-[200px]">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  {campaigns.map((campaign) => (
                                    <tr key={campaign._id} className="hover:bg-muted/30 transition-colors">
                                      <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                              src={campaign.featuredImage || campaign.images?.[0] || "https://res.cloudinary.com/djyp5yzil/image/upload/v1759814188/donation-campaigns/placeholder.svg"}
                                              alt={campaign.title}
                                              width={48}
                                              height={48}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          <div>
                                            <div className="font-medium text-sm line-clamp-1">{campaign.title}</div>
                                            <div className="text-xs text-muted-foreground line-clamp-1">{campaign.description}</div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3">
                                        <Badge variant="outline" className="text-xs">
                                          {campaign.categoryName}
                                        </Badge>
                                      </td>
                                      <td className="px-4 py-3 text-sm">
                                        ₹{campaign.goalAmount?.toLocaleString() || 0}
                                      </td>
                                      <td className="px-4 py-3 text-sm">
                                        <div className="text-green-600 font-medium">
                                          ₹{campaign.raisedAmount?.toLocaleString() || 0}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {campaign.progress || 0}%
                                        </div>
                                      </td>
                                      <td className="px-4 py-3">
                                        <Badge 
                                          variant={campaign.status === 'active' ? 'default' : 
                                                  campaign.status === 'completed' ? 'secondary' : 'destructive'}
                                          className="text-xs"
                                        >
                                          {campaign.status}
                                        </Badge>
                                      </td>
                                      <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(campaign.createdAt).toLocaleDateString()}
                                      </td>
                                      <td className="px-4 py-3 min-w-[200px]">
                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="h-8 px-3"
                                            title="View Campaign"
                                          >
                                            <Link href={`/donation/${campaign._id}`}>
                                              <Eye className="h-4 w-4 mr-1" />
                                              View
                                            </Link>
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 px-3"
                                            title="Edit Campaign"
                                            onClick={() => handleEditCampaign(campaign._id)}
                                          >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            className="h-8 px-3"
                                            title="Delete Campaign"
                                            onClick={() => handleDeleteCampaign(campaign._id)}
                                          >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              )}

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Your latest contributions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'donation' ? 'bg-red-100' :
                          activity.type === 'volunteer' ? 'bg-blue-100' :
                          'bg-green-100'
                        }`}>
                          {activity.type === 'donation' ? <Heart className="h-4 w-4 text-red-500" /> :
                           activity.type === 'volunteer' ? <Users className="h-4 w-4 text-blue-500" /> :
                           <Calendar className="h-4 w-4 text-green-500" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{activity.date}</span>
                            {activity.amount && <span className="font-semibold text-primary">{activity.amount}</span>}
                            <Badge variant="outline" className="text-xs">
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>Events you can participate in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                {event.volunteers}/{event.maxVolunteers} volunteers
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm">
                              Join Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Member since 2023</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Donation Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Donation Breakdown
                  </CardTitle>
                  <CardDescription>Your contributions by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donationCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <category.icon className={`h-4 w-4 ${category.color}`} />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <span className="text-sm font-semibold">{category.amount}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-orange-500' : 'bg-pink-500'
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">₹25,000</div>
                    <div className="text-sm text-muted-foreground">Total Donated</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/donation/form">
                      <Heart className="h-4 w-4 mr-2" />
                      Make a Donation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipts
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Volunteer Opportunities
                  </Button>
                </CardContent>
              </Card>

              {/* Impact Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">15</div>
                      <div className="text-sm text-muted-foreground">Lives Impacted</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Through your donations and volunteer work, you've directly impacted 
                      the lives of 15 individuals in our communities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}