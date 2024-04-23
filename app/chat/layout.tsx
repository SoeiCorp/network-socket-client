import React from "react";
import ChatLayout from "@/components/chat/ChatLayout";
import { cookies } from "next/headers";

export type ChatroomResult = {
  id: number;
  name: string | null;
  type: string;
  createdAt: Date;
  numUsers: number;
};

export type UserResult = {
  id: number;
  name: string;
};

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// When new registerd come in, tell every connector by ws

// When other create new chatroom, tell every connector by ws

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  return (
    <div className="flex gap-4 h-full bg-white">
      <ChatLayout>{children}</ChatLayout>
    </div>
  );
}
