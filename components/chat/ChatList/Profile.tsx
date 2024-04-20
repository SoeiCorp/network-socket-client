import Image from "next/image"
import { useState } from "react"
import DangerButton from "@/components/public/DangerButton"
import EditProfileModal from "./EditProfileModal"
type Name = {
    name: string
}
export default function Profile(props: Name) {
    const { name } = props;
    const [showEditProfile, setShowEditProfile] = useState(false)
    // console.log(name.toUpperCase());

    const toggleEditProfile = () => {
        setShowEditProfile(!showEditProfile)
    }
    return (
        <div className="w-full rounded-md flex items-center text-slate-800 mt-[10px] mb-[10px]">
            <div
                className={`w-full h-full flex items-center rounded-md bg-white px-[16px]  justify-between border border-slate-400 text-slate-800 mt-[10px] mb-[10px]
                }`}
            >
                <div className="w-full flex items-center">
                    {/* Avatar ver have to chatroomId */}
                    <div className="shrink-0 mr-[15px]">
                        <div
                            className={
                                "w-[48px] h-[48px] rounded-full flex items-center justify-center bg-white border border-slate-400"
                            }
                        >
                            <div className="text-slate-800 text-lg">{props.name[0]}</div>
                        </div>
                    </div>

                    {/* Name */}
                    <p className="text-md font-medium mr-[7px]">
                        {props.name}
                    </p>

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
                <DangerButton type="button" onClick={() => { }} className="shrink-0">
                    ออกจากระบบ
                </DangerButton>

                {/* Edit profile */}
                <EditProfileModal
                    showEditProfile={showEditProfile}
                    toggleEditProfile={toggleEditProfile}
                    oldName={name}
                // session={session}
                // userId={userId}
                />
            </div>
        </div>
    )
}
