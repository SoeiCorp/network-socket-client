"use client";

import { useState, useEffect } from "react";
import PrivateChatCardList from "@/components/chat/ChatList/PrivateChatCardList";
import GroupChatCardList from "@/components/chat/ChatList/GroupChatCardList";
import React from "react";
import ChatLayout from "@/components/chat/ChatList/ChatLayout";
import Logo from "@/components/auth/Logo";
import Image from "next/image";
import CreateNewGroupButton from "@/components/chat/ChatList/CreateNewGroupButton";
import Profile from "@/components/chat/ChatList/Profile";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPrivateChat, setPrivateChat] = useState(false);

  const [nameOfMe, setNameOfMe] = useState("");

  // TEMPORARY
  const userId = 123;

  // Connect to websocket
  useEffect(() => {
    /*
    TODO:
      - connect to ws
      - set incoming message handler
    */
    setNameOfMe("Jai");
  }, []);

  return (
    <div className="flex gap-4 h-full bg-white">
      <div className="min-w-[430px] w-[30vw] h-full overflow-y-auto pl-4 flex flex-col">
        <Logo />

        {/* Selector between private/group chat */}
        <div className="w-full bg-slate-200 h-[50px] rounded-md p-[6px] flex items-center text-slate-800">
          <button
            className={`w-1/2 h-full flex items-center justify-center rounded-md ${isPrivateChat ? "bg-white" : "bg-slate-200"
              }`}
            onClick={() => setPrivateChat(true)}
          >
            <Image
              src={"/icons/human.svg"}
              width={20}
              height={20}
              alt="plus"
              className="mr-[10px]"
            />
            <p className="text-sm">แชทส่วนตัว</p>
          </button>
          <button
            className={`w-1/2 h-full flex items-center justify-center rounded-md ${isPrivateChat ? "bg-slate-200" : "bg-white"
              }`}
            onClick={() => setPrivateChat(false)}
          >
            <Image
              src={"/icons/humans.svg"}
              width={23}
              height={23}
              alt="plus"
              className="mr-[10px]"
            />
            <p className="text-sm">แชทกลุ่ม</p>
          </button>
        </div>

        {/* Create new group bar */}
        {!isPrivateChat &&
          <CreateNewGroupButton />
        }

        {/* ChatCardList base on isGroupChat */}
        {isPrivateChat ? (
          <div className="overflow-y-auto mt-[10px] h-[75%]">
            <PrivateChatCardList userId={userId} />
          </div>
        ) : (
          <div className="overflow-y-auto mt-[10px] h-[67%]">
            <GroupChatCardList userId={userId} />
          </div>
        )}

        {/* Edit name and logout bar */}
        <Profile name={nameOfMe} />
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
