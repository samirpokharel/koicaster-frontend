"use client";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import {
    Settings,
    Home,
    Library,
    Compass,
    Users,
    LogOut,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Link from "next/link.js";
import { usePathname, useRouter } from "next/navigation.js";

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

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    console.log(pathname);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    return (
        <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <header className="bg-white shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Add a menu button for mobile view */}
                    <Button variant="ghost" className="lg:hidden" onClick={toggleDrawer}>
                        <Menu className="w-6 h-6" />
                    </Button>
                    <div className="text-sm md:text-2xl font-bold">KOICASTER</div>
                </div>
                <div className="flex items-center space-x-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size={"sm"}>My Account</Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="end">
                            <div className="flex flex-col items-start p-4 space-y-2">
                                <div>My Account</div>
                                <Separator />
                                <Button variant="ghost">
                                    <LogOut className="w-5 h-5" /> Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </header>

            <div className="flex-1 flex">
                <div className="hidden lg:flex bg-white border-r p-8 flex-col items-start space-y-8 w-64">
                    {SIDEBAR_CONFIGS.map((item: SideBarConfig) => {
                        return (
                            <Button key={item.name} onClick={() => router.push(item.path)} variant="ghost">
                                {item.prefix}
                                {item.name}
                            </Button>
                        );
                    })}
                </div>

                {/* Drawer for smaller screens */}
                <DrawerContent className="lg:hidden bg-gray-300">
                    <div className=" border-r p-8 flex flex-col items-start space-y-8">
                        {SIDEBAR_CONFIGS.map((item: SideBarConfig) => {
                            return (
                                <Button key={item.name} onClick={() => {
                                    router.push(item.path)
                                    toggleDrawer()
                                }} variant="ghost">
                                    {item.prefix}
                                    {item.name}
                                </Button>
                            );
                        })}
                    </div>
                </DrawerContent>

                <div>{children}</div>
            </div>
        </Drawer>
    );
}
