import { NextApiRequest, NextApiResponse } from "next";

const Logout = (req:NextApiRequest,res:NextApiResponse)=> {
res.setHeader("Set-Cookie", "session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax");
return res.status(200).json({message:"all done"});
}
export default Logout;