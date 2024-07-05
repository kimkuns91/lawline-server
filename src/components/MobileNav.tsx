"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import RoomList from "./RoomList";
import { links } from "@/lib/constant/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const MobileNav = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center ml-4 mt-4">
        <CiMenuFries className="text-[22px] text-foreground font-bold" />
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <Image
              className="pl-4 mb-6"
              src="/images/Logo.png"
              alt="LawLine Logo"
              width={160}
              height={0}
            />
          </Link>
        </div>
        <RoomList session={session} status={status} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
