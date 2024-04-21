"use client";

import { useEffect, useState, useCallback } from "react";
import React from "react";
import ChatRoom from "@/components/chat/ChatRoom/ChatRoom";

export default function ChatRoomPage({
  params,
}: {
  params: { chatroomId: number };
}) {
  const { chatroomId } = params;

  const fetchGroupChatStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/chatrooms/${chatroomId}`);
      if (response.ok) {
        console.log("Successfully fetched single chatroom");
        const res = await response.json();
        return res.data.type === "group";
      } else {
        throw new Error("Failed to fetch single chatroom");
      }
    } catch (error) {
      console.error("Error fetching single chatroom:", error);
      return false;
    }
  }, [chatroomId]);

  const [isGroupChat, setIsGroupChat] = useState(false);

  useEffect(() => {
    fetchGroupChatStatus().then((isGroup) => setIsGroupChat(isGroup));
  }, [fetchGroupChatStatus]);

  return <ChatRoom chatroomId={chatroomId} isGroupChat={isGroupChat} />;
}
