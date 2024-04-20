"use client";

import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import { User } from "@/drizzle/schemas/users";

type Props = {
  userId: number;
};

export default function PrivateChatCardList({ userId }: Props) {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [onlineChatroom, setOnlineChatroom] = useState<Chatroom[]>([]);
  const [offlineChatroom, setofflineChatroom] = useState<Chatroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    setChatrooms(chatroomsData);
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
      ) : chatrooms.length ? (
        chatrooms.map((chatroom, index) => (
          <ChatCard key={index} chatroom={chatroom} />
        ))
      ) : (
        <div className="col-span-full">
          <SearchNotFound text="ไม่พบห้องแชท" />
        </div>
      )}
    </div>
  );
}
