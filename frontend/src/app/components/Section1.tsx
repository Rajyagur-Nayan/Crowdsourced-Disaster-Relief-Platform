"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Users, Globe, Plus } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function Section1() {
  const [theme] = useState("dark");

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <header className="py-4 px-8 flex justify-end"></header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-16 text-center mb-16 max-w-4xl mx-auto transition-colors duration-500"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white transition-colors duration-500">
            Bridging the Gap: Connecting Aid to Where It&apos;s Needed Most
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto transition-colors duration-500">
            ReliefNet is a community-driven platform empowering individuals to
            request and offer help in times of natural disaster. Your support
            makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium"
            >
              <a href="request-help" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Request Help
              </a>
            </motion.button>
            <motion.a
              href="volunteer-panel"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center border border-green-500 text-green-700 hover:bg-green-50 rounded-md px-6 py-3 text-lg font-medium dark:text-green-400 dark:hover:bg-green-900 transition-colors duration-500"
            >
              Become a Volunteer
            </motion.a>
          </div>
        </motion.section>

        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500"
          >
            See Relief Efforts in Real-Time
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto transition-colors duration-500"
          >
            Explore active help requests and volunteer locations on our
            interactive map.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="relative bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto transition-colors duration-500"
          >
            <svg
              className="w-full h-auto"
              viewBox="0 0 800 500"
              fill="#FEE8E2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="0"
                width="800"
                height="500"
                fill={theme === "dark" ? "#2D3748" : "#E0F2F7"}
              />
              <path
                d="M100 200 C 50 150, 150 50, 300 100 S 500 0, 700 100 C 750 150, 700 250, 600 300 S 400 450, 200 400 C 100 350, 150 250, 100 200 Z"
                stroke={theme === "dark" ? "#D97706" : "#D97706"}
                strokeWidth="2"
                fill={theme === "dark" ? "#4A5568" : "#FEE8E2"}
              />
              <circle cx="250" cy="150" r="10" fill="#EF4444" />
              <circle cx="400" cy="280" r="10" fill="#EF4444" />
              <circle cx="550" cy="180" r="10" fill="#EF4444" />
              <circle cx="300" cy="350" r="10" fill="#EF4444" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 text-lg"
              >
                View Live Map
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
          className="text-center mb-5"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white transition-colors duration-500"
          >
            Our Impact and Reach
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-500"
            >
              <Heart className="text-blue-600 h-12 w-12 mb-4" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                5000+
              </p>
              <p className="text-gray-600 dark:text-gray-400">People Helped</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-500"
            >
              <Users className="text-blue-600 h-12 w-12 mb-4" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                800+
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Active Volunteers
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-500"
            >
              <Globe className="text-blue-600 h-12 w-12 mb-4" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                15+
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Regions Covered
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
