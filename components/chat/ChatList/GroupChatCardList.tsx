"use client";

import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";

type Props = {
  userId: number;
};

export default function GroupChatCardList({ userId }: Props) {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [joinedChatrooms, setJoinedChatrooms] = useState<Chatroom[]>([]);
  const [notJoinedChatrooms, setNotJoinedChatrooms] = useState<Chatroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO : Fetch all group chatrooms from db
  useEffect(() => {
    // TEMPORARY
    const chatroomsData: Chatroom[] = [
      {
        id: 1,
        name: "Grop1",
        type: "group",
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Gropu2",
        type: "group",
        createdAt: new Date(),
      },
    ];
    setChatrooms(chatroomsData);
  }, []);

  // TODO : Logic to get joinedChatrooms and notJoinedChatrooms

  return (
    <>
      {/* TODO : UI to display joinedChatrooms and notJoinedChatrooms */}
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
    </>
  );
}
