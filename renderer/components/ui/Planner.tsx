import { useEffect, useState } from "react";

const Planner = ()=> {
    const DateNow = new Date(Date.now());
    const [week,setWeek] = useState<string[][]>([]);
    function mapData(){
        const newWeek = [];
        for(let i = 0; i <7;i++){
    let date = new Date(DateNow)
    date.setDate(DateNow.getDate() + i);
    newWeek.push([date.toLocaleDateString("en-ca")]);
}
        setWeek(newWeek);
    }
    useEffect(()=>{
        mapData();
    },[])
return(
    <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw]">
    <div>Welcome in Planner Section</div>
    <div>
        <table className="w-full p-2 h-full">
            <tr className="w-full">
            {week.map((notes,values)=> {
                return <td key={values} className="border-1 p-2 border-white">{notes.toString()}</td>
            } )}
            </tr>
        </table>
    </div>
    </div>
)
}
export default Planner;