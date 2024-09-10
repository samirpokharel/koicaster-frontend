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
import { usePathname, useRouter } from "next/navigation";
import { SidebarNav } from "@/components/sidebar/index";
import { useSidebarContext } from "@/context/sidebar";
import Navbar from "@/components/navbar";


export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const { isOpen, toggleSidebar, setIsOpen } = useSidebarContext();

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <SidebarNav />
            <div className="w-full lg:pl-64">{children}</div>
        </Drawer>
    );
}
