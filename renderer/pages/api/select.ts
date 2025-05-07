import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const AllNote = async(
    req: NextApiRequest,
    res:NextApiResponse
) => {
const { userId } = req.body;
const database = await db.select().from(notes).where(eq(notes.user_id,userId));
if(database.length !== 0){
    return res.status(200).json(database);
}
else{
    return res.status(500).json({error: "couldnt fetch the data"});
}
}
export default AllNote;