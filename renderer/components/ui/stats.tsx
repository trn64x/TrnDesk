import { userContext } from "@/providers/HomeProvider";
import { useContext,useState } from "react";
import { useRouter } from "next/router";
import { index } from "drizzle-orm/gel-core";
const Stats = () => {

    const [stats,setStats] = useState<any[] | undefined>(undefined);
    const [userid,setuserid]= useState<any | undefined>(undefined);
    const [count,setCount] = useState<number>(0);
    const router = useRouter();
const context = useContext(userContext);
const user = context?.json.userid;
if(!user){
    router.push("/");
}
if(count !== 1){
    fetchStats(user);
    setCount(1)
}
async function fetchStats(userid:any){
   const fetchData = await fetch("/api/notes/stats",
    {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({userid})
    }

   );
   if(fetchData.ok){
    const data = await fetchData.json();
    setStats(data)
    return 0;
   }
}
return(
    <div className="flex justify-center items-center w-[100vw] max-h flex-col">
    <div className="m-2 text-lg">Your Overall Stats</div>
    <div className="w-[50%] flex items-center justify-center flex-row rounded-md h-60 bg-secondary/90">
{typeof(stats) !== "undefined" ?  <><div className="w-[49%] border-r-1 flex justify-center items-center border-r-primary/30 h-[90%]">created notes: {stats[0].f1}</div><div className="w-[49%] flex justify-center items-center h-[90%]">deleted notes: {stats[0].f2}</div></> : null}
    </div>
    </div>
);
}
export default Stats;