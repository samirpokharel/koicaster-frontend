"use client"
import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { useSidebarContext } from "@/context/sidebar";
import Link from "next/link";

export default function Navbar() {
    const { toggleSidebar } = useSidebarContext();
    return <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            {/* Add a menu button for mobile view */}
            <Button variant="ghost" className="lg:hidden" onClick={toggleSidebar}>
                <Menu className="w-6 h-6" />
            </Button>
            <div className="text-sm md:text-2xl font-bold cursor-pointer">
                <Link href={"/"}>KOICASTER</Link>
            </div>
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
}