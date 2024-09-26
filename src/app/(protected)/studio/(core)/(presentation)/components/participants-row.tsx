"use client"
import {
  ScrollArea,
  ScrollBar,
} from "@/core/presentation/components/ui/scroll-area";
import { Mic, MicOff, Video } from "lucide-react";
import { useParticipantStore } from "../../application/use-participant-state";

export default function ParticipantsRows() {
  const { participants: users } = useParticipantStore();

  return (
    <div className="ml-16">
      <ScrollArea className="h-full">
        <div className="flex items-center space-x-4 p-2">
          {users.map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-700 rounded-lg relative overflow-hidden">
                <Video
                  className="absolute inset-0 m-auto text-gray-500"
                  size={24}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 flex justify-between items-center">
                  <span className="truncate max-w-[80%]">{user.name}</span>
                  {user.muted ? <MicOff size={10} /> : <Mic size={10} />}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
