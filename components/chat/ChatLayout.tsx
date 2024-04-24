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
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  // Switch between private and group chatrooms list
  const [isPrivateChat, setPrivateChat] = useState(true);
  const [onlineIds, setOnlineIds] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<UserResult[]>([]);
  const [allGroups, setAllGroups] = useState<{
    joinedGroup: ChatroomResult[];
    notJoinedGroup: ChatroomResult[];
  }>({ joinedGroup: [], notJoinedGroup: [] });
  const [revalidateUsers, setRevalidateUsers] = useState(false);
  const [revalidateChatrooms, setRevalidateChatrooms] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(true);

  // Connect to WS
  useEffect(() => {
    function connectToSocket() {
      connect(setRevalidateUsers, setOnlineIds, setAllUsers, setOnlineLoading);
    }
    connectToSocket();
  }, []);

  useEffect(() => {
    async function getJoinedGroup() {
      try {
        const response = await fetch("/api/chatrooms/group", {
          cache: "no-store",
        });
        if (response.ok) {
          console.log("Get all joined group success");
          const res = await response.json();
          return res.data;
        } else {
          console.log(response);
          throw new Error("Get all joined group failed");
        }
      } catch (error) {
        console.error("Error getting all joined group:", error);
      }
      return [];
    }

    async function getAllChatrooms() {
      let privateChatrooms: ChatroomResult[] = [];
      let groupChatrooms: ChatroomResult[] = [];
      let joinedGroup: ChatroomResult[] = [];
      let notJoinedGroup: ChatroomResult[] = [];
      try {
        const response = await fetch("/api/chatrooms/all", {
          cache: "no-store",
        });
        if (response.ok) {
          console.log("Get all chatrooms success");
          console.log("fetching...");
          const res = await response.json();
          res.data.forEach((chatroom: ChatroomResult) => {
            if (chatroom.type === "private") {
              privateChatrooms.push(chatroom);
            } else if (chatroom.type === "group") {
              groupChatrooms.push(chatroom);
            }
          });
          joinedGroup = (await getJoinedGroup()).sort(
            (a: ChatroomResult, b: ChatroomResult) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          notJoinedGroup = getUnjoinedChatrooms(
            groupChatrooms,
            joinedGroup
          ).sort(
            (a: ChatroomResult, b: ChatroomResult) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          throw new Error("Get all chatrooms failed");
        }
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
      setAllGroups({ joinedGroup, notJoinedGroup });
    }
    getAllChatrooms();
  }, [revalidateChatrooms]);

  useEffect(() => {
    async function getAllUsers() {
      console.log("Enter getAllUsers!!!");
      try {
        const response = await fetch("/api/auth/users", { cache: "no-store" });
        if (response.ok) {
          console.log("Get all users success");
          const res = await response.json();
          setAllUsers(res.data);
        } else {
          throw new Error("Get all users failed");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getAllUsers();
  }, [revalidateUsers]);

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
        {!isPrivateChat && (
          <CreateNewGroupButton
            setRevalidateChatrooms={setRevalidateChatrooms}
          />
        )}

        {/* ChatCardList base on isGroupChat */}
        {isPrivateChat ? (
          <div className="overflow-y-auto mt-[10px] h-[75%]">
            <PrivateChatCardList
              allUsers={allUsers}
              onlineIds={onlineIds}
              onlineLoading={onlineLoading}
            />
          </div>
        ) : (
          <div className="overflow-y-auto mt-[10px] h-[70%]">
            <GroupChatCardList
              allGroups={allGroups}
              setRevalidateChatrooms={setRevalidateChatrooms}
            />
          </div>
        )}

        {/* Edit name and logout bar */}
        <Profile />
      </div>

      <div className="w-full">{children}</div>
    </AppWrapper>
  );
}

const getUnjoinedChatrooms = (
  all: ChatroomResult[],
  joined: ChatroomResult[]
): ChatroomResult[] => {
  // Filter out the chatrooms that are not in the joinedChatrooms array
  const unjoined = all.filter(
    (chatroom) =>
      !joined.some((joinedChatroom) => joinedChatroom.id === chatroom.id)
  );
  return unjoined;
};
