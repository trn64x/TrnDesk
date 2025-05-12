import { db } from "@/db";
import { notes, usersTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const createNote = async (req: NextApiRequest, res: NextApiResponse)=>{
const {userId,title,note} = req.body; 
const NoteData = await db.insert(notes).values({user_id:userId,Title:title,Content:note,createdAt: new Date()});
if(NoteData){
    await db.update(usersTable).set({created: sql`${usersTable.created} + 1` }).where(eq(usersTable.user_id,userId));
    return res.status(200).json({message: "Your note has been saved!"})
}else{
    return res.status(400).json({error: "Something went wrong."});
}
}
export default createNote;