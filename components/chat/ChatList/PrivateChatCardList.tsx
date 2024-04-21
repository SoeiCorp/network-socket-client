"use client";

import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import { User } from "@/drizzle/schemas/users";
import { useAppContext } from "@/context";
import { ChatroomResult, UserResult } from "@/app/chat/layout";

interface Props {
  usersData: UserResult[];
}

export default function PrivateChatCardList({ usersData }: Props) {
  const [onlineChatrooms, setOnlineChatrooms] = useState<UserResult[]>([]);
  const [offlineChatrooms, setofflineChatrooms] =
    useState<UserResult[]>(usersData); // For now
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
      ) : onlineChatrooms.length || offlineChatrooms.length ? (
        <div>
          {/* joined */}
          <div className="text-slate-500 flex flex-col gap-2 mt-[10px]">
            <div className="ml-[8px]">
              ออนไลน์ {`(${onlineChatrooms.length})`}
            </div>

            {onlineChatrooms.map((chatroom, index) => (
              <ChatCard key={index} chatroom={chatroom} />
            ))}
            <div className="w-full flex justify-center mt-[5px]">
              <hr className="text-slate-500 w-[95%]" />
            </div>
          </div>

          {/* บ่ joined */}
          <div className="text-slate-500 mt-[25px] flex flex-col gap-2">
            <div className="ml-[8px]">
              ออฟไลน์ {`(${offlineChatrooms.length})`}
            </div>
            {offlineChatrooms.map((chatroom, index) => (
              <ChatCard
                key={index + onlineChatrooms.length}
                chatroom={chatroom}
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
