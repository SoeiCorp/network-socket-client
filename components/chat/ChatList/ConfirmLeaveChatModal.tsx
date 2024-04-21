"use client"
import Image from "next/image";
import LoadingRing from "@/public/icons/loading-ring.svg";
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"
// import { Session } from "next-auth"
// import updateProfile from "@/actions/profile/updateProfile"

export default function ConfirmLeaveChatModal({
    showConfirmLeaveChat,
    toggleConfirmLeaveChat,
    handleLeaveChat,
    chatroomId
    // session,
    // userId,
}: {
    showConfirmLeaveChat: boolean
    toggleConfirmLeaveChat: () => void
    handleLeaveChat: (chatroomId: number, userId: number) => void
    chatroomId: number
    // session: Session | null
    // userId: string
}) {
    const [isDisabled, setDisabled] = useState(false)
    const [primaryLoading, setPrimaryLoading] = useState(false)

    const router = useRouter()

    const handleConfirmLeaveChat = async () => {
        setPrimaryLoading((prev) => !prev)
        setDisabled(true)
        handleLeaveChat(chatroomId, 1);

        // authorize ก่อน
        // if (!session || session.user.id !== userId) {
        //   console.log("Unauthorized user")

        //   router.push("/login")
        //   return
        // }

        const formDataObject = new FormData()
        // formDataObject.append("userId", userId)

        // const result = await updateProfile(formDataObject)

        // name แก้ไขทุกรอบที่ submit
        toast.success("เข้ากลุ่มสำเร็จ")
        setPrimaryLoading((prev) => !prev)
        setDisabled(false)
        toggleConfirmLeaveChat()

        // redirect กลับมาหน้าโปรไฟล์แบบ rerender page ใหม่
    }

    return (
        showConfirmLeaveChat && (
            <div
                className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
                onClick={() => {
                    toggleConfirmLeaveChat()
                }}>
                <div className="flex justify-center">
                    <div
                        className=" bg-[#f8fafc] p-[20px] lg:px-[30px] lg:pb-[30px] rounded-[15px] w-full mt-[163px] lg:mt-[320px] max-w-[500px]"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}>
                        <p className="font-bold text-[24px] text-slate-600 mb-[15px]">ออกจากกลุ่ม</p>

                        <div className="flex gap-1 flex-grow mt-[30px] justify-center w-full ">
                            <p className="text-[16px] font-medium text-slate-900">
                                คุณแน่ใจที่จะออกจากกลุ่ม?
                            </p>
                        </div>

                        <div className="mt-[20px] flex justify-between">
                            <button
                                className="w-[47%] rounded-[6px] border border-[#E2E8F0] text-[#0F172A] py-[10px] hover:opacity-[80%] active:opacity-[60%] mt-[20px]"
                                onClick={(e) => {
                                    e.preventDefault()
                                    toggleConfirmLeaveChat()
                                }}>
                                ยกเลิก
                            </button>
                            <button
                                type="button"
                                className={`px-[20px] py-[10px] rounded-[6px] text-sm font-medium text-slate-500 hover:bg-red-500 hover:text-white active:opacity-60 disabled:opacity-60 w-[47%] rounded-[6px] text-[#FFFFFF] bg-[#334155] py-[10px] mt-[20px]`}
                                disabled={isDisabled}
                                onClick={(e) => { e.preventDefault(); handleConfirmLeaveChat() }}
                            >
                                {primaryLoading ? (
                                    <div className="flex gap-2 justify-center items-center">
                                        <Image src={LoadingRing} alt="logo" width={20} height={20} />
                                        กำลังดำเนินการ
                                    </div>
                                ) : (
                                    <p className="text-white">
                                        ยืนยันการออกจากกลุ่ม
                                    </p>
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
