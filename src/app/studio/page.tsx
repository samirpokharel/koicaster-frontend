"use client";
import React, { useState } from "react";
import { Video, MessageSquare, Flag, Mail, Briefcase, MicOff, Mic, Monitor, Grid, User, Users, Layout, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import ActionButton from "./components/action-button";
import ParticipantsRows from "./components/participants-row";
import { Participant } from "@/interfaces/Participant";
import StudioSideBar from "./studio-sidebar/index";

type Mode = 'normal' | 'single' | 'banner' | 'presentation';


const LiveStreamStudio = () => {
  const [mode, setMode] = useState<Mode>('normal');
  const [background, setBackground] = useState<string>('bg-gradient-to-r from-blue-500 to-purple-500');

  const [participants, setParticipants] = useState<Participant[]>([
    { name: "User 1", muted: false },
  ]);

  const addParticipant = () => {
    if (mode === 'single' || mode === 'presentation') return;
    if (mode === 'banner' && participants.length >= 2) return;
    const newParticipant: Participant = {
      name: `User ${participants.length + 1}`,
      muted: Math.random() < 0.5,
    };
    setParticipants([...participants, newParticipant]);
  };

  const users: Participant[] = [
    { name: "User 1", isOnLiveCanvas: true, muted: false },
    { name: "User 2", isOnLiveCanvas: false, muted: true },
    { name: "User 3", isOnLiveCanvas: false, muted: false },
    { name: "User 4", isOnLiveCanvas: false, muted: true },
    { name: "User 1", isOnLiveCanvas: false, muted: false },
    { name: "User 2", isOnLiveCanvas: false, muted: true },
    { name: "User 3", isOnLiveCanvas: false, muted: false },
    { name: "User 4", isOnLiveCanvas: false, muted: true },
    { name: "User 1", isOnLiveCanvas: false, muted: false },
    { name: "User 2", isOnLiveCanvas: false, muted: true },
    { name: "User 3", isOnLiveCanvas: false, muted: false },
    { name: "User 4", isOnLiveCanvas: false, muted: true },
    { name: "User 1", isOnLiveCanvas: false, muted: false },
    { name: "User 2", isOnLiveCanvas: false, muted: true },
    { name: "User 3", isOnLiveCanvas: false, muted: false },
    { name: "User 4", isOnLiveCanvas: false, muted: true },
  ];
  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-2 sm:grid-cols-3';
    return 'grid-cols-3';
  };
  const renderParticipant = (participant: Participant, index: number, mode: Mode) => (
    <div key={index} className={`bg-white rounded-md shadow-md flex items-center justify-center relative 
      ${mode === 'banner' || mode === 'presentation' ? 'aspect-video' : 'h-full'}`}>
      <span className="font-semibold">{participant.name}</span>
      <div className="absolute bottom-2 right-2">
        {participant.muted ? (
          <MicOff className="text-red-500" size={20} />
        ) : (
          <Mic className="text-green-500" size={20} />
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (mode) {
      case 'single':
        return (
          <div className={`h-full ${background} p-4 rounded-lg`}>
            {participants.length > 0 && renderParticipant(participants[0], 0, mode)}
          </div>
        );
      case 'banner':
        return (
          <div className={`h-full ${background} p-4 rounded-lg flex items-center`}>
            <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
              {participants.slice(0, 2).map((participant, index) => renderParticipant(participant, index, mode))}
            </div>
          </div>
        );
      case 'presentation':
        return (
          <div className={`h-full ${background} p-4 rounded-lg grid grid-cols-4 gap-4`}>
            <div className="col-span-3 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <Monitor size={64} className="text-white" />
            </div>
            <div className="flex flex-col justify-center">
              {participants.length > 0 && renderParticipant(participants[0], 0, mode)}
            </div>
          </div>
        );
      default:
        return (
          <div className={`h-full ${background} p-4 rounded-lg`}>
            <div className={`grid ${getGridClass(participants.length)} gap-4 h-full`}>
              {participants.map((participant, index) => renderParticipant(participant, index, mode))}
            </div>
          </div>
        );
    }
  };

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
          <div className="ml-20 flex-1 flex">
            <div className="bg-gray-200 aspect-video mb-4 p-2 rounded-lg overflow-hidden">
              {renderContent()}
            </div>
            <div className="flex flex-col justify-center items-end gap-3 space-x-4 mb-4">
              <button onClick={() => setMode('normal')} className={`p-2 rounded-lg ${mode === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                <Grid size={24} />
              </button>
              <button onClick={() => setMode('single')} className={`p-2 rounded-lg ${mode === 'single' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                <User size={24} />
              </button>
              <button onClick={() => setMode('banner')} className={`p-2 rounded-lg ${mode === 'banner' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
                <Users size={24} />
              </button>
              <button onClick={() => setMode('presentation')} className={`p-2 rounded-lg ${mode === 'presentation' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                <Layout size={24} />
              </button>
              <button
                onClick={addParticipant}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded  items-center"
              >
                <UserPlus className="mr-2" size={20} />
              </button>
            </div>
          </div>



          <ParticipantsRows users={users} />
          <ActionButton />
        </div>
        {/* <div className="w-1/12"></div> */}

        <StudioSideBar />
      </div>
    </div>
  );
};

export default LiveStreamStudio;
