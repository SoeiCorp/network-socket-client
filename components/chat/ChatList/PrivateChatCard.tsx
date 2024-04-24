"use client";

import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { UserResult } from "@/app/chat/layout";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { socket } from "@/components/socket/client";
import { useAppContext } from "@/context";

type Props = {
  user: UserResult;
  isOffLine?: boolean;
};

export default function PrivateChatCard({ user, isOffLine }: Props) {
  const [chatroomId, setChatroomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const isChatRoom = pathName.endsWith(String(chatroomId));
  const router = useRouter();
  const { context, setContext } = useAppContext();

  const handleCreateChatroom = async () => {
    setLoading(true);
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
        socket.emit("create private", res.data.id);
        router.push(`/chat/${res.data.id}`);
        setLoading(false);
      } else {
        console.error("Fail to create private chatroom succesfu");
      }
    } catch (error) {
      console.error("Error find or create private chatroom :", error);
    } finally {
    }
  };

  return (
    <>
      {context.userId === user.id ? (
        // Your own card
        <div
          className={`hover:bg-slate-100 flex items-center gap-2 px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3`}
        >
          <Avatar name={user.name} userId={user.id} />
          <div className="flex flex-col w-full gap-1 ml-[10px]">
            <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
              <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
                {user.name}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Other users
        <button
          className={`${
            isChatRoom
              ? "bg-slate-200"
              : "active:bg-slate-200 hover:bg-slate-100"
          } flex items-center gap-2 px-[16px] py-3 rounded-[16px] hover:cursor-pointer mr-3 ${
            isOffLine && "opacity-50"
          }`}
          onClick={handleCreateChatroom}
        >
          <Avatar name={user.name} userId={user.id} />
          <div className="flex flex-col w-full gap-1 ml-[10px]">
            <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
              <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
                {user.name}
              </div>
              {loading && (
                <div>
                  <svg
                    className="animate-spin h-[25px] w-[25px] fill-slate-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                      stroke="slate"
                    />
                    <path
                      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                      stroke="slate"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </button>
      )}
    </>
  );
}
