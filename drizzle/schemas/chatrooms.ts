import {
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp
} from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const chatroomTypeEnum = pgEnum('chatroom_type', ['private', 'group']);

export const chatrooms = pgTable(
    'chatrooms',
    {
        id: serial('id').primaryKey(),
        name: text('name'),
        type: chatroomTypeEnum('chatroom_type').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull()
    }
);

export type Chatroom = InferSelectModel<typeof chatrooms>
export type NewChatroom = InferInsertModel<typeof chatrooms>