import Image from "next/image";
import { useState } from "react";
import DangerButton from "@/components/public/DangerButton";
import EditProfileModal from "./EditProfileModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import { useAppContext } from "@/context";
import { disconnectFromSocket } from "@/components/socket/client";

export default function Profile() {
  const router = useRouter();
  const { context, setTrigger } = useAppContext();
  const name = context.name;
  const userId = context.userId;
  const [showEditProfile, setShowEditProfile] = useState(false);
  // console.log(name.toUpperCase());

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleLogout = async () => {
    // Call Logout API
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
      });
      if (response.ok) {
        console.log("User logged out successfully");
        toast.success("ออกจากระบบสำเร็จ");
        disconnectFromSocket();
        router.push("/login");
      } else {
        console.error("Logout failed");
        toast.error("System error");
      }
    } catch (error) {
      console.error("Error logging out user:", error);
      toast.error("System error");
    }
  };

  return (
    <div className="w-full rounded-md flex items-center text-slate-800 mt-[10px] mb-[10px]">
      <div
        className={`w-full h-full flex items-center rounded-md bg-white px-[16px]  justify-between border border-slate-400 text-slate-800 mt-[10px] mb-[10px]
                }`}
      >
        <div className="w-full flex items-center gap-4">
          {/* Avatar */}
          <Avatar name={name} userId={userId} />

          {/* Name */}
          <p className="text-md font-medium mr-[7px]">{name}</p>

          {/* Pencil */}
          <Image
            src={"/icons/pencil.svg"}
            width={20}
            height={20}
            alt="plus"
            className="mr-[10px] cursor-pointer"
            onClick={() => toggleEditProfile()}
          />
        </div>
        {/* Log out button */}
        <DangerButton type="button" onClick={handleLogout} className="shrink-0">
          ออกจากระบบ
        </DangerButton>

        {/* Edit profile */}
        <EditProfileModal
          showEditProfile={showEditProfile}
          toggleEditProfile={toggleEditProfile}
        />
      </div>
    </div>
  );
}
