import React from "react";
import { Heart, Users, Globe, Plus } from "lucide-react";

export default function Section1() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="container mx-auto px-4 py-12">
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-16 text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
            Bridging the Gap: Connecting Aid to Where It&apos;s Needed Most
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            ReliefNet is a community-driven platform empowering individuals to
            request and offer help in times of natural disaster. Your support
            makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium"
            >
              <a href="request-help" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Request Help
              </a>
            </button>

            <a
              href="volunteer-panel"
              className="inline-flex items-center justify-center border border-green-500 text-green-700 hover:bg-green-50 rounded-md px-6 py-3 text-lg font-medium"
            >
              Become a Volunteer
            </a>
          </div>
        </section>

        {/* Live Map Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">
            See Relief Efforts in Real-Time
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Explore active help requests and volunteer locations on our
            interactive map.
          </p>
          <div className="relative bg-gray-200 rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">
            {/* Simple SVG map placeholder */}
            <svg
              className="w-full h-auto"
              viewBox="0 0 800 500"
              fill="#FEE8E2" // Light orange/pink color from image
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="0" width="800" height="500" fill="#E0F2F7" />{" "}
              {/* Light blue background */}
              {/* Simplified US map shape - this is a very basic representation */}
              <path
                d="M100 200 C 50 150, 150 50, 300 100 S 500 0, 700 100 C 750 150, 700 250, 600 300 S 400 450, 200 400 C 100 350, 150 250, 100 200 Z"
                stroke="#D97706"
                strokeWidth="2"
                fill="#FEE8E2"
              />{" "}
              <circle cx="250" cy="150" r="10" fill="#EF4444" /> {/* Red dot */}
              <circle cx="400" cy="280" r="10" fill="#EF4444" />
              <circle cx="550" cy="180" r="10" fill="#EF4444" />
              <circle cx="300" cy="350" r="10" fill="#EF4444" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 text-lg"
              >
                View Live Map
              </button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-gray-900">
            Our Impact and Reach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
              <Heart className="text-blue-600 h-12 w-12 mb-4" />
              <p className="text-3xl font-bold text-gray-900">5000+</p>
              <p className="text-gray-600">People Helped</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
              <Users className="text-blue-600 h-12 w-12 mb-4" />
              <p className="text-3xl font-bold text-gray-900">800+</p>
              <p className="text-gray-600">Active Volunteers</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
              <Globe className="text-blue-600 h-12 w-12 mb-4" />
              <p className="text-3xl font-bold text-gray-900">15+</p>
              <p className="text-gray-600">Regions Covered</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
