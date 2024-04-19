import Logo from "../auth/Logo";

export default function DefaultChatRoom() {
    return (
        <div className="h-full w-full flex flex-col gap-6 justify-center items-center bg-neutral-100 border border-[#CBD5E1]">
            <Logo/>
            <div className="font-medium text-[24px] text-slate-800 opacity-90">
                ยินดีต้อนรับเข้าสู่ SoeiChat!
            </div>
        </div>
    )
}