"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Film, Plus, Tv, Video } from "lucide-react";


import PastStreamComponent from "@/app/dashboard/components/past_stream";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StreamingDashboard = () => {
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
        <div className="p-5">
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Stream</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-start">
                        <div className="bg-white">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="px-6">
                                        <Video className="mr-2 h-4 w-4" /> Live Stream
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Create Live Stream</DialogTitle>
                                    </DialogHeader>
                                    <form className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label className="font-bold py-3">Source</Label>
                                            <RadioGroup value={source} onValueChange={setSource} className="flex">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="studio" id="studio" />
                                                    <Label htmlFor="studio" className="flex items-center">
                                                        <Tv className="mr-2 h-4 w-4" />
                                                        Studio
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="preRecorded" id="preRecorded" />
                                                    <Label htmlFor="preRecorded" className="flex items-center">
                                                        <Film className="mr-2 h-4 w-4" />
                                                        Pre-recorded
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
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
                                            <Label className="font-bold py-3" htmlFor="title">Title</Label>
                                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="font-bold py-3" htmlFor="description">Description</Label>
                                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        <Button type="button" onClick={handleCreateStream}>Create Live Stream</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
                <PastStreamComponent />
            </div>
        </div>
    );
};

export default StreamingDashboard;
