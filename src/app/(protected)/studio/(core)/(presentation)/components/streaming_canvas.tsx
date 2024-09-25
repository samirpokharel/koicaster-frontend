"use client";

import type { Participant } from "@/core/domain/Participant";
import { Grid, Layout, Mic, MicOff, Monitor, User, Users } from "lucide-react";
import { useState } from "react";
import { useParticipantStore } from "../../application/use-participant-state";

type Mode = "normal" | "single" | "banner" | "presentation";

const StreamingCanvas = () => {
  const [mode, setMode] = useState<Mode>("normal");
  const [background, setBackground] = useState<string>(
    "bg-gradient-to-r from-blue-500 to-purple-500"
  );
  const { activeParticipants } = useParticipantStore();

  const modeButtons = [
    { mode: "normal", icon: <Grid size={24} />, color: "bg-blue-500" },
    { mode: "single", icon: <User size={24} />, color: "bg-green-500" },
    { mode: "banner", icon: <Users size={24} />, color: "bg-yellow-500" },
    {
      mode: "presentation",
      icon: <Layout size={24} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="ml-20 flex-1 flex">
      <div className="bg-gray-200 aspect-video mb-4 p-2 rounded-lg overflow-hidden">
        <RenderContent
          mode={mode}
          background={background}
          participants={activeParticipants}
        />
      </div>
      <div className="flex flex-col justify-center items-end gap-3 mb-4">
        {modeButtons.map(({ mode: btnMode, icon, color }) => (
          <ModeButton
            key={btnMode}
            mode={btnMode as Mode}
            activeMode={mode}
            setMode={setMode}
            icon={icon}
            activeColor={color}
          />
        ))}
      </div>
    </div>
  );
};

const ModeButton = ({
  mode,
  activeMode,
  setMode,
  icon,
  activeColor,
}: {
  mode: Mode;
  activeMode: Mode;
  setMode: (mode: Mode) => void;
  icon: JSX.Element;
  activeColor: string;
}) => {
  return (
    <button
      onClick={() => setMode(mode)}
      className={`p-2 rounded-lg ${
        activeMode === mode ? `${activeColor} text-white` : "bg-gray-200"
      }`}
    >
      {icon}
    </button>
  );
};

const RenderContent = ({
  mode,
  background,
  participants,
}: {
  mode: Mode;
  background: string;
  participants: Participant[];
}) => {
  const getGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    return count <= 6 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3";
  };

  switch (mode) {
    case "single":
      return (
        <div className={`h-full ${background} p-4 rounded-lg`}>
          {participants.length > 0 && (
            <ParticipantCard participant={participants[0]} mode={mode} />
          )}
        </div>
      );
    case "banner":
      return (
        <div
          className={`h-full ${background} p-4 rounded-lg flex items-center`}
        >
          <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
            {participants.slice(0, 2).map((participant) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                mode={mode}
              />
            ))}
          </div>
        </div>
      );
    case "presentation":
      return (
        <div
          className={`h-full ${background} p-4 rounded-lg grid grid-cols-4 gap-4`}
        >
          <div className="col-span-3s bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <Monitor size={64} className="text-white" />
          </div>
          {participants.length > 0 && (
            <ParticipantCard participant={participants[0]} mode={mode} />
          )}
        </div>
      );
    default:
      return (
        <div className={`h-full ${background} p-4 rounded-lg`}>
          <div
            className={`grid ${getGridClass(participants.length)} gap-4 h-full`}
          >
            {participants.map((participant) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                mode={mode}
              />
            ))}
          </div>
        </div>
      );
  }
};

const ParticipantCard = ({
  participant,
  mode,
}: {
  participant: Participant;
  mode: Mode;
}) => {
  return (
    <div
      className={`bg-white rounded-md shadow-md flex items-center justify-center relative ${
        mode === "banner" || mode === "presentation" ? "aspect-video" : "h-full"
      }`}
    >
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
};

export default StreamingCanvas;
