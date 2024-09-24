"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Film, Plus, Tv, Video } from "lucide-react";
import { useState } from "react";

// 07801000000020601989

export default function CreateStream() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [source, setSource] = useState("studio");
  const [destination, setDestination] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateStream = () => {
    console.log({ source, destination, title, description });
    setIsDialogOpen(false);
    // Here you would typically send this data to your backend
  };
  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="px-6">
            <Video className="mr-2 h-4 w-4" /> Live Stream
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#141414] dark:text-white ">
          <DialogHeader>
            <DialogTitle>Create Live Stream</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="font-bold py-3">Destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="twitch">Twitch</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="custom">
                    <span className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="font-bold py-3" htmlFor="title">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="font-bold py-3" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button type="button" onClick={handleCreateStream}>
              Create Live Stream
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
