import {
    pgTable,
    integer,
    timestamp,
    primaryKey
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { chatrooms } from './chatrooms';

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