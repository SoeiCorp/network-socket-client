import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createClient, createPool } from "@vercel/postgres";

export const db = drizzle(createPool({
    connectionString: process.env.POSTGRES_URL
}));