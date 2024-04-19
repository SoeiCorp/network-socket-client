"use client"

import ChatCard from "./ChatCard"
import { useEffect, useState } from "react"
import ChatCardLoading from "./ChatCardLoading"
import SearchNotFound from "./SearchNotFound"
import { Chatroom } from "@/drizzle/schemas/chatrooms"

type Props = {
    userId: string
}

// TEMPORARY 
const chatroomsData: Chatroom[] = [
    {
        id: 1,
        name: "Somchai",
        type: "private",
        createdAt: new Date(),
    },
    {
        id: 2,
        name: "Somying",
        type: "private",
        createdAt: new Date(),
    },
]; 

export default function ChatCardList({ userId }: Props) {
    const [chatrooms, setChatrooms] = useState<Chatroom[]>(chatroomsData)
    const [loading, setLoading] = useState<boolean>(false);

                    
    

    return (
        <>
            {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <ChatCardLoading key={index} />
                ))
            ) : chatrooms.length ? (
                chatrooms.map((chatroom, index) => <ChatCard key={index} chatroom={chatroom} />)
            ) : (
                <div className="col-span-full">
                    <SearchNotFound text="ไม่พบห้องแชท" />
                </div>
            )}
        </>
    )
}