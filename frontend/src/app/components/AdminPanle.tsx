"use client";
import React from "react";

import {
  Filter,
  Upload,
  CheckCircle,
  AlertCircle,
  UserCheck,
  ClipboardList,
  Eye,
} from "lucide-react"; // Lucide React icons
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminPanel() {
  const requests = [
    {
      id: "REQ001",
      requester: "Maria Garcia",
      location: "City Center",
      type: "Food",
      urgency: "High",
      status: "Pending",
      assignedTo: "N/A",
      timestamp: "2024.07.26 10:00 AM",
    },
    {
      id: "REQ002",
      requester: "John Smith",
      location: "East District",
      type: "Shelter",
      urgency: "Medium",
      status: "In Progress",
      assignedTo: "Emily White",
      timestamp: "2024.07.26 09:30 AM",
    },
    {
      id: "REQ003",
      requester: "Sarah Lee",
      location: "North Suburbs",
      type: "Medical",
      urgency: "High",
      status: "Fulfilled",
      assignedTo: "David Chen",
      timestamp: "2024.07.26 08:00 AM",
    },
    {
      id: "REQ004",
      requester: "Ahmed Khan",
      location: "West Side",
      type: "Rescue",
      urgency: "High",
      status: "Pending",
      assignedTo: "N/A",
      timestamp: "2024.07.25 04:15 PM",
    },
    {
      id: "REQ005",
      requester: "Elena ",
      location: "City Center",
      type: "Food",
      urgency: "Low",
      status: "Fulfilled",
      assignedTo: "Maria Garcia",
      timestamp: "2024.07.25 02:00 PM",
    },
    {
      id: "REQ006",
      requester: "David Brown",
      location: "South Sector",
      type: "Shelter",
      urgency: "Medium",
      status: "In Progress",
      assignedTo: "Carlos Ruiz",
      timestamp: "2024.07.24 11:00 AM",
    },
    {
      id: "REQ007",
      requester: "Sophie Miller",
      location: "East District",
      type: "Medical",
      urgency: "High",
      status: "Pending",
      assignedTo: "N/A",
      timestamp: "2024.07.24 09:00 AM",
    },
    {
      id: "REQ008",
      requester: "Carlos Ramirez",
      location: "North Suburbs",
      type: "Food",
      urgency: "Low",
      status: "Fulfilled",
      assignedTo: "Jessica Green",
      timestamp: "2024.07.23 03:30 PM",
    },
  ];

  const volunteerActivity = [
    {
      name: "Emily White",
      action: "completed task REQ002.",
      time: "2024-07-26 08:45 AM",
      avatar: "https://placehold.co/40x40/FFDDC1/FF6B00?text=EW",
    },
    {
      name: "David Chen",
      action: "completed task REQ003.",
      time: "2024-07-25 05:30 PM",
      avatar: "https://placehold.co/40x40/D1E7DD/28A745?text=DC",
    },
    {
      name: "Maria Garcia",
      action: "registered as a new volunteer.",
      time: "2024-07-25 02:10 PM",
      avatar: "https://placehold.co/40x40/C7CEEA/6A0DAD?text=MG",
    },
    {
      name: "Carlos Ruiz",
      action: "accepted task REQ006.",
      time: "2024-07-24 11:00 AM",
      avatar: "https://placehold.co/40x40/FFE0B2/FF8C00?text=CR",
    },
    {
      name: "Jessica Green",
      action: "completed task REQ008.",
      time: "2024.07.23 04:55 PM",
      avatar: "https://placehold.co/40x40/E0F7FA/00BCD4?text=JG",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          Admin Panel Dashboard
        </h1>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Requests
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                Requires immediate action
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Volunteers
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">210</div>
              <p className="text-xs text-muted-foreground">Ready to help</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Requests Fulfilled
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">987</div>
              <p className="text-xs text-muted-foreground">
                92% fulfillment rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Help Requests & Request Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Help Requests</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" className="h-8 px-3 text-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="h-8 px-3 text-sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Requester</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.id}
                        </TableCell>
                        <TableCell>{request.requester}</TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              request.urgency === "High"
                                ? "bg-red-100 text-red-800"
                                : request.urgency === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.urgency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              request.status === "Pending"
                                ? "bg-blue-100 text-blue-800"
                                : request.status === "In Progress"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>{request.assignedTo}</TableCell>
                        <TableCell>{request.timestamp}</TableCell>
                        <TableCell>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Request Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              {/* Donut chart placeholder */}
              <div className="relative w-48 h-48 mb-4">
                <div className="absolute inset-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Chart Placeholder
                </div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500 animate-spin-slow"
                  style={{
                    animationDuration: "5s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear",
                  }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-l-blue-500"
                  style={{ transform: "rotate(45deg)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 border-l-green-500"
                  style={{ transform: "rotate(135deg)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-500 border-l-yellow-500"
                  style={{ transform: "rotate(225deg)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-red-500 border-l-red-500"
                  style={{ transform: "rotate(315deg)" }}
                ></div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Food
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  Shelter
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  Medical
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  Rescue
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Volunteer Activity */}
        <Card className="shadow-lg mb-12">
          <CardHeader>
            <CardTitle>Recent Volunteer Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {volunteerActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Image
                    src={activity.avatar}
                    alt={activity.name}
                    width={40}
                    height={40}
                    unoptimized
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.name}{" "}
                      <span className="font-normal text-gray-600">
                        {activity.action}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
