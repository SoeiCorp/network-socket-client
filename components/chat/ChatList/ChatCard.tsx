"use client";

import Image from "next/image";
import noavatar from "@/public/icons/noavatar.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import Avatar from "./Avatar";

type Props = {
  chatroom: Chatroom;
};

export default function ChatCard({ chatroom }: Props) {
  const pathName = usePathname();
  const isChatRoom = pathName.endsWith(String(chatroom.id));

  return (
    <Link
      className={`${isChatRoom ? "bg-slate-200" : "hover:bg-slate-100"
        } flex items-center gap-2 px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3`}
      href={`/chat/${String(chatroom.id)}`}
    >
      <Avatar name={chatroom.name || ""} userId={chatroom.id} />
      <div className="flex flex-col w-full gap-1">
        <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
          <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
            {chatroom.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
