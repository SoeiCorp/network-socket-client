"use client";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";

type Props = {
  chatroomId: number;
  senderId: number;
  isGroupChat: boolean;
};

export default function ChatRoom({ chatroomId, senderId, isGroupChat }: Props) {
  return (
    <div className="h-full w-full flex flex-col bg-neutral-100 border border-[#CBD5E1]">
      <ChatMessageList
        chatroomId={chatroomId}
        senderId={senderId}
        isGroupChat={isGroupChat}
      />
      <ChatInput chatroomId={chatroomId} />
    </div>
  );
}
