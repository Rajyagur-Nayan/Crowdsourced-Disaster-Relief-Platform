import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin } from "lucide-react";

const availableRequests = [
  {
    id: 1,
    title: "Medical Supplies Needed",
    urgency: "High",
    urgencyColor: "bg-red-500 text-white",
    location: "Suburban Area, Sector 5B",
    description:
      "Elderly resident requires urgent blood pressure medication and first aid supplies after recent flooding. Access road partially blocked due to a fallen tree.",
    image: "/img2.jpg",
  },
  {
    id: 2,
    title: "Food & Water Distribution",
    urgency: "Medium",
    urgencyColor: "bg-amber-500 text-white",
    location: "Central District, Community Hall",
    description:
      "Our town is displaced by the storm and sheltering in the community hall. Non-perishable food items and clean drinking water are desperately needed for the elderly and children.",
    image: "/img3.jpg",
  },
  {
    id: 3,
    title: "Temporary Shelter Setup",
    urgency: "High",
    urgencyColor: "bg-red-500 text-white",
    location: "Northern Outskirts, Open Field",
    description:
      "Over 50 individuals are without homes after the earthquake. Need assistance setting up temporary tents and blankets. Skilled volunteers also needed to help set up.",
    image: "/img4.jpeg",
  },
  {
    id: 4,
    title: "Search & Rescue Assistance",
    urgency: "High",
    urgencyColor: "bg-red-500 text-white",
    location: "Coastal Village, Damaged Homes",
    description:
      "Two local residents reported missing after the tsunami hit. Search and rescue teams need additional support to comb through debris and flooded areas. Experience beneficial.",
    image: "/img5.jpg",
  },
  {
    id: 5,
    title: "Water Purification Tablets",
    urgency: "Medium",
    urgencyColor: "bg-amber-500 text-white",
    location: "Rural Farmsteads, East Valley",
    description:
      "Contaminated water sources in isolated farming communities. Need distribution of water purification tablets and basic hygiene kits. Supplies scarce.",
    image: "/img6.jpg",
  },
  {
    id: 6,
    title: "Clothes Donation Drive",
    urgency: "Low",
    urgencyColor: "bg-green-500 text-white",
    location: "Temporary Evacuation Center, North Side",
    description:
      "People arrived with only the clothes on their backs. Need warm clothing, especially for children and infants. Collection point established.",
    image: "/img7.jpg",
  },
];

const acceptedTasks = [
  {
    id: 1,
    title: "Deliver Food to Sector 3",
    location: "Residential Area, Sector 3",
  },
  { id: 2, title: "Assist Medical Camp Setup", location: "Bridge Overpass" },
  {
    id: 3,
    title: "Distribute Blankets North Side",
    location: "Community Center",
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
              <div className="flex flex-col items-center p-4">
                <div className="text-sm text-gray-500 mb-2">Tasks Accepted</div>
                <div className="text-4xl font-bold text-blue-500">8</div>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="text-sm text-gray-500 mb-2">
                  Tasks Completed
                </div>
                <div className="text-4xl font-bold text-green-500">5</div>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="text-sm text-gray-500 mb-2">Tasks Pending</div>
                <div className="text-4xl font-bold text-red-500">3</div>
              </div>
              <div className="col-span-1 md:col-span-4 p-4 mt-4">
                <div className="text-xl font-semibold mb-4">
                  Monthly Task Trend
                </div>
                {/* Chart Placeholder */}
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

        {/* Available Help Requests Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Available Help Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRequests.map((request) => (
              <Card
                key={request.id}
                className="rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
              >
                <CardHeader className="relative p-0">
                  <Image
                    src={request.image}
                    alt={request.title}
                    width={400}
                    height={250}
                    className="w-full h-auto object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${request.urgencyColor} px-3 py-1 font-semibold`}
                  >
                    {request.urgency}
                  </Badge>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <CardTitle className="text-xl font-bold mb-2">
                    {request.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">
                    {request.description}
                  </p>
                  <div className="flex space-x-2 mt-auto">
                    <Button variant="outline" className="flex-1">
                      Accept
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                  <div className="flex space-x-2">
                    <Button variant="ghost">Details</Button>
                    <Button variant="outline">Update Status</Button>
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
