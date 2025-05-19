import { db } from "@/db";
import { eq } from "drizzle-orm";
import { sessions, usersTable } from "@/db/schema";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  
  const cookie = req.cookies.session;
if(!cookie){

  return res.status(401).json({error:"no session"});
}
const session = await db.query.sessions.findFirst({
  where: eq(sessions.userId, cookie!)
});

if(!session){
  return res.status(402).json({ error: "there is no such session"});
}
const user = await db.query.usersTable.findFirst({
  where: eq(usersTable.user_id, cookie!)
})

return res.status(200).json({name: user!.name, userid: user!.user_id})

}
