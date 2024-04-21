"use client";
import PrimaryButton from "@/components/public/PrimaryButton";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileModal({
  showEditProfile,
  toggleEditProfile,
  oldName,
}: // session,
// userId,
{
  showEditProfile: boolean;
  toggleEditProfile: () => void;
  oldName: string;
  // session: Session | null
  // userId: string
}) {
  const [name, setName] = useState(oldName);
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleEditProfile = async () => {
    try {
      setPrimaryLoading(true);
      setDisabled(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        console.log("Edit name successfully");
        toast.success("แก้ไขชื่อสำเร็จ");
      } else {
        console.error("Edit name failed");
        toast.error("แก้ไขชื่อไม่สำเร็จ")
      }
    } catch (error) {
      console.error("Error ำกระ user:", error);
      toast.error("System error");
    } finally {
      setPrimaryLoading(false);
      setDisabled(false);
      toggleEditProfile();
    }
    // redirect กลับมาหน้าโปรไฟล์แบบ rerender page ใหม่
  };
  console.log(name);
  return (
    showEditProfile && (
      <div
        className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
        onClick={() => {
          toggleEditProfile();
        }}
      >
        <div className="flex justify-center">
          <div
            className=" bg-[#f8fafc] p-[20px] lg:px-[30px] lg:pb-[30px] rounded-[15px] w-full mt-[163px] lg:mt-[185px] max-w-[500px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="font-bold text-[24px] text-slate-600 mb-[7px]">
              แก้ไขโปรไฟล์
            </p>

            <div className="flex flex-col gap-1 flex-grow mt-[10px]">
              <label
                htmlFor="text-area"
                className="text-[14px] font-medium text-slate-900"
              >
                ชื่อ
              </label>
              <textarea
                id="text-area"
                name="name"
                className="h-[100px] rounded-[6px] border border-[#CBD5E1] px-[10px] py-[5px] "
                onChange={handleChange}
                value={name}
              ></textarea>
            </div>

            <div className="mt-[20px] flex justify-between">
              <button
                className="w-[47%] rounded-[6px] border border-[#E2E8F0] text-[#0F172A] py-[10px] hover:opacity-[80%] active:opacity-[60%]"
                onClick={() => {
                  toggleEditProfile();
                }}
              >
                ยกเลิก
              </button>
              <PrimaryButton
                type="submit"
                isDisabled={isDisabled}
                className="w-[47%] rounded-[6px] text-[#FFFFFF] bg-[#334155] py-[10px] hover:opacity-[80%] active:opacity-[60%]"
                isLoading={primaryLoading}
                onClick={handleEditProfile}
                loadingMessage="กำลังดำเนินการ"
              >
                ยืนยันการแก้ไข
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
