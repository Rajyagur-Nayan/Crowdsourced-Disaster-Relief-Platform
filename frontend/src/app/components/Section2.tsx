"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin } from "lucide-react";

// Variants for the scroll-in animation
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function App() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const availableRequests = [
    {
      id: 1,
      title: "Medical Supplies Needed",
      urgency: "High",
      urgencyColor: "bg-red-500",
      location: "Suburban Area, Sector 5B",
      description:
        "Elderly resident requires urgent blood pressure medication and first aid supplies after recent flooding. Access road partially blocked due to a fallen tree.",
      image: "https://placehold.co/400x250/FCA5A5/FFF?text=Medical+Supplies",
    },
    {
      id: 2,
      title: "Food & Water Distribution",
      urgency: "Medium",
      urgencyColor: "bg-amber-500",
      location: "Central District, Community Hall",
      description:
        "Our town is displaced by the storm and sheltering in the community hall. Non-perishable food items and clean drinking water are desperately needed for the elderly and children.",
      image: "https://placehold.co/400x250/FDE68A/FFF?text=Food+&+Water",
    },
    {
      id: 3,
      title: "Temporary Shelter Setup",
      urgency: "High",
      urgencyColor: "bg-red-500",
      location: "Northern Outskirts, Open Field",
      description:
        "Over 50 individuals are without homes after the earthquake. Need assistance setting up temporary tents and blankets. Skilled volunteers also needed to help set up.",
      image: "https://placehold.co/400x250/FCA5A5/FFF?text=Temporary+Shelter",
    },
    {
      id: 4,
      title: "Search & Rescue Assistance",
      urgency: "High",
      urgencyColor: "bg-red-500",
      location: "Coastal Village, Damaged Homes",
      description:
        "Two local residents reported missing after the tsunami hit. Search and rescue teams need additional support to comb through debris and flooded areas. Experience beneficial.",
      image: "https://placehold.co/400x250/FCA5A5/FFF?text=Search+&+Rescue",
    },
    {
      id: 5,
      title: "Water Purification Tablets",
      urgency: "Medium",
      urgencyColor: "bg-amber-500",
      location: "Rural Farmsteads, East Valley",
      description:
        "Contaminated water sources in isolated farming communities. Need distribution of water purification tablets and basic hygiene kits. Supplies scarce.",
      image: "https://placehold.co/400x250/FDE68A/FFF?text=Water+Purification",
    },
    {
      id: 6,
      title: "Clothes Donation Drive",
      urgency: "Low",
      urgencyColor: "bg-green-500",
      location: "Temporary Evacuation Center, North Side",
      description:
        "People arrived with only the clothes on their backs. Need warm clothing, especially for children and infants. Collection point established.",
      image: "https://placehold.co/400x250/A7F3D0/FFF?text=Clothes+Donation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: { staggerChildren: 0.3 },
          },
        }}
        className="container mx-auto px-4 py-12"
      >
        <section>
          <motion.h2
            variants={itemVariants}
            className="flex justify-center items-center text-3xl font-bold mb-10 text-gray-900 dark:text-white transition-colors duration-500"
          >
            Types of Help Requests
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRequests.map((request) => (
              <motion.div
                key={request.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-colors duration-500"
              >
                {/* CardHeader equivalent with a dynamic image and urgency badge */}
                <div className="relative p-0">
                  <img
                    src={request.image}
                    alt={request.title}
                    className="w-full h-auto object-cover rounded-t-xl"
                  />
                  <span
                    className={`absolute top-4 right-4 ${request.urgencyColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {request.urgency}
                  </span>
                </div>
                {/* CardContent equivalent */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {request.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    {request.description}
                  </p>
                  {/* Button group equivalent */}
                  <div className="flex space-x-2 mt-auto">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-300">
                      Accept
                    </button>
                    <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-md text-sm transition-colors duration-300">
                      View Details
                    </button>
                    <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-md text-sm transition-colors duration-300">
                      Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
