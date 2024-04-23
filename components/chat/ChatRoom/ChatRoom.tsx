"use client";

import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

type Props = {
  chatroomId: number;
  isGroupChat: boolean;
};

export default function ChatRoom({ chatroomId, isGroupChat }: Props) {
  return (
    <div className="h-full w-full flex flex-col bg-slate-100 border border-[#CBD5E1]">
      <ChatMessageList
        currentChatroomId={chatroomId}
        isGroupChat={isGroupChat}
      />
      <ChatInput chatroomId={chatroomId} />
    </div>
  );
}
