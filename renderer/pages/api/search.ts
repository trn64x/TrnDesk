import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const Search = async (req:NextApiRequest,res:NextApiResponse)=> {

const data = await db.select().from(notes).where(like(notes.Title,`%${req.body}%`));
if(data){
    return res.status(200).json(data);
}else{
    return res.status(400).json({error: "error due to search"})
}
}
export default Search;