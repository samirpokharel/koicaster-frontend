"use client";
import { Button } from "@/components/ui/button";
import { Briefcase, Flag, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import CommentSection from "./components/comments";
import BannerSection from "./components/banner";
import BrandSection from "./components/brand";
import PrivateChatsSection from "./components/private-chats";

interface Tab {
  key: string;
  label: string;
  icon: JSX.Element;
  component: JSX.Element;
}
interface Tabs {
  comments: Tab;
  banner: Tab;
  privateChats: Tab;
  brand: Tab;
}

export default function StudioSideBar() {
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
      component: <BannerSection />,
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
    <div
      className={`shadow-lg w-1/4  dark:border-l dark:border-[#1f1f1f] dark:text-white  'translate-x-0' flex`}
    >
      <div className="flex-1  overflow-auto">
        {tabs[activeTab as keyof Tabs].component}
      </div>
      <div className=" flex flex-col border-l dark:border-[#1f1f1f] justify-start  s">
        {Object.keys(tabs).map((key: string) => {
          const tab = tabs[key as keyof Tabs] as Tab;
          return (
            <>
              <Button
                variant={activeTab === tab.key ? "sharp" : "ghost"}
                className={`w-full h-20 p-4 ${
                  activeTab === tab.key
                    ? "dark:bg-[#1f1f1f] dark: text-gray-300 "
                    : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                <div className="flex flex-col rounded-none justify-center items-center">
                  <div className="h-7 w-7">{tab.icon}</div>
                  <div className={`text-sm `}>{tab.label}</div>
                </div>
              </Button>
            </>
          );
        })}
      </div>
    </div>
  );
}
