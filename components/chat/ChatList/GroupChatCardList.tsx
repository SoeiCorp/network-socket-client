"use client";

import JoinedGroupChatCard from "./JoinedGroupChatCard";
import NotJoinedGroupChatCard from "./NotJoinedGroupChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import { useAppContext } from "@/context";

export default function GroupChatCardList() {
  // const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [joinedChatrooms, setJoinedChatrooms] = useState<Chatroom[]>([]);
  const [notJoinedChatrooms, setNotJoinedChatrooms] = useState<Chatroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId, name } = useAppContext();

  // TODO : Fetch all group chatrooms from db
  useEffect(() => {
    // TEMPORARY
    const chatroomsData: Chatroom[] = [
      {
        id: 1,
        name: "Grop1",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 2,
        name: "Gropu2",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 3,
        name: "Gropu3",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 4,
        name: "Gropu4",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 5,
        name: "Gropu5",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 6,
        name: "Gropu6",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 7,
        name: "Gropu7",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 8,
        name: "Gropu8",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 9,
        name: "Gropu9",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 10,
        name: "Gropu10",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 11,
        name: "Gropu11",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
      {
        id: 12,
        name: "Gropu12",
        type: "group",
        createdAt: new Date(),
        // members: 2
      },
    ];
    setJoinedChatrooms(
      chatroomsData.filter((chatroom) => chatroom.id % 2 == 1)
    );
    setNotJoinedChatrooms(
      chatroomsData.filter((chatroom) => chatroom.id % 2 == 0)
    );
  }, []);

  const handleJoinChat = (chatroomId: number, userId: number) => {
    //do something to join this chatId and rerender
    console.log("j", chatroomId);
  };

  const handleLeaveChat = (chatroomId: number, userId: number) => {
    //do something to leave this chatId and rerender
    console.log("l", chatroomId);
  };

  // TODO : Logic to get joinedChatrooms and notJoinedChatrooms
  // console.log(joinedChatrooms);
  return (
    <div>
      {/* TODO : UI to display joinedChatrooms and notJoinedChatrooms */}
      {loading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <ChatCardLoading key={index} />
        ))
      ) : joinedChatrooms.length && notJoinedChatrooms.length ? (
        <div>
          {/* joined */}
          <div className="text-slate-500 flex flex-col gap-2 mt-[10px]">
            <div className="ml-[8px]">
              เข้ากลุ่มแล้ว {`(${joinedChatrooms.length})`}
            </div>

            {joinedChatrooms.map((chatroom, index) => (
              <JoinedGroupChatCard
                key={index}
                chatroom={chatroom}
                handleLeaveChat={handleLeaveChat}
              />
            ))}
            <div className="w-full flex justify-center mt-[5px]">
              <hr className="text-slate-500 w-[95%]" />
            </div>
          </div>

          {/* บ่ joined */}
          <div className="text-slate-500 mt-[25px] flex flex-col gap-2">
            <div className="ml-[8px]">
              ยังไม่ได้เข้ากลุ่ม {`(${notJoinedChatrooms.length})`}
            </div>
            {notJoinedChatrooms.map((chatroom, index) => (
              <NotJoinedGroupChatCard
                key={index + joinedChatrooms.length}
                chatroom={chatroom}
                handleJoinChat={handleJoinChat}
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
