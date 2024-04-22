"use client";

import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { UserResult } from "@/app/chat/layout";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: UserResult;
};

export default function PrivateChatCard({ user }: Props) {
  const [chatroomId, setChatroomId] = useState(null);
  const pathName = usePathname();
  const isChatRoom = pathName.endsWith(String(chatroomId));
  const router = useRouter();

  const handleCreateChatroom = async () => {
    try {
      const response = await fetch("/api/chatrooms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "private", opponentUser: user.id }),
      });
      const res = await response.json();
      if (response.ok) {
        console.log("Create private chatroom successfully");
        console.log(res.data);
        setChatroomId(res.data.id);
        router.push(`/chat/${res.data.id}`);
      } else {
        console.error("Fail to create private chatroom succesfu");
      }
    } catch (error) {
      console.error("Error find or create private chatroom :", error);
    }
  };

  return (
    <button
      className={`${
        isChatRoom ? "bg-slate-200" : "hover:bg-slate-100"
      } flex items-center gap-2 px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3`}
      onClick={handleCreateChatroom}
    >
      <Avatar name={user.name} userId={user.id} />
      <div className="flex flex-col w-full gap-1 ml-[10px]">
        <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
          <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
            {user.name}
          </div>
        </div>
      </div>
    </button>
  );
}
