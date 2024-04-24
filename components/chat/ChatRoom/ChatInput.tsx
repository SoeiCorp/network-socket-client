"use client";
import { FormEvent, ChangeEvent, useState, useRef } from "react";
import Image from "next/image";
import sendButton from "@/public/icons/sendButton.svg";
import { sendGroupMessage } from "@/components/socket/client";

type Props = {
  chatroomId: number;
};

export default function ChatInput({ chatroomId }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message !== "") {
      sendGroupMessage(chatroomId, message);
    }
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center h-[77px] w-full bg-slate-50 border-t border-[#CBD5E1] px-4 md:h-[84px] lg:px-5 text-slate-700"
    >
      <input
        type="text"
        autoComplete="off"
        value={message}
        name="text"
        placeholder="ส่งข้อความ..."
        onChange={(e) => setMessage(e.target.value)}
        className="h-[45px] w-full px-5 rounded-full bg-slate-100 border border-slate-300 placeholder:text-slate-400 focus:outline-none lg:text-[18px]"
      />
      <button
        type="submit"
        className="h-fit py-[2px] pl-[0px] pr-[4px] rounded-full active:bg-slate-300 hover:bg-slate-200"
      >
        <Image
          className={""}
          src={sendButton}
          alt="sendButton"
          width={46}
          height={46}
        />
      </button>
    </form>
  );
}
