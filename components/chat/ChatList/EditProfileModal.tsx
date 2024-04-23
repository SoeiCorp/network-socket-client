import PrimaryButton from "@/components/public/PrimaryButton";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { updateUser } from "@/components/socket/client";
import { useAppContext } from "@/context";

export default function EditProfileModal({
  showEditProfile,
  toggleEditProfile,
}: {
  showEditProfile: boolean;
  toggleEditProfile: () => void;
}) {
  const { context, setTrigger } = useAppContext();
  const [name, setName] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEditProfile = async () => {
    try {
      setPrimaryLoading(true);
      setDisabled(true);
      const response = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
      if (response.ok) {
        console.log("Edit name successfully");
        toast.success("แก้ไขชื่อสำเร็จ");
        updateUser(context.userId, name);
        setTrigger((prev: boolean) => !prev);
      } else {
        console.error("Edit name failed");
        toast.error("แก้ไขชื่อไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Error edit user:", error);
      toast.error("System error");
    } finally {
      setName("");
      setPrimaryLoading(false);
      setDisabled(false);
      toggleEditProfile();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEditProfile();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleEditProfile();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [toggleEditProfile]);

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
            <p className="font-bold text-[24px] text-slate-600 mb-[7px] text-center pt-2">
              เปลี่ยนชื่อ
            </p>

            <div className="flex flex-col gap-1 flex-grow mt-[10px]">
              <input
                id="text-area"
                name="name"
                type="text"
                className="py-[10px] rounded-[6px] border border-[#CBD5E1] px-[10px]"
                onChange={handleChange}
                value={name}
                placeholder={context.name}
                onKeyDown={handleKeyPress} // Handle Enter key press
              ></input>
            </div>

            <div className="mt-[20px] flex justify-between">
              <button
                className="w-[47%] rounded-[6px] border border-slate-300 text-[#0F172A] py-[10px] hover:opacity-[60%] active:opacity-[10%]"
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
                บันทึก
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
