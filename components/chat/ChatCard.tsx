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
  const avatar = noavatar;

  //   const formattedDate = () => {
  //       let formattedDate = ""
  //       if (employer.chatrooms[0]?.latestMessage?.createdAt.toLocaleDateString("en-GB")) {
  //           const oldDate = employer.chatrooms[0]?.latestMessage?.createdAt.toLocaleDateString("en-GB")
  //           const [d, m, yy] = oldDate.split("/")
  //           formattedDate = `${parseInt(d)}/${parseInt(m)}/${yy.slice(-2)}`
  //       }

  //       return formattedDate
  //   }

  return (
    <Link
      className={`${
        isChatRoom ? "bg-neutral-200" : "hover:bg-neutral-100"
      } flex items-center gap-2 px-[16px] py-3 rounded-[16px] hover:cursor-pointer`}
      href={`/chat/${String(chatroom.id)}`}
    >
      <Avatar name={chatroom.name || ""} chatroomId={chatroom.id} />
      <div className="flex flex-col w-full gap-1">
        <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
          <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
            {chatroom.name}
          </div>
          {/* <div className="text-[14px] text-[#838383] lg:text-[16px]">
            Latest message Date time
          </div> */}
        </div>
        {/* <div className="text-[14px] text-[#838383] w-full truncate max-w-[33ch] lg:text-[16px]">
          Latest message content
        </div> */}
      </div>
    </Link>
  );
}
