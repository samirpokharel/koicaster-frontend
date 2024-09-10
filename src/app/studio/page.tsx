"use client"
import React, { useState } from 'react';
import { Mic, MicOff, Video, MonitorUp, PhoneOff, MessageSquare, Flag, Mail, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link.js';

const LiveStreamStudio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('comments');
  const users = [
    { name: 'User 1', muted: false },
    { name: 'User 2', muted: true },
    { name: 'User 3', muted: false },
    { name: 'User 4', muted: true },
  ];

  const tabs = [
    {
      id: 'comments', label: 'Comments', icon: <MessageSquare className='h-full w-full' />
    },
    { id: 'banner', label: 'Banner', icon: <Flag className='h-full w-full' /> },
    { id: 'privateChats', label: 'Private Chats', icon: <Mail className='h-full w-full' /> },
    { id: 'brand', label: 'Brand', icon: <Briefcase className='h-full w-full' /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);



  const renderTabContent = () => {
    switch (activeTab) {
      case 'comments':
        return <div className="p-4">Comments content goes here</div>;
      case 'banner':
        return <div className="p-4">Banner content goes here</div>;
      case 'privateChats':
        return <div className="p-4">Private Chats content goes here</div>;
      case 'brand':
        return <div className="p-4">Brand content goes here</div>;
      default:
        return null;
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
          <div className="flex-1 flex">
            <div className={`bg-black flex-1 w-full transition-all duration-300`}>
              <div className="text-white text-center pt-32">Streaming Canvas</div>
            </div>
          </div>

          {/* User Row */}
          <div className=" ">
            <ScrollArea className="h-full">
              <div className="flex items-center space-x-4 p-2">
                {users.map((user, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-40 h-40 bg-gray-700 rounded-lg relative overflow-hidden">
                      <Video className="absolute inset-0 m-auto text-gray-500" size={24} />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 flex justify-between items-center">
                        <span className="truncate max-w-[80%]">{user.name}</span>
                        {user.muted ? <MicOff size={10} /> : <Mic size={10} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Action Buttons */}
          <div className="w-3/5 flex m-5 justify-center item-center">
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
        </div>
        <div className='w-1/12'></div>
        {/* Sidebar */}
        <div className={`shadow-lg w-1/4    'translate-x-0' flex`}>


          <div className="flex-1  overflow-auto">
            {renderTabContent()}
          </div>

          <div className=" bg-gray-200 flex flex-col justify-start  pt-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}

                variant={activeTab === tab.id ? "sharp" : "ghost"}
                className={`w-full h-20 p-4`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex flex-col rounded-none justify-center items-center">
                  <div className='h-7 w-7'>
                    {tab.icon}
                  </div>
                  <div className={`text-sm `}>{tab.label}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default LiveStreamStudio;