import { db } from "@/db";
import { notes, usersTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const Delete = async (req:NextApiRequest,
    res:NextApiResponse
) => {
    const {noteId, userId} = req.body;
    await db.delete(notes).where(eq(notes.id,noteId));
    const database = await db.select().from(notes).where(eq(notes.user_id,userId))
    if(database){
        await db.update(usersTable).set({delete: sql`${usersTable.delete} + 1`}).where(eq(usersTable.user_id,userId))
        return res.status(200).json(database);
    }
        
}
export default Delete;