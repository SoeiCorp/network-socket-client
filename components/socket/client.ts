"use client";
import { Socket, io } from "socket.io-client";
import { ChatMessage } from "@/drizzle/schemas/chatMessages";
import { Dispatch, SetStateAction } from "react";
import {
    ChatMessageWithName,
    MessagesGroupByDate,
} from "../chat/ChatRoom/ChatMessageList";
import { appendMessage } from "./utils";
import { ChatroomResult, UserResult } from "@/app/chat/layout";
import { da } from "@faker-js/faker";
import { revalidateChatrooms } from "@/lib/actions";

const socketServerURL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '';

// export let socket: Socket;
export let socket: Socket = io(socketServerURL, {
    withCredentials: true,
    transports: ['websocket']
});

export async function connect() {
    const res = await fetch("/api/auth/me");
    const response = await res.json();
    const { id } = response.data;

    // disconnect from the old connection
    // if (socket) {
    //   socket.disconnect();
    //   console.log("Disconnect to socket");
    // }

    socket = io(socketServerURL, {
        withCredentials: true,
        transports: ['websocket']
    });
    console.log("Connect to socket");
    socket.on("connect_error", (err) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err.message);

        // some additional description, for example the status code of the initial HTTP response
        console.log(err.description);

        // some additional context, for example the XMLHttpRequest object
        console.log(err.context);
    });

    socket.emit("login", id);

    socket.on("create group", async (chatroom: ChatroomResult) => {
        await revalidateChatrooms();
    });

    socket.on("leave group", async (chatroomId: string, leaveUserId: string) => {
        await revalidateChatrooms();
    });

    socket.on("join group", async (chatroomId: string, joinUserId: string) => {
        await revalidateChatrooms();
    });

    // socket.on('users online', (data: [userId: string]) => {
    //     console.log('users online', data)
    // })
    // socket.on('private message', (senderId: string, chatMessage: ChatMessageWithName) => {
    //     console.log('Private message sent from:', senderId, chatMessage)
    // })
    // socket.on('private message sent', (recipientId: string, chatMessage: ChatMessageWithName) => {
    //     console.log('Private message sent to:', recipientId, chatMessage)
    // })
    // socket.on('group message', (chatroomId: string, chatMessage: ChatMessageWithName, senderId: string) => {
    //     console.log('Group message sent from:', senderId, 'in', chatroomId, chatMessage)
    // })
    // socket.on('group message sent', (chatroomId: string, chatMessage: ChatMessageWithName, recipientId: string) => {
    //     console.log('Group message sent to:', recipientId, 'in', chatroomId, chatMessage)
    // })
    socket.on("create group", (chatroom: ChatroomResult) => {
        console.log("New chatroom:", chatroom);
    });
    socket.on("join group sent", (chatroomId: string, joinUserId: string) => {
        console.log("Join chatroom:", chatroomId, joinUserId);
    });
    // socket.on('leave group', (chatroomId: string, leaveUserId: string) => {
    //     console.log('Leave chatroom:', chatroomId, leaveUserId)
    // })
}

export function socketMessagesReceiver(
    currentChatroomId: string,
    setMessagesByDate: Dispatch<SetStateAction<MessagesGroupByDate[]>>
) {
    socket.on(
        "group message",
        (
            chatroomId: string,
            chatMessage: ChatMessageWithName,
            senderId: string
        ) => {
            console.log(chatMessage);
            console.log(currentChatroomId === chatroomId);
            if (currentChatroomId === chatroomId) {
                setMessagesByDate((messagesByDate) => {
                    const newMessagesByDate = appendMessage(messagesByDate, chatMessage);
                    return newMessagesByDate;
                });
            }
        }
    );
}

// export function socketOnlineUsersReceiver(
//   setOnlineIds: Dispatch<SetStateAction<string[]>>
// ) {
//   socket.on("users online", (data: string[]) => {
//     console.log("ONline in socket", data);
//     setOnlineIds(data);
//   });
// }

export function sendGroupMessage(chatroomId: Number, message: string) {
    if (socket) {
        socket.emit("group message", chatroomId, message);
    } else {
        console.log("socket not found");
    }
}

export function joinGroupChatroom(chatroomId: Number) {
    if (socket) {
        socket.emit("join group", chatroomId);
    } else {
        console.log("socket not found");
    }
}

export function leaveGroupChatroom(chatroomId: Number) {
    if (socket) {
        socket.emit("leave group", chatroomId);
    } else {
        console.log("socket not found");
    }
}

export function disconnectFromSocket() {
    if (socket) {
        socket.disconnect();
        socket = io(socketServerURL);
    } else {
        console.log("socket not found");
    }
}

export function createGroupChatroom(chatroomId: Number) {
    if (socket) {
        socket.emit("create group", chatroomId);
    } else {
        console.log("socket not found");
    }
}

// export function sendPrivateMessage(recipientId: Number, message: string) {
//     if (socket) {
//         socket.emit('private message', recipientId, message)
//     } else {
//         console.log('socket not found')
//     }
// }
