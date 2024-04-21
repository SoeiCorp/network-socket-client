'use client'
import { Socket, io } from 'socket.io-client'

const socketServerURL = 'https://soei-socket-server.vercel.app/'

let curChatroomId: string;
let socket: Socket = io(socketServerURL)

export function connect(chatroomId: string, senderId: string) {
    if (chatroomId === curChatroomId) return;
    if (socket) {
        socket.disconnect();
    }
    socket = io(socketServerURL, {
        extraHeaders: {
            'chat-room-id': chatroomId,
            'user-id': senderId
        }
    })

    curChatroomId = chatroomId
}