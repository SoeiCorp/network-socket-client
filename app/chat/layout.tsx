"use client";

import { useState, useEffect } from "react";
import PrivateChatCardList from "@/components/chat/ChatList/PrivateChatCardList";
import GroupChatCardList from "@/components/chat/ChatList/GroupChatCardList";
import React from "react";
import Logo from "@/components/auth/Logo";
import Image from "next/image";
import CreateNewGroupButton from "@/components/chat/ChatList/CreateNewGroupButton";
import Profile from "@/components/chat/ChatList/Profile";
import { AppWrapper } from "@/context";

export type ChatroomResult = {
  id: number;
  name: string | null;
  type: string;
  createdAt: Date;
  numUsers: number;
};

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Switch between private and group chatrooms list
  const [isPrivateChat, setPrivateChat] = useState(true);
  // Pass to private and group chatrooms component
  const [privateChatrooms, setPrivateChatrooms] = useState<ChatroomResult[]>(
    []
  );
  const [groupChatrooms, setGroupChatrooms] = useState<ChatroomResult[]>([]);

  // Connect to websocket
  useEffect(() => {
    /*
    TODO:
      - connect to ws
      - set incoming message handler
    */
  }, []);

  useEffect(() => {
    const fetchAllChatrooms = async () => {
      const privateChatrooms: ChatroomResult[] = [];
      const groupChatrooms: ChatroomResult[] = [];
      try {
        const response = await fetch("/api/chatrooms/all", {
          next: { tags: ["chatrooms"] },
        });
        if (response.ok) {
          console.log("Get all chatrooms success");
          const res = await response.json();
          res.data.forEach((chatroom: ChatroomResult) => {
            if (chatroom.type === "private") {
              privateChatrooms.push(chatroom);
            } else if (chatroom.type === "group") {
              groupChatrooms.push(chatroom);
            }
          });
          // console.log("Private", privateChatrooms);
          // console.log("Gorup", groupChatrooms);
          setPrivateChatrooms(privateChatrooms);
          setGroupChatrooms(groupChatrooms);
        } else {
          throw new Error("Get all chatrooms failed");
        }
      } catch (error) {
        console.error("Error getting all chatrooms:", error);
      }
    };
    fetchAllChatrooms();
  }, []);

  return (
    <div className="flex gap-4 h-full bg-white">
      <AppWrapper>
        <div className="min-w-[430px] w-[30vw] h-full overflow-y-auto pl-4 flex flex-col">
          <Logo />

          {/* Selector between private/group chat */}
          <div className="w-full bg-slate-200 h-[50px] rounded-md p-[6px] flex items-center text-slate-800">
            <button
              className={`w-1/2 h-full flex items-center justify-center rounded-md ${
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
              className={`w-1/2 h-full flex items-center justify-center rounded-md ${
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
              <PrivateChatCardList privateChatrooms={privateChatrooms} />
            </div>
          ) : (
            <div className="overflow-y-auto mt-[10px] h-[70%]">
              <GroupChatCardList groupChatrooms={groupChatrooms} />
            </div>
          )}

          {/* Edit name and logout bar */}
          <Profile />
        </div>

        <div className="w-full">{children}</div>
      </AppWrapper>
    </div>
  );
}
