"use client";

import JoinedGroupChatCard from "./JoinedGroupChatCard";
import NotJoinedGroupChatCard from "./NotJoinedGroupChatCard";
import { useEffect, useState } from "react";
import ChatCardLoading from "./ChatCardLoading";
import SearchNotFound from "./SearchNotFound";
import { Chatroom } from "@/drizzle/schemas/chatrooms";
import { useAppContext } from "@/context";
import { ChatroomResult } from "@/app/chat/layout";
import toast from "react-hot-toast";
import { revalidateChatrooms } from "@/lib/actions";

interface Props {
  allGroups: ChatroomResult[];
}

export default function GroupChatCardList({ allGroups }: Props) {
  const [joinedChatrooms, setJoinedChatrooms] = useState<ChatroomResult[]>([]);
  const [notJoinedChatrooms, setNotJoinedChatrooms] = useState<
    ChatroomResult[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { context, setTrigger } = useAppContext();
  const name = context.name;
  const userId = context.userId;

  // TODO : Fetch all joined group chatrooms from db
  useEffect(() => {
    const fetchChatGroupData = async () => {
      try {
        const response = await fetch("/api/chatrooms/group", {
          method: "GET",
        });
        if (response.ok) {
          console.log("Get all group chatrooms of user sucess");
          const res = await response.json();
          const joined = res.data;
          const notJoined = getUnjoinedChatrooms(allGroups, joined);
          setJoinedChatrooms(joined);
          setNotJoinedChatrooms(notJoined);
        } else {
          throw new Error("Get all group chatrooms of user failed");
        }
      } catch (error) {
        console.error("Error get all group chatrooms of user:", error);
      }
    };
    fetchChatGroupData();
  }, [allGroups]);

  const handleJoinChat = async (chatroomId: number) => {
    try {
      // setLoading(true);
      const response = await fetch(`/api/chatrooms/${chatroomId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatroomid: chatroomId }),
      });
      if (response.ok) {
        console.log("Join group successfully");
        await revalidateChatrooms();
        toast.success("เข้าร่วมกลุ่มสำเร็จ");
      } else {
        console.error("Join group fail");
        toast.error("เข้าร่วมกลุ่มไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Error join group:", error);
      toast.error("System error");
    } finally {
      // setLoading(false);
    }
  };

  const handleLeaveChat = async (chatroomId: number) => {
    // try {
    //   setLoading(true);
    //   const response = await fetch(`/api/chatrooms/${chatroomId}/join`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ chatroomid: chatroomId }),
    //   });
    //   if (response.ok) {
    //     console.log("Join group successfully");
    //     toast.success("เข้าร่วมกลุ่มสำเร็จ");
    //   } else {
    //     console.error("Join group fail");
    //     toast.error("เข้าร่วมกลุ่มไม่สำเร็จ");
    //   }
    // } catch (error) {
    //   console.error("Error join group:", error);
    //   toast.error("System error");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      {loading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <ChatCardLoading key={index} />
        ))
      ) : joinedChatrooms.length && notJoinedChatrooms.length ? (
        <div>
          {/* joined */}
          <div className="text-slate-500 flex flex-col gap-2 mt-[10px]">
            <div className="ml-[8px]">
              เข้ากลุ่มแล้ว {`(${joinedChatrooms.length})`}
            </div>

            {joinedChatrooms.map((chatroom, index) => (
              <JoinedGroupChatCard
                key={index}
                chatroom={chatroom}
                handleLeaveChat={handleLeaveChat}
              />
            ))}
            <div className="w-full flex justify-center mt-[5px]">
              <hr className="text-slate-500 w-[95%]" />
            </div>
          </div>

          {/* บ่ joined */}
          <div className="text-slate-500 mt-[25px] flex flex-col gap-2">
            <div className="ml-[8px]">
              ยังไม่ได้เข้ากลุ่ม {`(${notJoinedChatrooms.length})`}
            </div>
            {notJoinedChatrooms.map((chatroom, index) => (
              <NotJoinedGroupChatCard
                key={index + joinedChatrooms.length}
                chatroom={chatroom}
                handleJoinChat={handleJoinChat}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="col-span-full">
          <SearchNotFound text="ไม่พบห้องแชท" />
        </div>
      )}
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
