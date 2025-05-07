"use server";
import { drizzle } from "drizzle-orm/node-postgres"; // tutaj poprawnie
import { pool } from "../utils/db";
import * as schema from "./schema";

export const db = drizzle(pool, { schema });