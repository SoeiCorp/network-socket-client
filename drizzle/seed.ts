require("dotenv").config();
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from "@vercel/postgres";
import { faker } from "@faker-js/faker";
import { users, User, NewUser } from "./schemas/users"
import { chatrooms, Chatroom, NewChatroom } from './schemas/chatrooms';
import { chatroomUsers, ChatroomUser, NewChatroomUser } from './schemas/chatroomUsers';
import { chatMessages, ChatMessage, NewChatMessage } from './schemas/chatMessages'

const main = async () => {
    const db = drizzle(createPool({
        connectionString: process.env.POSTGRES_URL
    }));
    await db.delete(chatMessages)
    await db.delete(chatroomUsers)
    await db.delete(users);
    await db.delete(chatrooms);
    const usersData: NewUser[] = [];
    const chatroomsData: NewChatroom[] = [];
    const chatroomUsersData: NewChatroomUser[] = [];
    const chatMessagesData: NewChatMessage[] = [];
    for (let i = 0; i < 20; i++) {
        usersData.push({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: "root1234"
        });
    }
    for (let i = 0; i < 5; i++) {
        const type = i % 3 == 0 ? "group" : "private";
        chatroomsData.push({
            name: type === "group" ? faker.internet.displayName() : null,
            type: type
        })
    }
    /* GROUP 1 */
    chatroomUsersData.push({
        chatroomId: 1,
        userId: 1
    })
    chatroomUsersData.push({
        chatroomId: 1,
        userId: 2
    })
    chatroomUsersData.push({
        chatroomId: 1,
        userId: 3
    })
    chatMessagesData.push({
        chatroomId: 1,
        userId: 1,
        content: 'Hello!',
        type: 'text'
    })
    chatMessagesData.push({
        chatroomId: 1,
        userId: 1,
        content: 'World!',
        type: 'text'
    })
    chatMessagesData.push({
        chatroomId: 1,
        userId: 2,
        content: 'Hello!',
        type: 'text'
    })
    chatMessagesData.push({
        chatroomId: 1,
        userId: 3,
        content: 'Hello!',
        type: 'text'
    })
    /* GROUP 2 - no chat message */
    chatroomUsersData.push({
        chatroomId: 4,
        userId: 10
    })
    chatroomUsersData.push({
        chatroomId: 4,
        userId: 11
    })
    chatroomUsersData.push({
        chatroomId: 4,
        userId: 12
    })
    chatroomUsersData.push({
        chatroomId: 4,
        userId: 13
    })
    chatroomUsersData.push({
        chatroomId: 4,
        userId: 14
    })
    /* PRIVATE 1 */
    chatroomUsersData.push({
        chatroomId: 2,
        userId: 2
    })
    chatroomUsersData.push({
        chatroomId: 2,
        userId: 4
    })
    chatMessagesData.push({
        chatroomId: 2,
        userId: 2,
        content: 'Hello!',
        type: 'text'
    })
    chatMessagesData.push({
        chatroomId: 2,
        userId: 4,
        content: 'Hello!',
        type: 'text'
    })
    /* PRIVATE 2 */
    chatroomUsersData.push({
        chatroomId: 3,
        userId: 3
    })
    chatroomUsersData.push({
        chatroomId: 3,
        userId: 6
    })
    chatMessagesData.push({
        chatroomId: 3,
        userId: 3,
        content: 'สวัสดี',
        type: 'text'
    })
    chatMessagesData.push({
        chatroomId: 3,
        userId: 6,
        content: 'สวัสดี',
        type: 'text'
    })
    /* PRIVATE 3 - no chat message */
    chatroomUsersData.push({
        chatroomId: 5,
        userId: 5
    })
    chatroomUsersData.push({
        chatroomId: 5,
        userId: 10
    })

    console.log("Running seed...")
    const insertedUser: User[] = await db.insert(users).values(usersData).returning();
    console.log(insertedUser)
    const insertedChatroom: Chatroom[] = await db.insert(chatrooms).values(chatroomsData).returning();
    const insertedChatroomUser: ChatroomUser[] = await db.insert(chatroomUsers).values(chatroomUsersData).returning();
    const insertedChatMessage: ChatMessage[] = await db.insert(chatMessages).values(chatMessagesData).returning();
    console.log("Seed successfully")
    process.exit(0)
}

main().catch((e) => {
    console.log('Seed failed');
    console.error(e)
    process.exit(1)
});
