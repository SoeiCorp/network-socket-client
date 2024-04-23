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
async function getJoinedGroup() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`${backendURL}/api/chatrooms/group`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["chatrooms"] },
    });
    if (response.ok) {
      console.log("Get all joined group success");
      const res = await response.json();
      return res.data;
    } else {
      console.log(response);
      throw new Error("Get all joined group failed");
    }
  } catch (error) {
    console.error("Error getting all joined group:", error);
  }
  return [];
}

// When other create new chatroom, tell every connector by ws
async function getAllChatrooms() {
  let privateChatrooms: ChatroomResult[] = [];
  let groupChatrooms: ChatroomResult[] = [];
  let joinedGroup: ChatroomResult[] = [];
  let notJoinedGroup: ChatroomResult[] = [];
  try {
    const response = await fetch(`${backendURL}/api/chatrooms/all`, {
      next: { tags: ["chatrooms"] },
    });
    if (response.ok) {
      console.log("Get all chatrooms success");
      console.log("fetching...");
      const res = await response.json();
      res.data.forEach((chatroom: ChatroomResult) => {
        if (chatroom.type === "private") {
          privateChatrooms.push(chatroom);
        } else if (chatroom.type === "group") {
          groupChatrooms.push(chatroom);
        }
      });
      joinedGroup = (await getJoinedGroup()).sort(
        (a: ChatroomResult, b: ChatroomResult) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      notJoinedGroup = getUnjoinedChatrooms(groupChatrooms, joinedGroup).sort(
        (a: ChatroomResult, b: ChatroomResult) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      throw new Error("Get all chatrooms failed");
    }
  } catch (error) {
    console.error("Error fetching chatrooms:", error);
  }
  return { joinedGroup, notJoinedGroup };
}

// When new registerd come in, tell every connector by ws
async function getAllUsers() {
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
  const allGroups = await getAllChatrooms();
  const allUsers = await getAllUsers();
  return (
    <div className="flex gap-4 h-full bg-white">
      <ChatLayout allUsers={allUsers} allGroups={allGroups}>
        {children}
      </ChatLayout>
    </div>
  );
}

const getUnjoinedChatrooms = (
  all: ChatroomResult[],
  joined: ChatroomResult[]
): ChatroomResult[] => {
  // Filter out the chatrooms that are not in the joinedChatrooms array
  const unjoined = all.filter(
    (chatroom) =>
      !joined.some((joinedChatroom) => joinedChatroom.id === chatroom.id)
  );
  return unjoined;
};
