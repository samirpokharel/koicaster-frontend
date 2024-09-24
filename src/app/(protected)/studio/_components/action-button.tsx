import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mic, MonitorUp, PhoneOff, Plus, Video } from "lucide-react";

export default function ActionButton() {
  return (
    <div className="ml-20 w-3/5 dark:text-white flex m-5 justify-center item-center">
      <div className="flex p-5 space-x-4 shadow-2xl border dark:border-[#1f1f1f]">
        <Button variant="ghost" size="lg">
          <Mic className="h-6 w-6 mr-2" />
          Mute
        </Button>
        <Separator orientation="vertical" className="h-10" />

        <Button variant="ghost" size="lg">
          <Video className="h-6 w-6 mr-2" />
          Stop Video
        </Button>
        <Separator orientation="vertical" className="h-10" />

        <Button variant="ghost" size="lg">
          <Plus className="h-6 w-6 mr-2" />
          Add Member
        </Button>
        <Separator orientation="vertical" className="h-10" />

        <Button variant="ghost" size="lg">
          <MonitorUp className="h-6 w-6 mr-2" />
          Share Screen
        </Button>
        <Separator orientation="vertical" className="h-10" />
        <Button variant="destructive" size="lg">
          <PhoneOff className="h-6 w-6 mr-2" />
          End
        </Button>
      </div>
    </div>
  );
}
