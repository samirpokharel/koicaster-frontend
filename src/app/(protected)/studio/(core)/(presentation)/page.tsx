"use client";
import React, { useState } from "react";
import type { Tabs } from "../domain/StudioTab";
import { Briefcase, Flag, Mail, MessageSquare } from "lucide-react";

//
import StudioNavbar from "./components/studio-navbar";
import StudioSideBar from "./components/studio-sidebar";
import StreamingCanvas from "./components/streaming_canvas";
import ParticipantsRows from "./components/participants-row";
import ActionButton from "./components/action-button";

//
import FolderAndBannerManagement from "../../banner/presenation/banner";
import CommentSection from "../../comments/presentation/comments";
import PrivateChatsSection from "../../private-chats/presentation/private-chats";
import BrandSection from "../../brand/presentation/brand";

const LiveStreamStudio = () => {
  const tabs: Tabs = {
    comments: {
      key: "comments",
      label: "Comments",
      icon: <MessageSquare className="h-full w-full" />,
      component: <CommentSection />,
    },
    banner: {
      key: "banner",
      label: "Banner",
      icon: <Flag className="h-full w-full" />,
      component: <FolderAndBannerManagement />,
    },
    privateChats: {
      key: "private-chats",
      label: "Private Chats",
      icon: <Mail className="h-full w-full" />,
      component: <PrivateChatsSection />,
    },
    brand: {
      key: "brand",
      label: "Brand",
      icon: <Briefcase className="h-full w-full" />,
      component: <BrandSection />,
    },
  };

  const [activeTab, setActiveTab] = useState<string>("comments");
  return (
    <div className="h-screen gap-10 ">
      <StudioNavbar />
      <div className="flex h-[92vh]">
        <div className="flex-1 flex flex-col">
          <StreamingCanvas />
          <ParticipantsRows />
          <ActionButton />
        </div>
        <StudioSideBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </div>
    </div>
  );
};

export default LiveStreamStudio;
