"use client";
import React, { useEffect, useState } from "react";

import {
  Filter,
  Upload,
  CheckCircle,
  AlertCircle,
  ClipboardList,
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
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Request {
  id: string;
  requester: string;
  location: string;
  help_type: string;
  urgency_level: string;
  status: string;
  assignedTo: string;
  created_at: string;
}

type DashboardData = {
  totalRequests: number;
  pendingRequests: number;
  totalVolunteers: number;
  fulfilledRequests: number;
  recentHelpRequests: Request[];
  food: number;
  shelter: number;
  medical: number;
  rescue: number;
};

export default function AdminPanel() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const chartData = data
    ? {
        labels: ["Food", "Shelter", "Medical", "Rescue"],
        datasets: [
          {
            data: [data.food, data.shelter, data.medical, data.rescue],
            backgroundColor: [
              "#3B82F6", // blue
              "#22C55E", // green
              "#EAB308", // yellow
              "#EF4444", // red
            ],
            borderRadius: 50, // Makes edges rounded
            spacing: 2,
          },
        ],
      }
    : null;

  const chartOptions = {
    cutout: "70%", // Makes it a donut
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8080/dashboard", {
          withCredentials: true,
        });
        if (res.status !== 200) {
          throw new Error("Failed to fetch requests");
        }
        // Assuming the response data is an array of requests
        console.log("Fetched requests:", res.data);
        setData(res.data);
        setRequests(res.data.recentHelpRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;

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
              {data && (
                <div className="text-2xl font-bold">{data.totalRequests}</div>
              )}
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
              {data && (
                <div className="text-2xl font-bold">{data.pendingRequests}</div>
              )}
              <p className="text-xs text-muted-foreground">
                Requires immediate action
              </p>
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
              {data && (
                <div className="text-2xl font-bold">
                  {data.fulfilledRequests}
                </div>
              )}
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
                      <TableHead>Timestamp</TableHead>
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
                        <TableCell>{request.help_type}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              request.urgency_level === "High"
                                ? "bg-red-100 text-red-800"
                                : request.urgency_level === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.urgency_level}
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
                        <TableCell>{request.created_at}</TableCell>
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
              <div className="w-48 h-48 mb-4">
                {chartData && (
                  <Doughnut data={chartData} options={chartOptions} />
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Food ({data?.food})
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  Shelter ({data?.shelter})
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  Medical ({data?.medical})
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  Rescue ({data?.rescue})
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
