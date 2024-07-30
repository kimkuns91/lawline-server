"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ChatIntroProps {
  userId?: string;
}

const ChatIntro: React.FC<ChatIntroProps> = ({ userId }) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const storedInput = sessionStorage.getItem(
      "CHAT_HOME_INPUT_STATE_SESSION_KEY"
    );
    if (storedInput) {
      setInput(storedInput);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    const inputValue = textarea.value;
    setInput(inputValue);
    sessionStorage.setItem("CHAT_HOME_INPUT_STATE_SESSION_KEY", inputValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const result = await axios.post("/api/ai/room", { input, userId });
    const newRoomId = result.data.id;
    router.push(`/ai/chat/u/${newRoomId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e as any);
    }
  };

  return (
    <div
      className={cn(
        "size-full",
        "max-w-[800px] mx-auto",
        "flex flex-col relative",
        "px-4 py-6",
        "md:px-28 md:py-6"
      )}
    >
      <div className="flex flex-1 items-center justify-center flex-col overflow-y-auto px-4 py-6 md:items-start">
        <h2 className="font-semibold text-2xl mb-8 leading-snug md:text-3xl">
          어렵고 멀기만 했던 법률 지식 <br />
          <span className="text-primary">로라인</span>이 있으니깐 걱정없어요
        </h2>
        <form className="mb-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col bg-input rounded-2xl border border-muted px-4 py-4 shadow-xl">
            <textarea
              className="flex-1 bg-transparent p-2 text-foreground placeholder:text-gray-500 focus:outline-none resize-none overflow-hidden"
              style={{
                minHeight: "calc(1.5em * 4)",
                maxHeight: "calc(1.5em * 8)",
                lineHeight: "1.5em",
              }}
              value={input}
              placeholder="로라인 봇에게 법률 상담을 해보세요."
              onChange={(e) => handleInputChange(e)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-end justify-end">
              <button
                type="submit"
                className={cn(
                  "ml-4 p-2 cursor-pointer transition-all duration-200 hover:opacity-60",
                  "text-sm bg-primary rounded-full",
                  isSending ? "opacity-50 cursor-not-allowed" : "text-slate-100"
                )}
                disabled={isSending || !input.trim()} // 메시지 전송 중이거나 입력 값이 없으면 비활성화
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </form>
        {/* <div className="w-full flex mb-4 gap-4 flex-col md:flex-row md:gap-2">
          <Link
            href="/"
            className="flex md:flex-1 items-center justify-center px-8 py-6 shadow-xl bg-black text-white rounded-full font-bold text-lg hover:opacity-60 transition-all ease-in-out duration-300"
          >
            전문가 AI 찾기
          </Link>
          <Link
            href="/"
            className="flex md:flex-[2] items-center justify-center px-8 py-6 shadow-xl bg-input border border-muted rounded-full font-bold text-lg hover:opacity-60 transition-all ease-in-out duration-300"
          >
            로라인 질문 가이드
            <FaArrowRight className="font-base ml-2" />
          </Link>
        </div> */}
        <span className="font-semibold text-muted text-sm md:text-base">
          * 로라인 봇의 법률 상담은 법적 효력을 가지지 않습니다
        </span>
      </div>
    </div>
  );
};

export default ChatIntro;
