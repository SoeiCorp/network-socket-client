import {
    pgTable,
    integer,
    timestamp,
    primaryKey
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { chatrooms } from './chatrooms';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const chatroomUsers = pgTable(
    'chatroom_users',
    {
        chatroomId: integer('chatroom_id').references(() => chatrooms.id),
        userId: integer('user_id').references(() => users.id),
        createdAt: timestamp('created_at').defaultNow().notNull()
    }, (chatroomUsers) => {
        return {
            pk: primaryKey({ columns: [chatroomUsers.chatroomId, chatroomUsers.userId] })
        }
    }
);

export type ChatroomUser = InferSelectModel<typeof chatroomUsers>
export type NewChatroomUser = InferInsertModel<typeof chatroomUsers>