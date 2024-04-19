import Image from "next/image"

export default function CreateNewGroupButton() {
    return (
        <div className="w-full bg-slate-200 h-[60px] rounded-md p-[8px] flex items-center text-slate-800 mt-[10px]">
            <button
                className={`w-full h-full flex items-center justify-center rounded-md bg-white
                }`}
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
        </div>
    )
}
