"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

import CustomIconLink from "./CustomIconLink";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { MdHome } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import RoomList from "./RoomList";
import SkeletonList from "./SkeletonList";
import { Switch } from "./ui/switch";
import UserController from "./UserController";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

interface SideBarProps {
  isSidebarVisible: boolean;
}

export default function SideBar({ isSidebarVisible }: SideBarProps) {
  const { data: session, status } = useSession();
  const [darkmode, setDarkmode] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  console.log("session", session);

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      setDarkmode(true);
    } else {
      setDarkmode(false);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "hidden md:flex",
        "fixed left-0 top-0",
        "h-full",
        "transition-transform duration-300 ease-in-out",
        "bg-background text-foreground",
        isSidebarVisible ? "translate-x-0" : "-translate-x-full",
        "flex-col z-50"
      )}
      style={{ width: "260px" }}
    >
      <div className={cn("px-2 py-6", "border-b border-border")}>
        <Link href="/">
          <Image
            className="pl-4 mb-6"
            src="/images/Logo.png"
            alt="LawLine Logo"
            width={160}
            height={0}
          />
        </Link>
        <CustomIconLink
          href="/ai"
          icon={<MdHome className="text-lg" />}
          text="채팅 홈"
        />
        <CustomIconLink
          href="/ai/characters"
          icon={<RiRobot2Line className="text-lg" />}
          text="AI 캐릭터 홈"
        />
      </div>
      <div className="p-4 px-6">
        <p className="text-primary text-sm font-semibold">대화 내역</p>
      </div>
      {status === "authenticated" ? (
        <RoomList session={session} status={status} />
      ) : (
        <SkeletonList />
      )}
      <div className="flex flex-col gap-4 items-center justify-center p-4">
        <div className="flex items-center space-x-4">
          <FaSun
            className={cn(
              "text-2xl",
              !darkmode ? "text-primary" : "text-muted"
            )}
          />
          <Switch
            id="theme-button"
            className=""
            onClick={handleThemeChange}
            checked={darkmode}
          />
          <FaMoon
            className={cn(
              "text-2xl",
              darkmode ? "text-primary" : "text-muted"
            )}
          />
        </div>
      </div>
      {status === "authenticated" ? (
        <UserController session={session} />
      ) : (
        <LoginButton status={status} />
      )}
    </div>
  );
}
