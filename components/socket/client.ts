'use client'
import { Socket, io } from 'socket.io-client'
import { ChatMessage } from '@/drizzle/schemas/chatMessages';

// const socketServerURL = 'https://soei-socket-server.vercel.app/'
const socketServerURL = 'http://localhost:3001/'

type toClientMessage = {
    id: number
    chatroomId: number
    userId: number
    content: string
    type: "text" | "image"
    createdAt: string
    userName: string
}

let socket: Socket;

export async function connect() {
    const res = await fetch('/api/auth/me');
    const response = await res.json();
    const { id } = response.data;
    socket = io(socketServerURL, {
        extraHeaders: {
            'user-id': id
        }
    })
    socket.emit('login', id)
    socket.on('users online', (data: [userId: string]) => {
        console.log('users online', data)
    })
    socket.on('private message', (senderId: string, chatMessage: toClientMessage) => {
        console.log('Private message sent from:', senderId, chatMessage)
    })
    socket.on('private message sent', (recipientId: string, chatMessage: toClientMessage) => {
        console.log('Private message sent to:', recipientId, chatMessage)
    })
    socket.on('group message', (chatroomId: string, chatMessage: toClientMessage, senderId: string) => {
        console.log('Group message sent from:', senderId, 'in', chatroomId, chatMessage)
    })
    socket.on('group message sent', (chatroomId: string, chatMessage: toClientMessage, recipientId: string) => {
        console.log('Group message sent to:', recipientId, 'in', chatroomId, chatMessage)
    })
    socket.on('join group', (chatroomId: string, joinUserId: string) => {
        console.log('Join chatroom:', chatroomId, joinUserId)
    })
    socket.on('leave group', (chatroomId: string, leaveUserId: string) => {
        console.log('Join chatroom:', chatroomId, leaveUserId)
    })
}

export function sendPrivateMessage(recipientId: Number, message: string) {
    if (socket) {
        socket.emit('private message', recipientId, message)
    } else {
        console.log('socket not found')
    }
}

export function sendGroupMessage(chatroomId: Number, message: string) {
    if (socket) {
        socket.emit('group message', chatroomId, message)
    } else {
        console.log('socket not found')
    }
}

export function joinGroupChatroom(chatroomId: Number) {
    if (socket) {
        socket.emit('join group', chatroomId)
    } else {
        console.log('socket not found')
    }
}

export function leaveGroupChatroom(chatroomId: Number) {
    if (socket) {
        socket.emit('leave group', chatroomId)
    } else {
        console.log('socket not found')
    }
}

export function disconnectFromSocket() {
    if (socket) {
        socket.disconnect()
    } else {
        console.log('socket not found')
    }
}