"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Filter, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import toast from "react-hot-toast";

export default function Map() {
  const [, setLocationInput] = useState("");
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default: India
  const [helpType, setHelpType] = useState("all ");
  const [urgency, setUrgency] = useState("low");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "0.75rem",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(coords);
          // Reverse geocode
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          const address = data.results?.[0]?.formatted_address || "";
          setLocationInput(address);
        },
        () => {
          console.warn("Location access denied.");
        }
      );
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/request",
        {
          help_type: helpType,
          urgency_level: urgency,
          location: location,
          full_name: name,
        },
        {
          withCredentials: true, // ✅ sends and receives cookies
        }
      );
      toast.success("new request added");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setName(""), setHelpType(""), setLocation(""), setUrgency("low");
    } catch (error) {
      console.log(error);
      toast.error("Something Wants Wrong");
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <main className="flex min-h-[calc(100vh-160px)] p-8 space-x-8">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="w-80 rounded-xl shadow-lg flex flex-col h-full">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    <h3 className="text-lg font-semibold">Filter Requests</h3>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="e.g., Downtown"
                      value={name}
                      onChange={(e) => setName(e.target.value)} // ✅ Bind state
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Request Type</Label>
                    <Select
                      value={helpType}
                      onValueChange={(value) => setHelpType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Medical">
                          Medical Assistance
                        </SelectItem>
                        <SelectItem value="Shelter">Shelter</SelectItem>
                        <SelectItem value="Food">Food & Water</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Urgency Level</Label>
                    <RadioGroup
                      value={urgency}
                      onValueChange={(value) => setUrgency(value)} // ✅ Bind state
                      className="space-y-2"
                    >
                      {["Low", "Medium", "High"].map((level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={level}
                            id={`${level}-urgency`}
                          />
                          <Label htmlFor={`${level}-urgency`}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Location (Keyword)</Label>
                    <Input
                      placeholder="e.g., Downtown"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)} // ✅ Bind state
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Add Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map */}
        <motion.div
          className="flex-1 rounded-xl shadow-lg relative overflow-hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="h-full w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-4">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 dark:text-gray-300 pointer-events-none">
              <p className="font-bold text-lg">Interactive Map View</p>
              <p className="text-sm">Showing your live location</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
