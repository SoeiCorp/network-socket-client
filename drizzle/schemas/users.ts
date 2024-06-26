import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const users = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),
        name: text('name'),
        email: text('email').notNull().unique(),
        password: text('password').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
    },
    (users) => {
        return {
            uniqueIdx: uniqueIndex('unique_idx').on(users.email),
        };
    },
);

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>