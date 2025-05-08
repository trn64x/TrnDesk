import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const Delete = async (req:NextApiRequest,
    res:NextApiResponse
) => {
    const {noteId} = req.body;
    const database = await db.delete(notes).where(eq(notes.id,noteId));
    if(database){
        return res.status(200).json(database);
    }
    else{
        return res.status(400);
    }
}
export default Delete;