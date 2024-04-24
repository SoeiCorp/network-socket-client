"use client";

import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import { User } from "@/drizzle/schemas/users";
import { useAppContext } from "@/context";
import { ChatroomResult, UserResult } from "@/app/chat/layout";
import PrivateChatCard from "./PrivateChatCard";
import { socket } from "@/components/socket/client";

interface Props {
  allUsers: UserResult[];
  onlineIds: String[];
  onlineLoading: boolean;
}

export default function PrivateChatCardList({
  allUsers,
  onlineIds,
  onlineLoading,
}: Props) {
  const onlineUsers = allUsers.filter((user) =>
    onlineIds.includes(user.id.toString())
  );
  const offlineUsers = allUsers.filter(
    (user) => !onlineIds.includes(user.id.toString())
  );
  const { context, setTrigger } = useAppContext();

  return (
    <div className="flex flex-col gap-2">
      {/* TODO : UI to display onlineChatroom and offlineChatroom */}
      {onlineLoading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <ChatCardLoading key={index} />
        ))
      ) : onlineUsers.length || offlineUsers.length ? (
        <div>
          {/* joined */}
          <div className="text-slate-500 flex flex-col gap-2 mt-[10px]">
            <div className="ml-[8px]">ออนไลน์ {`(${onlineUsers.length})`}</div>
            <PrivateChatCard
              user={{
                id: context.userId,
                name: context.name,
              }}
            />
            {onlineUsers.map(
              (user, index) =>
                user.id !== context.userId && (
                  <PrivateChatCard key={index} user={user} />
                )
            )}
            <div className="w-full flex justify-center mt-[5px]">
              <hr className="text-slate-500 w-[95%]" />
            </div>
          </div>

          {/* บ่ joined */}
          <div className="text-slate-500 mt-[25px] flex flex-col gap-2">
            <div className="ml-[8px]">ออฟไลน์ {`(${offlineUsers.length})`}</div>
            {offlineUsers.map((user, index) => (
              <PrivateChatCard
                key={index + onlineUsers.length}
                user={user}
                isOffLine={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="col-span-full">
          <SearchNotFound text="ไม่พบห้องแชท" />
        </div>
      )}
    </div>
  );
}
