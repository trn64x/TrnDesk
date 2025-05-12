import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const edit = async(req:NextApiRequest, res:NextApiResponse)=> {
const {userid, Title,Content,id } = req.body;
await db.update(notes).set({Title:Title,Content:Content}).where(eq(notes.id,id));
const database = await db.select().from(notes).where(eq(notes.user_id,userid))
if(database){
    return res.status(200).json(database);
}else{
    return res.status(400).json({error: "no such thing"})
}

}
export default edit;