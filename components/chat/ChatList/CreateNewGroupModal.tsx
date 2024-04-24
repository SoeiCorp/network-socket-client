import PrimaryButton from "@/components/public/PrimaryButton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { revalidateChatrooms } from "@/lib/actions";
import { createGroupChatroom } from "@/components/socket/client";
import { socket } from "@/components/socket/client";
import { ChatroomResult } from "@/app/chat/layout";

export default function CreateNewGroup({
  showCreateNewGroup,
  toggleCreateNewGroup,
  setRevalidateChatrooms,
}: {
  showCreateNewGroup: boolean;
  toggleCreateNewGroup: () => void;
  setRevalidateChatrooms: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [groupName, setGroupName] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleCreateNewGroup = async () => {
    try {
      setPrimaryLoading(true);
      setDisabled(true);
      const response = await fetch("/api/chatrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "group", name: groupName }),
      });
      if (response.ok) {
        console.log("Create group chatroom successfully");
        const res = await response.json();
        createGroupChatroom(res.data.id);
        setRevalidateChatrooms((prev) => !prev);
        toast.success("สร้างกลุ่มสำเร็จ");
      } else {
        console.error("Create group chatroom fail");
        toast.error("สร้างกลุ่มไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Error create group chatroom:", error);
      toast.error("System error");
    } finally {
      setPrimaryLoading(false);
      setDisabled(false);
      toggleCreateNewGroup();
      setGroupName("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateNewGroup();
    }
  };

  useEffect(() => {
    socket.on("create group", async (chatroom: ChatroomResult) => {
      setRevalidateChatrooms((prev) => !prev);
    });
  }, []);

  return (
    showCreateNewGroup && (
      <div
        className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
        onClick={() => {
          toggleCreateNewGroup();
        }}
      >
        <div className="flex justify-center">
          <div
            className=" bg-[#f8fafc] p-[20px] lg:px-[30px] lg:pb-[30px] rounded-[15px] w-full mt-[163px] lg:mt-[185px] max-w-[500px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="font-bold text-[24px] text-slate-600 mb-[7px] text-center pt-2">
              สร้างกลุ่มใหม่ !
            </p>

            <div className="flex flex-col gap-1 flex-grow mt-[10px]">
              <input
                id="text-area"
                name="name"
                type="text"
                className="py-[10px] rounded-[6px] border border-[#CBD5E1] px-[10px]"
                onChange={handleChange}
                value={groupName}
                placeholder="ชื่อกลุ่ม"
                onKeyDown={handleKeyPress} // Handle Enter key press
              ></input>
            </div>

            <div className="mt-[20px] flex justify-between">
              <button
                className="w-[47%] rounded-[6px] border border-slate-300 text-[#0F172A] py-[10px] active:opacity-10 hover:opacity-60"
                onClick={() => {
                  toggleCreateNewGroup();
                }}
              >
                ยกเลิก
              </button>
              <PrimaryButton
                type="submit"
                isDisabled={isDisabled}
                className="w-[47%] rounded-[6px] text-[#FFFFFF] bg-[#334155] py-[10px] hover:opacity-[80%] active:opacity-60"
                isLoading={primaryLoading}
                onClick={handleCreateNewGroup}
                loadingMessage="กำลังดำเนินการ"
              >
                สร้างกลุ่ม
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
