"use client"
import React from "react";
import { Settings, Home, Library, Compass, Users } from "lucide-react";
import { Button } from "../ui/button";
import { DrawerContent } from "../ui/drawer";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/store/useSidebarState";

interface SideBarConfig {
  name: string;
  path: string;
  prefix: React.JSX.Element;
}

const SIDEBAR_CONFIGS: SideBarConfig[] = [
  {
    name: "Home",
    path: "/dashboard",
    prefix: <Home className="w-6 h-6 mr-2" />,
  },
  {
    name: "Library",
    path: "/dashboard/library",
    prefix: <Library className="w-6 h-6 mr-2" />,
  },
  {
    name: "Destinations",
    path: "/dashboard/destinations",
    prefix: <Compass className="w-6 h-6 mr-2" />,
  },
  {
    name: "Members",
    path: "/dashboard/members",
    prefix: <Users className="w-6 h-6 mr-2" />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    prefix: <Settings className="w-6 h-6 mr-2" />,
  },
];

export function SidebarNav() {
  const { toggleSidebar } = useSidebarStore();
  const router = useRouter();

  return (
    <div>
      <div className="flex-1 flex fixed h-full">
        <div className="hidden lg:flex bg-white border-r p-8 flex-col items-start space-y-8 w-64">
          {SIDEBAR_CONFIGS.map((item: SideBarConfig) => {
            return (
              <SidebarItem
                key={item.name}
                onClick={() => router.push(item.path)}
                item={item}
              />
            );
          })}
        </div>

        {/* Drawer for smaller screens */}
        <DrawerContent className="lg:hidden bg-gray-300">
          <div className=" border-r p-8 flex flex-col items-start space-y-8">
            {SIDEBAR_CONFIGS.map((item: SideBarConfig) => {
              return (
                <SidebarItem
                  key={item.name}
                  onClick={() => {
                    toggleSidebar()
                    router.push(item.path);
                  }}
                  item={item}
                />
              );
            })}
          </div>
        </DrawerContent>
      </div>
    </div>
  );
}

interface SidebarItemParams {
  item: SideBarConfig;
  onClick: () => void;
}

const SidebarItem = ({ item, onClick }: SidebarItemParams) => {
  return (
    <Button onClick={onClick} variant="ghost">
      {item.prefix}
      {item.name}
    </Button>
  );
};
