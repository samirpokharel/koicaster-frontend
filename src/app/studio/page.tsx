"use client";
import React, { useState } from "react";
import { Video, MessageSquare, Flag, Mail, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import ActionButton from "./components/action-button";
import ParticipantsRows from "./components/participants-row";
import { Participant } from "@/interfaces/Participant";
import StudioSideBar from "./studio-sidebar/index.jsx";

const LiveStreamStudio = () => {
  const users: Participant[] = [
    { name: "User 1", muted: false },
    { name: "User 2", muted: true },
    { name: "User 3", muted: false },
    { name: "User 4", muted: true },
  ];

  return (
    <div className="h-screen gap-10 bg-gray-100">
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm md:text-2xl font-bold cursor-pointer">
            <Link href={"/"}>KOICASTER</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="destructive">
            <Video className="w-5 h-5s mr-3" /> <span>Record</span>
          </Button>
        </div>
      </header>

      <div className="flex h-[92vh]">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <div
              className={`bg-black flex-1 w-full transition-all duration-300`}
            >
              <div className="text-white text-center pt-32">
                Streaming Canvas
              </div>
            </div>
          </div>
          <ParticipantsRows users={users} />
          <ActionButton />
        </div>
        <div className="w-1/12"></div>
        <StudioSideBar />
      </div>
    </div>
  );
};

export default LiveStreamStudio;
