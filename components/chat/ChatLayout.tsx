"use client";

import { useState, useEffect } from "react";
import PrivateChatCardList from "@/components/chat/ChatList/PrivateChatCardList";
import GroupChatCardList from "@/components/chat/ChatList/GroupChatCardList";
import React from "react";
import Logo from "@/components/auth/Logo";
import Image from "next/image";
import CreateNewGroupButton from "@/components/chat/ChatList/CreateNewGroupButton";
import Profile from "@/components/chat/ChatList/Profile";
import { ChatroomResult, UserResult } from "@/app/chat/layout";
import { AppWrapper } from "@/context";
import { connect } from "../socket/client";
import { socket } from "../socket/client";
import { revalidateUsers } from "@/lib/actions";

interface ChatLayoutProps {
  children: React.ReactNode;
  allUsers: UserResult[];
  allGroups: {
    joinedGroup: ChatroomResult[];
    notJoinedGroup: ChatroomResult[];
  };
}

export default function ChatLayout({
  children,
  allUsers,
  allGroups,
}: ChatLayoutProps) {
  // Switch between private and group chatrooms list
  const [isPrivateChat, setPrivateChat] = useState(true);
  const [onlineIds, setOnlineIds] = useState<string[]>([]);

  // Connect to WS
  useEffect(() => {
    connect();
    socket.on("users online", async (data: string[]) => {
      await revalidateUsers();
      setOnlineIds(data);
    });
  }, []);

  return (
    <AppWrapper>
      <div className="min-w-[430px] w-[30vw] h-full overflow-y-auto pl-4 flex flex-col">
        <Logo />

        {/* Selector between private/group chat */}
        <div className="w-full bg-slate-200 h-[50px] rounded-md p-[6px] flex items-center text-slate-800">
          <button
            className={`w-1/2 h-full flex items-center justify-center rounded-md active:bg-slate-50 hover:bg-slate-100 ${
              isPrivateChat ? "bg-white" : "bg-slate-200"
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
            className={`w-1/2 h-full flex items-center justify-center rounded-md active:bg-slate-50 hover:bg-slate-100 ${
              isPrivateChat ? "bg-slate-200" : "bg-white"
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
        {!isPrivateChat && <CreateNewGroupButton />}

        {/* ChatCardList base on isGroupChat */}
        {isPrivateChat ? (
          <div className="overflow-y-auto mt-[10px] h-[75%]">
            <PrivateChatCardList allUsers={allUsers} onlineIds={onlineIds} />
          </div>
        ) : (
          <div className="overflow-y-auto mt-[10px] h-[70%]">
            <GroupChatCardList allGroups={allGroups} />
          </div>
        )}

        {/* Edit name and logout bar */}
        <Profile />
      </div>

      <div className="w-full">{children}</div>
    </AppWrapper>
  );
}
