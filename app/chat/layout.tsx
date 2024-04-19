import ChatCardList from "@/components/chat/ChatCardList";
import React from "react";
import ChatLayout from "@/components/chat/ChatLayout";
import Logo from "@/components/auth/Logo";

export default async function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TEMPORARY
  const userId = "demoId";

  return (
    <div className="flex gap-4 h-full bg-white">
      <div className="min-w-[430px] w-[30vw] h-full overflow-y-auto pl-4">
        <Logo />
        <ChatCardList userId={userId} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
