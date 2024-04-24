import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import LoadingRing from "@/public/icons/loading-ring.svg";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ChatroomResult } from "@/app/chat/layout";

export default function ConfirmLeaveChatModal({
  showConfirmLeaveChat,
  toggleConfirmLeaveChat,
  handleLeaveChat,
  chatroom,
}: {
  showConfirmLeaveChat: boolean;
  toggleConfirmLeaveChat: () => void;
  handleLeaveChat: (chatroomId: number) => void;
  chatroom: ChatroomResult;
}) {
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter" && !isDisabled && showConfirmLeaveChat) {
        handleConfirmLeaveChat();
      }
    };

    if (showConfirmLeaveChat) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showConfirmLeaveChat, isDisabled]);

  const handleConfirmLeaveChat = async () => {
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);
    await handleLeaveChat(chatroom.id);
    setPrimaryLoading((prev) => !prev);
    setDisabled(false);
    toggleConfirmLeaveChat();
  };

  return (
    showConfirmLeaveChat && (
      <div
        ref={modalRef}
        className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
        onClick={() => {
          toggleConfirmLeaveChat();
        }}
      >
        <div className="flex justify-center">
          <div
            className=" bg-[#f8fafc] p-[20px] lg:px-[30px] lg:pb-[30px] rounded-[15px] w-full mt-[163px] lg:mt-[320px] max-w-[500px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="font-bold text-[24px] text-slate-600 text-center pt-3">
              ออกจากกลุ่ม {chatroom.name} ?
            </p>

            <div className="mt-[20px] flex justify-between">
              <button
                className="w-[47%] rounded-[6px] border border-slate-300 text-[#0F172A] py-[10px] active:opacity-10 hover:opacity-60 mt-[20px]"
                onClick={(e) => {
                  e.preventDefault();
                  toggleConfirmLeaveChat();
                }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className={`focus:bg-red-500 w-[47%] rounded-[6px] border border-slate-300 text-[#0F172A] py-[10px] hover:opacity-[80%] active:opacity-[60%] mt-[20px] hover:text-white hover:bg-red-500 ${
                  primaryLoading && "bg-red-500 text-white"
                }`}
                disabled={isDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirmLeaveChat();
                }}
              >
                {primaryLoading ? (
                  <div className="flex gap-2 justify-center items-center">
                    <Image
                      src={LoadingRing}
                      alt="logo"
                      width={20}
                      height={20}
                    />
                    กำลังดำเนินการ
                  </div>
                ) : (
                  <p>ยืนยัน</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
