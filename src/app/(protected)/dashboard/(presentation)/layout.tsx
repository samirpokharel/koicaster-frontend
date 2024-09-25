"use client";
import React from "react";
import { SidebarNav } from "./_components/side_bar";
import { Drawer } from "@/core/presentation/components/ui/drawer";
import { useSidebarStore } from "../application/use-sidebar-state";

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
