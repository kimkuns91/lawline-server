"use client";

import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

import { IoMenu } from "react-icons/io5";
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import SideBarButton from "@/components/SidebarButton";
import { TbMinusVertical } from "react-icons/tb";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("min-h-screen max-h-screen w-full", "flex md:flex-col")}>
      {/* desktop sidebar */}
      <SideBar isSidebarVisible={isSidebarVisible} />
      <div
        className={cn(
          "flex-1 relative",
          "bg-secondary",
          "transition-all duration-300 ease-in-out",
          isSidebarVisible ? "ml-0 md:ml-64" : "ml-0",
          "border-l border-border"
        )}
      >
        <SideBarButton
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
        {/* mobile nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
        {children}
      </div>
    </div>
  );
}
