import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Progress } from "@radix-ui/react-progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

interface requestsProps {
  id: number;
  title: string;
  urgency: string;
  urgencyColor: string;
  location: string;
  description: string;
  image: string;
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
                        <div className="space-y-4 text-sm text-gray-700">
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

                        <DialogClose>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
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
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Input
                              id="status"
                              placeholder="e.g. In Progress, Completed"
                            />
                          </div>
                          <div>
                            <Label htmlFor="remarks">Remarks</Label>
                            <Input
                              id="remarks"
                              placeholder="Enter any remarks"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit</Button>
                        </DialogFooter>
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
