import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const Section2 = () => {
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
  return (
    <div>
      {/* Available Help Requests Section */}
      <section>
        <h2 className="flex justify-center items-center text-3xl font-bold mb-10">
          Types Help Requests
        </h2>
        <div className="w-[80%] ml-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Section2;
