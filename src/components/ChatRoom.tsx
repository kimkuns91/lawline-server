"use client";

import { useEffect, useRef, useState } from "react";

import { AIChatRoom } from "@prisma/client";
import { CHAT_HOME_INPUT_STATE_SESSION_KEY } from "@/lib/constant/session_key";
import ChatMessage from "./ChatMessage";
import { CoreMessage } from "ai";
import { FaPaperPlane } from "react-icons/fa";
import Spinner from "./Spinner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { continueConversation } from "@/lib/openai";
import { readStreamableValue } from "ai/rsc";

interface ChatRoomProps {
  roomInfo: AIChatRoom;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomInfo }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchInputStateAndSendMessage = async () => {
      try {
        const inputState = sessionStorage.getItem(
          CHAT_HOME_INPUT_STATE_SESSION_KEY
        );

        if (inputState && roomInfo.id) {
          const newMessage: CoreMessage[] = [
            { content: inputState, role: "user" },
          ];
          setMessages(newMessage);
          setLoading(false);

          const result = await continueConversation(newMessage, roomInfo.id);
          let finalContent = "";

          for await (const content of readStreamableValue(result)) {
            setMessages([
              ...newMessage,
              {
                role: "assistant",
                content: content as string,
              },
            ]);
            finalContent = content as string;
          }

          await axios.post("/api/ai/chat", {
            messages: { role: "assistant", content: finalContent },
            roomId: roomInfo.id,
          });
          sessionStorage.removeItem(CHAT_HOME_INPUT_STATE_SESSION_KEY);
        }

        if (!inputState && roomInfo.id) {
          try {
            setLoading(true);
            const result = await axios.get(`/api/ai/room/${roomInfo.id}`);
            setMessages(result.data);
          } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        // API 호출 중 발생한 오류 처리
      }
    };

    fetchInputStateAndSendMessage();
  }, [roomInfo.id]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      // 입력 값이 없으면 함수 종료
      return;
    }

    setIsSending(true); // 메시지 전송 상태로 설정

    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: "user" },
    ];

    setMessages(newMessages);
    setInput("");

    const result = await continueConversation(newMessages, roomInfo.id);
    let finalContent = "";

    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);
      finalContent = content as string;
    }

    try {
      await axios.post("/api/ai/chat", {
        messages: { role: "assistant", content: finalContent },
        roomId: roomInfo.id,
      });
      console.log("Messages saved to the server");
    } catch (error) {
      console.error("Error saving messages to the server:", error);
    }

    setIsSending(false); // 메시지 전송 완료 후 상태 초기화
  };

  if (loading)
    return (
      <div className="size-full flex items-center justify-center text-3xl">
        <Spinner colors="#01C027" />
      </div>
    );

  return (
    <div className={cn("w-full h-[95vh] lg:size-full", "flex flex-col relative")}>
      <div
        ref={chatContainerRef}
        className="scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6"
      >
        <div className="w-full lg:max-w-[800px] mx-auto px-4 md:px-28 md:py-6">
          {messages &&
            messages.map((m, i) => (
              <div key={i}>
                <ChatMessage role={m.role} content={m.content as string} />
              </div>
            ))}
        </div>
      </div>
      <form
        className="mb-8 w-full lg:max-w-[800px] mx-auto px-4 lg:px-28"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between rounded-full border border-slate-300 px-6 py-2 shadow-xl">
          <input
            className="flex-1 bg-transparent p-2 text-slate-900 placeholder:text-gray-500 focus:outline-none"
            value={input}
            placeholder="LawLine AI 봇에게 법률에 대해 물어보세요."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={cn(
              "ml-4 p-2",
              isSending ? "opacity-50 cursor-not-allowed" : "text-slate-700"
            )}
            disabled={isSending || !input.trim()} // 메시지 전송 중이거나 입력 값이 없으면 비활성화
          >
            {isSending ? (
              <Spinner /> // 로딩 스피너 아이콘
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChatRoom;
