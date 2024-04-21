'use client'
import { Socket, io } from 'socket.io-client'

// const socketServerURL = 'https://soei-socket-server.vercel.app/'
const socketServerURL = 'http://localhost:3001/'

let curChatroomId: number;
let socket: Socket;

export async function connect(chatroomId: number, senderId: number) {
    if (chatroomId === curChatroomId) return;
    // if (socket) {
    //     socket.disconnect();
    // }
    const res = await fetch('/api/auth/me');
    const response = await res.json();
    const { id } = response.data;
    socket = io(socketServerURL, {
        extraHeaders: {
            'user-id': id
        }
    })
    socket.emit('login', id)
    let data: any;
    socket.on('users online', (data) => {
        console.log('users online', data)
    })
    socket.on('private message', (senderId, message) => {
        console.log('Private message sent from:', senderId, message)
    })
    socket.on('private message sent', (recipientId, message) => {
        console.log('Private message sent to:', recipientId, message)
    })
    // console.log("data", data)

    curChatroomId = chatroomId
}

export function sendPrivateMessage(recipientId: Number, message: string) {
    if (socket) {
        socket.emit('private message', recipientId, message)
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