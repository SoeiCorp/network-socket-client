import Image from "next/image"
import { useState } from "react"
import CreateNewGroup from "./CreateNewGroup"

export default function CreateNewGroupButton() {
    const [showCreateNewGroup, setShowCreateNewGroup] = useState(false)

    const toggleCreateNewGroup = () => {
        setShowCreateNewGroup(!showCreateNewGroup)
    }

    return (
        <div className="w-full h-[50px] rounded-md flex items-center text-slate-800 mt-[10px]">
            <button
                className={`w-full h-full flex items-center justify-center rounded-md bg-white border border-slate-400}`}
                onClick={() => { toggleCreateNewGroup() }}
            >
                <Image
                    src={"/icons/plus.svg"}
                    width={27}
                    height={27}
                    alt="plus"
                    className="mr-[10px]"
                />
                <p className="text-sm">
                    สร้างกลุ่ม
                </p>
            </button>
            <CreateNewGroup showCreateNewGroup={showCreateNewGroup} toggleCreateNewGroup={toggleCreateNewGroup} />
        </div>
    )
}
