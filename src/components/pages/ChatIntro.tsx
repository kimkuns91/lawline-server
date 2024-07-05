"use client";

import { useEffect, useState } from "react";

import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const ChatIntro = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "size-full",
        "max-w-[800px] mx-auto",
        "flex flex-col relative",
        "bg-background text-foreground",
        "px-28 py-6"
      )}
    >
      <h1 className="text-3xl font-bold mb-8">LawLine AI와 대화해보세요</h1>
      <div className="space-x-4 mb-8">
        <button
          onClick={() => setTheme("light")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Light Mode
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
        >
          Dark Mode
        </button>
      </div>
      <p className="mb-4">
        어려운 법률 문제를 AI와 함께 해결해 보세요. LawLine AI는 최신 법률
        지식을 바탕으로 여러분의 질문에 답변을 제공합니다.
      </p>
      <div className="flex-1 bg-card p-4 rounded-md shadow-md">
        <p>대화를 시작하려면 질문을 입력하세요.</p>
        {/* 여기에 대화 UI 요소들을 추가할 수 있습니다 */}
      </div>
    </div>
  );
};
export default ChatIntro;
