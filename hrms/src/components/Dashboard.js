import React, { useState, useEffect } from "react"
import axios from "axios"
import { Bell, Gift, Grid, HelpCircle, Home, Layout, Users, FileText, PieChart, Calendar, DollarSign, Settings, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timesheets, setTimesheets] = useState([])

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timesheets')
        setTimesheets(response.data)
      } catch (error) {
        console.error("Error fetching timesheets:", error)
      }
    }

    fetchTimesheets()
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      "Pending": "bg-pink-500",
      "Submitted": "bg-orange-500",
      "Saved Drafts": "bg-yellow-500",
      "Returned": "bg-blue-500",
      "Approved": "bg-green-500"
    }
    return colors[status] || "bg-gray-500"
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
{/* Sidebar */}
{/* Sidebar */}
<aside className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transition duration-300 ease-in-out transform bg-gradient-to-b from-purple-700 to-indigo-800 text-white p-6 flex flex-col md:relative md:translate-x-0`}>
  <div className="flex items-center mb-8">
    <Layout className="w-8 h-8 mr-2" />
    <span className="text-2xl font-bold">MyHR</span>
  </div>
  <nav className="flex-1">
  <ul className="space-y-2">
  {[
    { icon: Home, label: "Dashboard" },
    { icon: Layout, label: "Work Area" },
    { icon: Users, label: "HRMS" },
    { icon: Users, label: "Team" },
    { icon: Calendar, label: "Attendance & Leave" },
    { icon: DollarSign, label: "Payroll" },
    { icon: Settings, label: "Admin & Asset" },
    { icon: FileText, label: "Timesheets" },
    { icon: PieChart, label: "Reports" },
  ].map((item, index) => (
    <li key={index}>
      <Button variant="ghost" className="sidebar-button">
        <div className="icon">
          <item.icon className="w-5 h-5" />
        </div>
        <span>{item.label}</span>
      </Button>
    </li>
  ))}
</ul>

  </nav>
</aside>


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-6 h-6" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Timesheet</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Gift className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Grid className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Timesheets</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">View For</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="avijeet">Avijeet Jaiswal (12359)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <Input type="date" placeholder="From Date" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <Input type="date" placeholder="To Date" className="w-full" />
                </div>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Get Records</Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {timesheets.map((status) => (
              <Card key={status.id} className={`${getStatusColor(status.status)} text-white`}>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <span className="text-lg font-semibold">{status.status}</span>
                  <span className="text-3xl font-bold">{status.count}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Submit Timesheet</Button>
          </div>
        </main>
      </div>
    </div>
  )
}