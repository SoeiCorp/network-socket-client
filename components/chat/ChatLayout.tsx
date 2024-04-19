"use client"

import ChatCardList from "./ChatCardList";

type Props = {
    children: React.ReactNode,
    userId: string | null
}

export default function ChatLayout({ children, userId }: Props) {
    return (
                
                <div className="flex gap-4 h-full">
                    
                        
                            
                            {userId !== null && (
                                <div className="hidden lg:block min-w-[430px] w-[30vw] h-full overflow-y-auto">
                                    <ChatCardList userId={userId} />
                                </div >
                            )}
                        
                    
                    
                    <div className="w-full">{children}</div>
                </div>
    )
}