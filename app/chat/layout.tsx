import React from "react";
import ChatLayout from "@/components/chat/ChatLayout";

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

// When other create new chatroom, tell every connector by ws
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

// When new registerd come in, tell every connector by ws
async function getAllUsers() {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  try {
    const response = await fetch(`${backendURL}/api/auth/users`, {
      next: { tags: ["users"] },
    });
    if (response.ok) {
      console.log("Get all users success");
      const res = await response.json();
      return res.data;
    } else {
      throw new Error("Get all users failed");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return [];
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  const chatroomsData = await getAllChatrooms();
  const usersData = await getAllUsers();
  return (
    <div className="flex gap-4 h-full bg-white">
      <ChatLayout
        usersData={usersData}
        groupChatrooms={chatroomsData.groupChatrooms}
      >
        {children}
      </ChatLayout>
    </div>
  );
}
