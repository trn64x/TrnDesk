"use server";
import { integer, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  user_id: uuid("user_id").primaryKey().notNull().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial().primaryKey(), 
  userId: uuid("user_id").notNull().references(() => usersTable.user_id),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});
export const notes = pgTable("notes",{
  id: serial().primaryKey(),
  user_id: uuid("user_id").notNull().references(()=> sessions.userId),
  Title: varchar("Title", {length:30}).notNull(),
  Content: varchar("Content",{length:2000}).notNull(),
  createdAt: timestamp("created_at").defaultNow(),

})