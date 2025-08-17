import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function Help() {
  const [urgency, setUrgency] = useState("Low");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [helpType, setHelpType] = useState("");
  const [situation, setSituation] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      await axios.post("http://localhost:3000/request", {
        full_name: fullName,
        location: location,
        help_type: helpType,
        description: situation,
        urgency_level: urgency,
        phone_number:phoneNumber
      });
=======
      await axios.post(
        "http://localhost:8080/request",
        {
          full_name: fullName,
          location: location,
          help_type: helpType,
          description: situation,
          urgency_level: urgency,
        },
        {
          withCredentials: true, // ✅ sends and receives cookies
        }
      );

>>>>>>> 5122b392b717343516004b86026ea99177d3e6e8
      toast.success("Data Added Success");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setFullName(""),
        setHelpType(""),
        setLocation(""),
        setPhoneNumber(""),
        setSituation(""),
        setUrgency("low");
    } catch (error) {
      console.log(error);
      toast.error("Something Wants Wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center p-8">
        <Card className="w-full max-w-4xl rounded-xl shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-3xl font-bold">Request Help</CardTitle>
            <CardDescription className="mt-2 text-base text-gray-600">
              Please fill out the form below to request assistance during a
              natural disaster.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8 pt-0">
            {/* Full Name and Phone Number */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2 mb-5">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="number"
                    placeholder="+919876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2 mb-5">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Enter your location"
                    className="pr-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Type of Help Needed */}
              <div className="space-y-2 mb-5">
                <Label htmlFor="helpType">Type of Help Needed</Label>
                <Select
                  value={helpType}
                  onValueChange={(value: any) => setHelpType(value)}
                >
                  <SelectTrigger id="helpType">
                    <SelectValue placeholder="Select type of help" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical Assistance</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="food">Food & Water</SelectItem>
                    <SelectItem value="rescue">Rescue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Describe Your Situation */}
              <div className="space-y-2 mb-5">
                <Label htmlFor="situation">
                  Describe Your Situation (optional)
                </Label>
                <Textarea
                  id="situation"
                  placeholder="Provide details about your situation and specific needs (e.g., number of people, specific items, safety concerns)."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                />
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup
                  value={urgency}
                  onValueChange={setUrgency}
                  className="flex flex-col md:flex-row mt-5 gap-4"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Low" id="low" />
                    <Label htmlFor="low">Low Urgency</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Medium" id="medium" />
                    <Label htmlFor="medium">Medium Urgency</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="High" id="high" />
                    <Label htmlFor="high">High Urgency</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button variant="ghost">
                  <Link href="/"> Cancel</Link>
                </Button>
                <button
                  type="submit"
                  className="bg-blue-500 cursor-pointer text-white p-2 rounded-2xl text-sm hover:bg-blue-600"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
