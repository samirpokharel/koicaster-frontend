"use client";

import { Button } from "@/core/presentation/components/ui/button";
import type { Tab, Tabs } from "../../domain/StudioTab";

export default function StudioSideBar({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Tabs;
  activeTab: string;
  setActiveTab: (key: string) => void;
}) {
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
            <div key={key}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
