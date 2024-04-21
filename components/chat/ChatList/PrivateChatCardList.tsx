"use client";

import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import { User } from "@/drizzle/schemas/users";
import { useAppContext } from "@/context";
import { ChatroomResult } from "@/app/chat/layout";

interface Props {
  privateChatrooms: ChatroomResult[];
}

export default function PrivateChatCardList({ privateChatrooms }: Props) {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [onlineChatrooms, setOnlineChatrooms] = useState<Chatroom[]>([]);
  const [offlineChatrooms, setofflineChatrooms] = useState<Chatroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { context, setTrigger } = useAppContext();
  const name = context.name;
  const userId = context.userId;

  // TODO : Fetch all private chatrooms from db
  useEffect(() => {
    // TEMPORARY
    const chatroomsData: Chatroom[] = [
      {
        id: 1,
        name: "Somchai",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Somying",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Somying1",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 4,
        name: "Somying2",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 5,
        name: "Somying3",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 6,
        name: "Somying4",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 11,
        name: "Somying5",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 7,
        name: "Somying6",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 8,
        name: "Somying7",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 9,
        name: "Somying8",
        type: "private",
        createdAt: new Date(),
      },
      {
        id: 10,
        name: "Somying9",
        type: "private",
        createdAt: new Date(),
      },
    ];
    setOnlineChatrooms(
      chatroomsData.filter((chatroom) => chatroom.id % 2 == 1)
    );
    setofflineChatrooms(
      chatroomsData.filter((chatroom) => chatroom.id % 2 == 0)
    );
  }, []);

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
      ) : onlineChatrooms.length && offlineChatrooms.length ? (
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
