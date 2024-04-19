import React from "react";
import ChatRoom from "@/components/chat/chatRoom/ChatRoom";

export default async function ChatRoomPage({
  params,
}: {
  params: { chatroomId: number };
}) {
  const chatroomId = params.chatroomId;
  // TEMPORARY
  const senderId = 1;
  return <ChatRoom chatroomId={chatroomId} senderId={senderId} />;
}
