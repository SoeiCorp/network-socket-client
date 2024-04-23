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
      console.log("fetching...");
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

// // When new registerd come in, tell every connector by ws
// async function getJoinedGroup() {
//   try {
//     const response = await fetch(`${backendURL}/api/chatrooms/group`, {
//       method: "GET",
//     });
//     if (response.ok) {
//       console.log("Get all joined group success");
//       const res = await response.json();
//       console.log(res.data);
//     } else {
//       console.log("enter here ?");
//       console.log(response);
//       throw new Error("Get all joined group failed");
//     }
//   } catch (error) {
//     console.error("Error getting all joined group:", error);
//   }
//   // return [];
// }

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  const allChatrooms = await getAllChatrooms();
  const allUsers = await getAllUsers();
  return (
    <div className="flex gap-4 h-full bg-white">
      <ChatLayout allUsers={allUsers} allGroups={allChatrooms.groupChatrooms}>
        {children}
      </ChatLayout>
    </div>
  );
}
