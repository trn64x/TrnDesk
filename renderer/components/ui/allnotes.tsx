import { userContext } from "@/providers/HomeProvider";
import { useContext, useEffect, useState } from "react";

const AllNote = ()=> {
    const context = useContext(userContext);
    const [notes,setNote] = useState<any[]>([]);
    useEffect(()=> {
        const FindNotes = async ()=> {
            if(!context) return;
            const res = await fetch("api/select",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ userId: context.json.userid })
            }
            );
            if(res.ok){
                const data = await res.json();
                setNote(data);
            }
            }
            FindNotes();
            
    },[context?.json?.userid]);

return(
    <main className="w-full h-[100vh]">
<div className="text-2xl">Wszystkie Notatki</div>
<div>
{notes.length === 0 ? (<p>Brak notatek</p>): (
    notes.map((note,index)=> (
<div className="bg-neutral-900 m-5 p-5 min-h-50 max-w">
<div className="font-bold text-xl w-full p-2 rounded-md bg-background">{note.Title}</div>
<div className="font-bold min-h-30 text-base font-light my-2 w-full p-2 rounded-md bg-background" key={index}>{note.Content}</div>
</div>
    ))
)}
</div>
</main>
);
}
export default AllNote;