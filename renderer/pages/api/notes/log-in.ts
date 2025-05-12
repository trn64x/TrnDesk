"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import cookie from "cookie";
import { sessions, usersTable } from "@/db/schema";
import { NextApiResponse, NextApiRequest } from "next";
import { serial } from "drizzle-orm/pg-core";
import bcrypt from "bcryptjs";
const handler = async(req: NextApiRequest, res:NextApiResponse)=> {
    try{
        const {email, password} = req.body;
        
const database = await db.query.usersTable.findFirst({
    where:eq(usersTable.email,email),
});
if(!database){
    return res.status(400).json({error: "no data at all"});
}
const passwordcompared = await bcrypt.compare(password, database!.password);
if(database && passwordcompared){
    const SessionExist = await db.query.sessions.findFirst({
        where: eq(sessions.userId, database.user_id)
    })

    const session = database.user_id;
    console.log(session);
    if(!SessionExist){
        console.log("sesja nie istnieje");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
        await db.insert(sessions).values({
            userId: session,
            createdAt:new Date(),
            expiresAt:expiresAt
        })
    }

    res.setHeader('Set-Cookie', `session=${session}`);
    res.status(200).json({message: "cookie has been sent"});
        
}
else{
    return res.status(400).json({error: "no such user."})}
    }
    catch(err){
        return res.status(400).json({Error: "Something went Wrong.", err});
    }
}
export default handler;