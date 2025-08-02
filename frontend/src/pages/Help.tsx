
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, Upload, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Help() {
    const [urgency, setUrgency] = useState("low");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [helpType, setHelpType] = useState("");
    const [situation, setSituation] = useState("");

    const handleSubmit = () => {
        const formData = {
            fullName,
            phoneNumber,
            location,
            helpType,
            situation,
            urgency,
        };
        console.log("Submitted Request:", formData);
        setFullName("");
        setPhoneNumber("");
        setLocation("");
        setHelpType("");
        setSituation("");
        setUrgency("low");
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
                    <div className="flex items-center space-x-2 text-xl font-bold">
                        <span className="text-blue-500">::</span>
                        <span>logo</span>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Home</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Live Map</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">My Tasks</a>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex min-h-[calc(100vh-160px)] items-center justify-center p-8">
                <Card className="w-full max-w-4xl rounded-xl shadow-lg">
                    <CardHeader className="p-8">
                        <CardTitle className="text-3xl font-bold">Request Help</CardTitle>
                        <CardDescription className="mt-2 text-base text-gray-600">
                            Please fill out the form below to request assistance during a natural disaster.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8 pt-0">
                        {/* Full Name and Phone Number */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input id="phoneNumber" placeholder="+919876543210" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <Input id="location" placeholder="Enter your location" className="pr-10" value={location} onChange={(e) => setLocation(e.target.value)} />
                                <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Type of Help Needed */}
                        <div className="space-y-2">
                            <Label htmlFor="helpType">Type of Help Needed</Label>
                            <Select value={helpType} onValueChange={(value) => setHelpType(value)}>
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
                        <div className="space-y-2">
                            <Label htmlFor="situation">Describe Your Situation (optional)</Label>
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
                            <RadioGroup value={urgency} onValueChange={setUrgency} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="low" id="low" />
                                    <Label htmlFor="low">Low Urgency</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="medium" id="medium" />
                                    <Label htmlFor="medium">Medium Urgency</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="high" id="high" />
                                    <Label htmlFor="high">High Urgency</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <Button variant="ghost">Cancel</Button>
                            <Button className="bg-blue-500 cursor-pointer text-white hover:bg-blue-600" onClick={handleSubmit}>
                                Submit Request
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <footer className="mt-auto bg-white p-4 text-sm text-gray-500 shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex space-x-6">
                        <a href="#">Company</a>
                        <a href="#">Resources</a>
                        <a href="#">Legal</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
                        <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                        <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
