"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import Avatar from "./Avatar";
import { useRef } from "react";

type Props = {
    chatroom: Chatroom;
    handleJoinChat: (chatroomId: number, userId: number) => void;
};

export default function NotJoinedGroupChatCard({ chatroom, handleJoinChat }: Props) {
    const pathName = usePathname();
    const isChatRoom = pathName.endsWith(String(chatroom.id));

    const joinChatIdRef = useRef(0);

    const handleClicked = () => {
        joinChatIdRef.current = chatroom.id;
        handleJoinChat(joinChatIdRef.current, 1);
    }

    return (
        <Link
            className={`${isChatRoom ? "bg-slate-200" : "hover:bg-slate-100"
                } px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3 flex justify-between`}
            href={`/chat/${String(chatroom.id)}`}
        >
            <div className="flex items-center gap-2">
                <Avatar name={chatroom.name || ""} userId={chatroom.id} />
                <div className="flex flex-col w-full gap-1">
                    <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
                        <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
                            {chatroom.name}
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={"/icons/joinChat.svg"}
                width={27}
                height={27}
                alt="plus"
                className={`mr-[10px] hover:opacity-80 active:opacity-60`}
                onClick={(e) => {
                    e.preventDefault();
                    handleClicked();
                }}

            />
        </Link>

    );
}
