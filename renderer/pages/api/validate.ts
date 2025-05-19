import { db } from "@/db";
import { sessions, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const validate = async (req:NextApiRequest,res:NextApiResponse)=> {
const cookie = req.cookies.session;
  if (!cookie) {
    return res.status(401).json({ error: "Brak sesji" });
  }
const database = await db.select().from(sessions).where(eq(sessions.userId, cookie!));
if(!database) return res.status(400).json({error:"no match"});
    const user = await db.query.usersTable.findFirst({where:eq(usersTable.user_id,cookie!)});
return res.status(200).json({name:user!.name,userid:user!.user_id})
}
export default validate;