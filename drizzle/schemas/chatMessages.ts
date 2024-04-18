import {
    pgEnum,
    pgTable,
    serial,
    text,
    integer,
    timestamp
} from 'drizzle-orm/pg-core';
import { chatrooms } from './chatrooms';
import { users } from './users';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const messageTypeEnum = pgEnum('message_type', ['text', 'image']);

export const chatMessages = pgTable(
    'chat_messages',
    {
        id: serial('id').primaryKey(),
        chatroomId: integer('chatroom_id').notNull().references(() => chatrooms.id),
        userId: integer('user_id').notNull().references(() => users.id),
        content: text('message').notNull(),
        type: messageTypeEnum('message_type').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull()
    }
);

export type ChatMessage = InferSelectModel<typeof chatMessages>
export type NewChatMessage = InferInsertModel<typeof chatMessages>