import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mic, MonitorUp, PhoneOff, Video } from "lucide-react";

export default function ActionButton() {
    return <div className="w-3/5 flex m-5 justify-center item-center">
        <div className="flex p-5 space-x-4 shadow-2xl">
            <Button variant="ghost" size="lg" >
                <Mic className="h-6 w-6 mr-2" />
                Mute
            </Button>
            <Button variant="ghost" size="lg" >
                <Video className="h-6 w-6 mr-2" />
                Stop Video
            </Button>
            <Button variant="ghost" size="lg" >
                <MonitorUp className="h-6 w-6 mr-2" />
                Share Screen
            </Button>
            <Separator orientation="vertical" className="h-10 bg-gray-300" />
            <Button variant="destructive" size="lg">
                <PhoneOff className="h-6 w-6 mr-2" />
                End
            </Button>
        </div>
    </div>
}