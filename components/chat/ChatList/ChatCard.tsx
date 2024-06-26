"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { ChatroomResult, UserResult } from "@/app/chat/layout";

type Props = {
  chatroom: ChatroomResult;
};

export default function ChatCard({ chatroom }: Props) {
  const pathName = usePathname();
  const isChatRoom = pathName.endsWith(String(chatroom.id));

  return (
    <Link
      className={`${
        isChatRoom ? "bg-slate-200" : "active:bg-slate-200 hover:bg-slate-100"
      } flex items-center gap-2 px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3`}
      href={`/chat/${String(chatroom.id)}`}
    >
      <Avatar name={chatroom.name || ""} userId={chatroom.id} />
      <div className="flex flex-col w-full gap-1 ml-[10px]">
        <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
          <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
            {chatroom.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
