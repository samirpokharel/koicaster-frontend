"use client";
import { LogIn, LogInIcon, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { HIDE_NAV_PATHS } from "@/lib/constant";
import { useSidebarStore } from "@/store/useSidebarState";
import { useAuth } from "@/hooks/useAuth";
import { ModeToggle } from "../ui/mode-toggle";
import Image from "next/image";
import LogoDark from "@/public/Dark.svg";
import LogoLight from "@/public/light.svg";


export default function Navbar() {
  const pathName = usePathname();
  const { toggleSidebar } = useSidebarStore();
  const { user, logout } = useAuth();

  const isLogin = user !== null;

  if (HIDE_NAV_PATHS.includes(pathName)) return <></>;
  return (
    <header className="border-b  dark:border-[#444] dark:bg-[#141414] dark:text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </Button>
        <div className="text-sm md:text-2xl font-bold cursor-pointer">
          <Link href={"/"}>
            <Image
              src={LogoDark}
              className="hidden dark:block"
              alt="Koicaster"
              height={50}
              width={200}
            />
            <Image
              src={LogoLight}
              className="block dark:hidden"
              alt="Koicaster"
              height={50}
              width={200}
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        {isLogin ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"sm"}>My Account</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end">
              <div className="flex flex-col items-start p-4 space-y-2">
                <div>My Account</div>
                <Separator />
                <Button
                  onClick={() => {
                    window.location.href = "/login";
                    logout();

                    // redirect("/");
                  }}
                  variant="ghost"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button onClick={logout} variant="default">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
