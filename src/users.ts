import {sql} from "drizzle-orm";
import {text, integer, sqliteTable} from "drizzle-orm/sqlite-core";
import {db} from "./db";

db.run(sql`CREATE TABLE IF NOT EXISTS users
           (
             id
             INTEGER
             PRIMARY
             KEY
             AUTOINCREMENT,
             name
             TEXT
           )`);


export const users = sqliteTable('users', {
  id: integer("id").primaryKey({autoIncrement: true}),
  name: text("name")
});