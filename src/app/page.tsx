"use client";

import { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return redirect("/ai");
}
