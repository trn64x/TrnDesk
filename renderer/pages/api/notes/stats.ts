import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const stats = async (req:NextApiRequest,res:NextApiResponse)=> {
    const {userid} = req.body;
    const database = await db.select({f1:usersTable.created,f2:usersTable.delete}).from(usersTable).where(eq(usersTable.user_id,userid));
    if(database){
        return res.status(200).json(database);
    }
    else{
        return res.status(400);
    }
}
export default stats;