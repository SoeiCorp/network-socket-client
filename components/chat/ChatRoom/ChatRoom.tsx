"use client";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";

type Props = {
  chatroomId: number;
  senderId: number;
};

export default function ChatRoom({ chatroomId, senderId }: Props) {
  return (
    <div className="h-full w-full flex flex-col bg-neutral-100 border border-[#CBD5E1]">
      <ChatMessageList chatroomId={chatroomId} senderId={senderId} />
      <ChatInput chatroomId={chatroomId} />
    </div>
  );
}
