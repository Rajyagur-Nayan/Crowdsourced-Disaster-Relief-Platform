import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Filter, ChevronLeft, Plus, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function Map() {
  const [urgency, setUrgency] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center space-x-2 text-xl font-bold">
            <span className="text-blue-500">::</span>
            <span>logo</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-blue-500 border-b-2 border-blue-500">
              Live Map
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              My Tasks
            </a>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Request Help
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-160px)] p-8 space-x-8">
        {/* Sidebar */}
        <Card className="w-80 rounded-xl shadow-lg flex flex-col h-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold">Filter Requests</h3>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </div>

            {/* Filter Section */}
            <div className="space-y-6">
              {/* Request Type */}
              <div className="space-y-2">
                <Label>Request Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="medical">Medical Assistance</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="food">Food & Water</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-urgency" />
                    <Label htmlFor="all-urgency">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low-urgency" />
                    <Label htmlFor="low-urgency">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium-urgency" />
                    <Label htmlFor="medium-urgency">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high-urgency" />
                    <Label htmlFor="high-urgency">High</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Location (Keyword) */}
              <div className="space-y-2">
                <Label>Location (Keyword)</Label>
                <Input placeholder="e.g., Downtown, Northside" />
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="mt-8">
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Map View */}
        <div className="flex-1 rounded-xl shadow-lg relative overflow-hidden">
          <div className="h-full w-full bg-gray-200 flex items-center justify-center p-4">
            <img 
              src="https://placehold.co/1200x800/e2e8f0/64748b?text=Interactive+Map+View" 
              alt="Interactive Map View" 
              className="w-full h-full object-cover rounded-xl" 
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-500">
              <p className="font-bold text-lg">Interactive Map View</p>
              <p className="text-sm">Click pins for details (map not live)</p>
            </div>
          </div>
        </div>
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
            <a href="#" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
