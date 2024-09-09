"use client";
import React, { useState } from "react";
import { Inter } from "next/font/google";

import { Settings, Home, Library, Compass, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

const StreamingConsoleUI = () => {
  return (
    <div className={`${inter.className} flex flex-col h-screen`}>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">KOICASTER</div>
        </div>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button>My Account</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end">
              <div className="flex flex-col items-start p-4 space-y-2">
                <div>My Account</div>
                <Separator />
                <Button variant="ghost">
                  <LogOut className="w-5 h-5" /> Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Sidebar */}

      <div className="flex-1 flex">
        <div className="bg-white border-r p-8 flex flex-col items-start space-y-8">
          <Button variant="ghost">
            <Home className="w-6 h-6 mr-2 flex-1" />
            Home
          </Button>
          <Button variant="ghost">
            <Library className="w-6 h-6 mr-2" />
            Library
          </Button>
          <Button variant="ghost">
            <Compass className="w-6 h-6 mr-2" />
            Destinations
          </Button>
          <Button variant="ghost">
            <Users className="w-6 h-6 mr-2" />
            Members
          </Button>
          <div className="mt-auto">
            <Button variant="ghost">
              <Settings className="w-6 h-6 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingConsoleUI;
