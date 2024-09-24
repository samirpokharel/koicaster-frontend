"use client";
import React, { useState } from "react";
import {
  Video,
  MicOff,
  Mic,
  Monitor,
  Grid,
  User,
  Users,
  Layout,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import ActionButton from "./_components/action-button";
import ParticipantsRows from "./_components/participants-row";
import { Participant } from "@/interfaces/Participant";
import StudioSideBar from "./_studio-sidebar/index";
import StudioNavbar from "./_components/studio_navbar";
import StreamingCanvas from "./_components/streaming_canvas";
import { useParticipantStore } from "@/store/use-participant-state";

const LiveStreamStudio = () => {
  const { participants } = useParticipantStore();

  return (
    <div className="h-screen gap-10 ">
      <StudioNavbar />

      <div className="flex h-[92vh]">
        <div className="flex-1 flex flex-col">
          <StreamingCanvas />
          <ParticipantsRows users={participants} />
          <ActionButton />
        </div>
        <StudioSideBar />
      </div>
    </div>
  );
};

export default LiveStreamStudio;
