"use client";

import { useState, useEffect } from "react";
import PrivateChatCardList from "@/components/chat/ChatList/PrivateChatCardList";
import GroupChatCardList from "@/components/chat/ChatList/GroupChatCardList";
import React from "react";
import ChatLayout from "@/components/chat/ChatList/ChatLayout";
import Logo from "@/components/auth/Logo";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPrivateChat, setPrivateChat] = useState(false);

  // TEMPORARY
  const userId = "demoId";

  // Connect to websocket
  useEffect(() => {
    /*
    TODO:
      - connect to ws
      - set incoming message handler
    */
  }, []);

  return (
    <div className="flex gap-4 h-full bg-white">
      <div className="min-w-[430px] w-[30vw] h-full overflow-y-auto pl-4 flex flex-col gap-3">
        <Logo />

        {/* Selector between private/group chat */}
        <div className="w-full bg-slate-200 h-[50px] rounded-md p-[6px] flex items-center text-slate-800">
          <button
            className={`w-1/2 h-full flex items-center justify-center rounded-md ${
              isPrivateChat ? "bg-white" : "bg-slate-200"
            }`}
            onClick={() => setPrivateChat(true)}
          >
            <p className="text-sm">แชทส่วนตัว</p>
          </button>
          <button
            className={`w-1/2 h-full flex items-center justify-center rounded-md ${
              isPrivateChat ? "bg-slate-200" : "bg-white"
            }`}
            onClick={() => setPrivateChat(false)}
          >
            <p className="text-sm">แชทกลุ่ม</p>
          </button>
        </div>

        {/* ChatCardList base on isGroupChat */}
        {isPrivateChat ? (
          <PrivateChatCardList userId={userId} />
        ) : (
          <GroupChatCardList userId={userId} />
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
