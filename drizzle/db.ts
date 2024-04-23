// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { createClient, createPool } from "@vercel/postgres";

// export const db = drizzle(createPool({
//     connectionString: process.env.POSTGRES_URL
// }));

// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client, Pool } from "pg";
// const client = new Pool({
//     connectionString: "postgresql://socket_owner:A4wHRQT2Ptaz@ep-solitary-sun-a1qfgev8-pooler.ap-southeast-1.aws.neon.tech/socket?sslmode=require",
// });

// client.connect();
// export const db = drizzle(client);

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);