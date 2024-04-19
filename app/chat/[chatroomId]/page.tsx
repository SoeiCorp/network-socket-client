import React from "react";
import ChatRoom from "@/components/chat/chatRoom/ChatRoom";

export default async function ChatRoomPage({
  params,
}: {
  params: { chatroomId: string };
}) {
  const chatroomId = params.chatroomId;

  //   // Session
  //   const session = await getServerSession(authOptions);
  //   if (session === null) {
  //     return;
  //   }

  //   const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
  //   const senderId = session?.user.id;

  // TEMPORARY
  const senderId = "123";
  return <div className="text-slate-800">This is chatroomId {chatroomId}</div>;
  //   return <ChatRoom chatroomId={chatroomId} senderId={senderId} />;
}
