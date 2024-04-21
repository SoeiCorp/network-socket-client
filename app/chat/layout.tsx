import React from "react";
import ChatLayout from "@/components/chat/ChatLayout";

export type ChatroomResult = {
  id: number;
  name: string | null;
  type: string;
  createdAt: Date;
  numUsers: number;
};

async function getAllChatrooms() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  let privateChatrooms: ChatroomResult[] = [];
  let groupChatrooms: ChatroomResult[] = [];
  try {
    const response = await fetch(`${backendURL}/api/chatrooms/all`, {
      next: { tags: ["chatrooms"] },
    });
    if (response.ok) {
      console.log("Get all chatrooms success");
      const res = await response.json();
      res.data.forEach((chatroom: ChatroomResult) => {
        if (chatroom.type === "private") {
          privateChatrooms.push(chatroom);
        } else if (chatroom.type === "group") {
          groupChatrooms.push(chatroom);
        }
      });
    } else {
      throw new Error("Get all chatrooms failed");
    }
  } catch (error) {
    console.error("Error fetching chatrooms:", error);
  }
  return { privateChatrooms, groupChatrooms };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  const data = await getAllChatrooms();
  return (
    <div className="flex gap-4 h-full bg-white">
      <ChatLayout
        privateChatrooms={data.privateChatrooms}
        groupChatrooms={data.groupChatrooms}
      >
        {children}
      </ChatLayout>
    </div>
  );
}
