import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./db/schema.ts",
    out: "./db/migrations",
    dbCredentials: {
        uri: process.env.DB_URL!,
    },
    driver: "mysql2",
} satisfies Config;