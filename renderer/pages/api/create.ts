import { db } from "@/db";
import { notes } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

const createNote = async (req: NextApiRequest, res: NextApiResponse)=>{
const {userId,title,note} = req.body; 
const NoteData = await db.insert(notes).values({user_id:userId,Title:title,Content:note,createdAt: new Date()});
if(NoteData){
    return res.status(200).json({message: "everything is okay"})
}else{
    return res.status(400).json({error: "nothing is okay"});
}
}
export default createNote;