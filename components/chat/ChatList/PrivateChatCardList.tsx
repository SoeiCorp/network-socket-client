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

interface Props {
  allUsers: UserResult[];
}

export default function PrivateChatCardList({ allUsers }: Props) {
  const [onlineUsers, setOnlineUsers] = useState<UserResult[]>([]);
  const [offlineUsers, setofflineUsers] = useState<UserResult[]>(allUsers); // For now
  const [loading, setLoading] = useState<boolean>(false);
  const { context, setTrigger } = useAppContext();
  const name = context.name;
  const userId = context.userId;

  // TODO : Online chatroom message handler
  // function showOnlineChatroom(message){
  //   // setOnlineChatroom(message);
  //   // setOflineChatroom(chatrooms - onlineChatroom);
  // }

  return (
    <div className="flex flex-col gap-2">
      {/* TODO : UI to display onlineChatroom and offlineChatroom */}
      {loading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <ChatCardLoading key={index} />
        ))
      ) : onlineUsers.length || offlineUsers.length ? (
        <div>
          {/* joined */}
          <div className="text-slate-500 flex flex-col gap-2 mt-[10px]">
            <div className="ml-[8px]">ออนไลน์ {`(${onlineUsers.length})`}</div>

            {onlineUsers.map((user, index) => (
              <PrivateChatCard key={index} user={user} />
            ))}
            <div className="w-full flex justify-center mt-[5px]">
              <hr className="text-slate-500 w-[95%]" />
            </div>
          </div>

          {/* บ่ joined */}
          <div className="text-slate-500 mt-[25px] flex flex-col gap-2">
            <div className="ml-[8px]">ออฟไลน์ {`(${offlineUsers.length})`}</div>
            {offlineUsers.map((user, index) => (
              <PrivateChatCard key={index + onlineUsers.length} user={user} />
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
