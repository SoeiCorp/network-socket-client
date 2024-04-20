"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import Avatar from "./Avatar";
import { useState, useRef } from "react";
import ConfirmLeaveChatModal from "./ConfirmLeaveChatModal";


type Props = {
    chatroom: Chatroom;
    handleLeaveChat: (chatroomId: number, userId: number) => void
};

export default function JoinedGroupChatCard({ chatroom, handleLeaveChat }: Props) {
    const pathName = usePathname();
    const isChatRoom = pathName.endsWith(String(chatroom.id));

    const leaveChatIdRef = useRef(0);

    const [showConfirmLeaveChat, setShowConfirmLeaveChat] = useState(false)

    const toggleConfirmLeaveChat = () => {
        setShowConfirmLeaveChat(!showConfirmLeaveChat)
    }

    return (
        <Link
            className={`${isChatRoom ? "bg-slate-200" : "hover:bg-slate-100"
                } px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3 flex justify-between`}
            href={`/chat/${String(chatroom.id)}`}
        >
            <div className="flex items-center gap-2">
                <Avatar name={chatroom.name || ""} userId={chatroom.id} />
                <div className="flex flex-col w-full gap-1 ml-[10px]">
                    <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
                        <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
                            {chatroom.name}
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
                    leaveChatIdRef.current = chatroom.id
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
