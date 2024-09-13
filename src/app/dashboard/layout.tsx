"use client"
import React from "react";
import { Drawer } from "@/components/ui/drawer";
import { SidebarNav } from "@/components/sidebar/index";
import { useSidebarStore } from "@/store/useSidebarState";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen } = useSidebarStore();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <SidebarNav />
      <div className="w-full lg:pl-64">{children}</div>
    </Drawer>
  );
}
