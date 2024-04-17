require("dotenv").config();
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from "@vercel/postgres";

const main = async () => {
    const db = drizzle(createPool({
        connectionString: process.env.POSTGRES_URL
    }));
    console.log("Running migrations...")
    await migrate(db, { migrationsFolder: "./drizzle/migrations" });
    console.log("Migrated successfully")
    process.exit(0)
}

main().catch((e) => {
    console.log('Migration failed');
    console.error(e)
    process.exit(1)
});
