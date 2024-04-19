"use client";
import ChatMessageListByDate from "./ChatMessageListByDate";
import { ChatMessage } from "@/drizzle/schemas/chatMessages";
import { useRef, useEffect, useState } from "react";

type Props = {
  chatroomId: number;
  senderId: number;
};

// ChatMessage need to have "name" of the sender too
export interface MessagesGroupByDate {
  Date: string;
  Messages: ChatMessage[];
}

// TEMPORARY
const messages: MessagesGroupByDate[] = [
  {
    Date: "Fri Apr 19 2024",
    Messages: [
      {
        id: 1,
        type: "text",
        createdAt: new Date("2024-04-19T08:00:00Z"),
        chatroomId: 1,
        userId: 1,
        content: "Hello there!",
      },
      {
        id: 2,
        type: "image",
        createdAt: new Date("2024-04-19T08:05:00Z"),
        chatroomId: 1,
        userId: 2,
        content:
          "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?q=10&h=200",
      },
      {
        id: 3,
        type: "text",
        createdAt: new Date("2024-04-19T08:10:00Z"),
        chatroomId: 1,
        userId: 1,
        content: "How are you?",
      },
    ],
  },
  {
    Date: "Sat Apr 20 2024",
    Messages: [
      {
        id: 4,
        type: "text",
        createdAt: new Date("2024-04-18T10:00:00Z"),
        chatroomId: 2,
        userId: 3,
        content: "Good morning!",
      },
      {
        id: 5,
        type: "text",
        createdAt: new Date("2024-04-18T10:05:00Z"),
        chatroomId: 2,
        userId: 4,
        content: "Morning! How's it going?",
      },
    ],
  },
];

export default function ChatMessageList({ chatroomId, senderId }: Props) {
  const [messagesByDate, setMessagesByDate] =
    useState<MessagesGroupByDate[]>(messages);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO : fetch chatmessage of chatroomId (need sender name too)

  const bottomOfPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (bottomOfPanelRef.current) {
        bottomOfPanelRef.current.scrollIntoView({ block: "end" });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [messagesByDate]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-slate-400 text-[14px] h-full w-full px-3 pb-[6px] overflow-y-auto overflow-x-hidden pt-4 lg:px-3 lg:pb-2 lg:text-[16px]">
          {/* <div className="w-8 h-8 border-[6px] border-slate-400 rounded-full animate-spin"></div> */}
          <svg
            className="animate-spin h-[48px] w-[48px] text-slate-800 lg:h-8 lg:w-8"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
              stroke="slate"
            />
            <path
              d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
              stroke="slate"
            />
          </svg>
        </div>
      ) : messagesByDate.length ? (
        <div className="h-full w-full px-3 overflow-y-auto overflow-x-hidden pt-4 lg:px-3">
          <div className="flex flex-col-reverse">
            {messagesByDate
              .slice()
              .reverse()
              .map((messageByDate, index) => (
                <ChatMessageListByDate
                  key={index}
                  messageByDate={messageByDate}
                  senderId={senderId}
                />
              ))}
          </div>
          <div ref={bottomOfPanelRef}></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-end text-slate-400 text-[14px] h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2 lg:text-[16px]">
          เริ่มต้นการแชทกับคนคนนี้!
        </div>
      )}
    </>
  );
}
