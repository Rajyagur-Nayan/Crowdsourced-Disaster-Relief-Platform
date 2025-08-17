import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Progress } from "@radix-ui/react-progress";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Request {
  full_name: string;
  location: string;
  help_type: string;
  urgency_level: string;
  created_at: string;
}
const acceptedTasks = [
  {
    id: 1,
    title: "Deliver Food to Sector 3",
    location: "Residential Area, Sector 3",
    description: "hello i help it ",
  },
  {
    id: 2,
    title: "Assist Medical Camp Setup",
    location: "Bridge Overpass",
    description: "hello i help it ",
  },
  {
    id: 3,
    title: "Distribute Blankets North Side",
    location: "Community Center",
    description: "hello i help it ",
  },
];

export default function VolunteerPanel() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8080/data/volunteer");
        if (res.status !== 200) {
          throw new Error("Failed to fetch requests");
        }
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const requestAccepted = () => {
    toast.success("Request Accepted Successfully");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-12 space-y-12">
        {/* Your Task Progress Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Your Task Progress</h2>
          <Card className="rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Tasks Accepted */}
              <div className="flex flex-col items-center p-4 w-full">
                <div className="text-sm text-gray-500 mb-2">Tasks Accepted</div>
                <div className="text-4xl font-bold text-blue-500 mb-2">8</div>
                <Progress value={80} className="w-full" />
              </div>

              {/* Tasks Completed */}
              <div className="flex flex-col items-center p-4 w-full">
                <div className="text-sm text-gray-500 mb-2">
                  Tasks Completed
                </div>
                <div className="text-4xl font-bold text-green-500 mb-2">5</div>
                <Progress value={50} className="w-full" />
              </div>

              {/* Tasks Pending */}
              <div className="flex flex-col items-center p-4 w-full">
                <div className="text-sm text-gray-500 mb-2">Tasks Pending</div>
                <div className="text-4xl font-bold text-red-500 mb-2">3</div>
                <Progress value={30} className="w-full" />
              </div>

              {/* Trend Chart Placeholder */}
              <div className="col-span-1 md:col-span-4 p-4 mt-4">
                <div className="text-xl font-semibold mb-4">
                  Monthly Task Trend
                </div>
                <div className="relative h-48 w-full rounded-xl bg-gray-200 overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-blue-100"
                    style={{
                      height: "70%",
                      clipPath:
                        "polygon(0% 100%, 10% 80%, 20% 90%, 30% 60%, 40% 70%, 50% 50%, 60% 80%, 70% 75%, 80% 85%, 90% 70%, 100% 100%)",
                    }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 w-full bg-blue-500 opacity-50"
                    style={{
                      height: "70%",
                      clipPath:
                        "polygon(0% 100%, 10% 80%, 20% 90%, 30% 60%, 40% 70%, 50% 50%, 60% 80%, 70% 75%, 80% 85%, 90% 70%, 100% 100%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Volunteer Help Requests Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">New Help Requests</h2>
          <Card className="rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {requests.length === 0 ? (
                <p className="text-gray-500">No new help requests available.</p>
              ) : (
                requests.map((request, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-blue-700">
                        {request.help_type} – {request.urgency_level}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Requested by:</strong> {request.full_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Location:</strong> {request.location}
                      </div>

                      <div className="text-sm text-gray-500">
                        <strong>Date:</strong>{" "}
                        {new Date(request.created_at).toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <Button variant="secondary" onClick={requestAccepted}>
                        Accept
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </section>

        {/* My Accepted Tasks Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">My Accepted Tasks</h2>
          <Card className="rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {acceptedTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="flex flex-col">
                      <div className="font-semibold">{task.title}</div>
                      <div className="text-sm text-gray-500">
                        {task.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col space-x-2">
                    {/* Details Dialog */}
                    {/* Task Details Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost">Details</Button>
                      </DialogTrigger>
                      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">
                            Task Details
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-sm text-gray-700 mt-5">
                          <p>
                            <strong>Title:</strong> {task.title}
                          </p>
                          <p>
                            <strong>Location:</strong> {task.location}
                          </p>
                          <p>
                            <strong>Description:</strong> {task.description}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Update Status Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Update Status</Button>
                      </DialogTrigger>
                      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">
                            Update Task Status
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="mt-5">
                            <Label htmlFor="status">Status</Label>
                            <Input
                              id="status"
                              placeholder="e.g. In Progress, Completed"
                            />
                          </div>
                          <div>
                            <Label htmlFor="remarks" className="mb-5">
                              Remarks
                            </Label>
                            <Input
                              id="remarks"
                              placeholder="Enter any remarks"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="mt-5">
                          Submit
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
