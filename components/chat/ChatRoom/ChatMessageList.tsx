"use client";
import ChatMessageListByDate from "./ChatMessageListByDate";
import { useRef, useEffect, useState } from "react";
import { useAppContext } from "@/context";

type Props = {
  chatroomId: number;
  isGroupChat: boolean;
};

export type ChatMessageWithName = {
  id: number;
  type: "text" | "image";
  createdAt: Date;
  chatroomId: number;
  userId: number;
  userName: string;
  content: string;
};

export interface MessagesGroupByDate {
  Date: string;
  Messages: ChatMessageWithName[];
}

export default function ChatMessageList({ chatroomId, isGroupChat }: Props) {
  const [messagesByDate, setMessagesByDate] = useState<MessagesGroupByDate[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { context, setContext } = useAppContext();
  const userId = context.userId;

  useEffect(() => {
    const fetchChatMessages = async (chatroomId: number, userId: number) => {
      try {
        const response = await fetch(`/api/chatrooms/${chatroomId}/messages`);
        if (response.ok) {
          console.log("Successfully fetched chat messages");
          const res = await response.json();
          setMessagesByDate(transformData(res.data));
          console.log(transformData(res.data));
        } else {
          throw new Error("Failed to fetch chat messages");
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchChatMessages(chatroomId, userId);
  }, [chatroomId, userId]);

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
                  senderId={userId}
                  isGroupChat={isGroupChat}
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

function transformData(data: ChatMessageWithName[]): MessagesGroupByDate[] {
  const formattedData: MessagesGroupByDate[] = [];

  data.forEach((message) => {
    const dateKey = new Date(message.createdAt).toDateString();
    const existingDate = formattedData.find((item) => item.Date === dateKey);

    const formattedMessage: ChatMessageWithName = {
      ...message,
      createdAt: new Date(message.createdAt),
    };

    if (existingDate) {
      existingDate.Messages.push(formattedMessage);
    } else {
      formattedData.push({
        Date: dateKey,
        Messages: [formattedMessage],
      });
    }
  });

  return formattedData;
}
