"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import Avatar from "./Avatar";
import { useState, useRef } from "react";
import ConfirmLeaveChatModal from "./ConfirmLeaveChatModal";
import { ChatroomResult } from "@/app/chat/layout";

type Props = {
  chatroom: ChatroomResult;
  handleLeaveChat: (chatroomId: number) => void;
};

export default function JoinedGroupChatCard({
  chatroom,
  handleLeaveChat,
}: Props) {
  const pathName = usePathname();
  const isChatRoom = pathName.endsWith(String(chatroom.id));

  const leaveChatIdRef = useRef(0);

  const [showConfirmLeaveChat, setShowConfirmLeaveChat] = useState(false);
  const toggleConfirmLeaveChat = () => {
    setShowConfirmLeaveChat(!showConfirmLeaveChat);
  };

  // console.log("join", chatroom);

  return (
    <Link
      className={`${
        isChatRoom ? "bg-slate-200" : "hover:bg-slate-100"
      } px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3 flex justify-between`}
      href={`/chat/${String(chatroom.id)}`}
    >
      <div className="flex items-center gap-2">
        <Avatar name={chatroom.name || ""} userId={chatroom.id} />
        <div className="flex flex-col w-full gap-1 ml-[10px]">
          <div className="flex flex-row justify-between w-full items-center lg:text-[18px] gap-2">
            <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
              {chatroom.name}
            </div>
            <div className="font-medium text-[12px] text-slate-500 truncate max-w-[24ch] lg:max-w-[27ch]">
              ( {chatroom.numUsers} )
            </div>
          </div>
        </div>
      </div>
      <Image
        src={"/icons/leaveChat.svg"}
        width={27}
        height={27}
        alt="leaveChat"
        className={`mr-[10px] opacity-60 hover:opacity-100 active:opacity-80 hover:fill-red-400`}
        onClick={(e) => {
          e.preventDefault();
          leaveChatIdRef.current = chatroom.id;
          // console.log(leaveChatIdRef.current);
          toggleConfirmLeaveChat();
        }}
      />
      <ConfirmLeaveChatModal
        showConfirmLeaveChat={showConfirmLeaveChat}
        toggleConfirmLeaveChat={toggleConfirmLeaveChat}
        handleLeaveChat={handleLeaveChat}
        chatroomId={leaveChatIdRef.current}
      />
    </Link>
  );
}
