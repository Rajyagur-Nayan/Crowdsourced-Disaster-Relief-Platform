"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Fullscreen, MapPin } from "lucide-react";
import Image from "next/image";

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
      image: "/img2.jpg",
    },
    {
      id: 2,
      title: "Food & Water Distribution",
      urgency: "Medium",
      urgencyColor: "bg-amber-500",
      location: "Central District, Community Hall",
      description:
        "Our town is displaced by the storm and sheltering in the community hall. Non-perishable food items and clean drinking water are desperately needed for the elderly and children.",
      image: "/img3.jpg",
    },
    {
      id: 3,
      title: "Temporary Shelter Setup",
      urgency: "High",
      urgencyColor: "bg-red-500",
      location: "Northern Outskirts, Open Field",
      description:
        "Over 50 individuals are without homes after the earthquake. Need assistance setting up temporary tents and blankets. Skilled volunteers also needed to help set up.",
      image: "/img4.jpeg",
    },
    {
      id: 4,
      title: "Search & Rescue Assistance",
      urgency: "High",
      urgencyColor: "bg-red-500",
      location: "Coastal Village, Damaged Homes",
      description:
        "Two local residents reported missing after the tsunami hit. Search and rescue teams need additional support to comb through debris and flooded areas. Experience beneficial.",
      image: "/img4.jpg",
    },
    {
      id: 5,
      title: "Water Purification Tablets",
      urgency: "Medium",
      urgencyColor: "bg-amber-500",
      location: "Rural Farmsteads, East Valley",
      description:
        "Contaminated water sources in isolated farming communities. Need distribution of water purification tablets and basic hygiene kits. Supplies scarce.",
      image: "/img6.jpg",
    },
    {
      id: 6,
      title: "Clothes Donation Drive",
      urgency: "Low",
      urgencyColor: "bg-green-500",
      location: "Temporary Evacuation Center, North Side",
      description:
        "People arrived with only the clothes on their backs. Need warm clothing, especially for children and infants. Collection point established.",
      image: "/img7.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-500 ">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: { staggerChildren: 0.3 },
          },
        }}
        className="mx-auto max-w-7xl  px-8 py-12 space-y-12"
      >
        <section>
          <motion.h2
            variants={itemVariants}
            className="flex justify-center items-center text-3xl font-bold mb-15 text-gray-900 dark:text-white transition-colors duration-500"
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
                  <Image
                    src={request.image}
                    alt={request.title}
                    width={200}
                    height={20}
                    className="w-full h-auto object-cover rounded-t-xl"
                  />
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
