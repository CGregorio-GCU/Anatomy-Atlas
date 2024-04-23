import {drizzle} from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dotenv from "dotenv";
import { courses } from "./schema";
import type { Mode } from "drizzle-orm/mysql-core";

dotenv.config();

if (!process.env.DB_URL) {
    throw new Error("DB Credentials error");
}
const connection = mysql.createConnection(process.env.DB_URL);

// Define a custom type for the schema object
type Schema = {
    [key: string]: any;
    courses: typeof courses;
};

// Create the schema object
const schema: Schema = {
    courses: courses
};

// Pass the schema object to the drizzle function
export const db = drizzle(connection, { schema: schema, mode: "query" as Mode });