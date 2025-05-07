"use server";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // UWAGA: to musi być postgres://...
  ssl: {
    rejectUnauthorized: false, // bo Supabase wymusza SSL
  },
});