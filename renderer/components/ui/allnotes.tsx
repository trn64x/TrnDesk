import { userContext } from "@/providers/HomeProvider";
import {Form} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import { useContext, useEffect, useState } from "react";
import { Brush, Paintbrush, Paintbrush2, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
const AllNote = ()=> {
    const [EditingID,setEditingID] = useState(null);
    const context = useContext(userContext);
    const [notes,setNote] = useState<any[]>([]);
    const [Loading,setLoading] = useState<boolean>(false);
    const [editable,setEditable] = useState<boolean>(false);
    type FormValues = {
        userid: any,
        Title: string,
        Content: string,
        id: any
    }
    const form = useForm<FormValues>({
        
        defaultValues:{
            userid: context?.json.userid,
        }
    })
    useEffect(()=> {
        const FindNotes = async ()=> {

            if(!context) return;
            const res = await fetch("api/notes/select",{
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
async function onDelete(noteId:any) {
    try{
setLoading(true);
    
    const response = await fetch("api/notes/delete",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({noteId: noteId, userId: context?.json.userid})
        }
    )
    if(response.ok){
        const data = await response.json();
        
        setNote(data);
    }
}
catch(err){console.error(err)} 
finally{
setLoading(false)
}
}
async function SearchNotes(values:any){
        setTimeout(async ()=>
            {
                const res= await fetch("api/notes/search",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(values)
                    }
                )
                if(res.ok) {
                    const data = await res.json();
                    setNote(data);
                }}
            ,500)
}
useEffect(() => {
    console.log("Aktualny stan notes:", notes); // To będzie logować po zaktualizowaniu stanu
}, [notes]);
const renderWithLineBreaks = (text?:string): React.ReactNode => {
    if(!text){
        return [];
    }
    text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
}
async function onEdit(values:any){
    const res = await fetch("api/notes/edit",
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        }
    )
    if(res.ok){
        const data = await res.json();
        setNote(data);
        setEditingID(null);
        form.reset();
    }
}

return(
    <main className="w-full flex items-center flex-col h-[100vh] overflow-auto">
<div className="py-4 font-bold text-3xl">Wszystkie Notatki</div>
<div className="w-[80%] flex items-center flex-col">

            <div className="px-4 w-[50%] rounded-lg bg-secondary/70"><Input className="my-4 border-1 border-background w-full" onChange={(e)=> SearchNotes(e.target.value)} placeholder="Wpisz tytuł poszukiwanej notatki..."></Input></div>
<div className="my-5 w-[80%]">{notes.length === 0  ? (<p>Brak notatek</p>): (
    !Loading ? notes.map((note,index)=> (
<div className="bg-secondary/70 m-5 p-5 min-h-50 rounded-lg w-full">
<div className="my-1 flex flex-row text-lg font-light items-center">
</div>
{EditingID !== note.id ? ( <div className="flex flex-col">   <div className="flex flex-row items-center"><div className="font-light">Tytuł:</div>
    <div className="flex h-full items-center font-light justify-between font-light text-lg w-full p-2 rounded-md ">{note.Title} <div><button onClick={()=> setEditingID(note.id)}><Brush className="p-0.5 text-foreground"/></button> 
    <button onClick={()=> onDelete(note.id)}><Trash className="text-red-800 p-0.5"></Trash></button></div></div> </div>
<div className="my-1 flex flex-col"><div className={cn(
                    "text-wrap file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-sidebar/70 border-input w-full min-h-25  min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    
                  )} key={index}>  <pre className="break-words text-wrap text-foreground/70">{note.Content || "Brak zawartości"}</pre>
</div></div></div>) : 
(
     <Form {...form}> 
     <form className="flex flex-col" onSubmit={form.handleSubmit(onEdit)}>
        <Input
        type="hidden"
  {...form.register("id")}
  defaultValue={note.id}
   disabled></Input>
   <div className="flex flex-row">
    <div className="font-light">Tytuł:</div>
    <div className="flex font-light justify-between font-light text-lg w-full p-2 rounded-md "><Input {...form.register("Title")}
  defaultValue={note.Title} placeholder="wpisz nowy tytuł"></Input> </div>
    </div>
    <div className="my-1 flex flex-col"><div className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-sidebar/70 border-input w-full min-h-40  min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    
                  )} key={index}>  <pre className="text-foreground/70 text-wrap"><textarea {...form.register("Content")}
  defaultValue={note.Content} className="w-full min-h-50" placeholder="wpisz nowy opis"></textarea></pre></div></div>
                  <Input type='submit' value="edytuj"></Input>
                  </form></Form>

)
}
<div className="w-full flex justify-end text-sm text-ring">{note.createdAt.slice(0,10)} {note.createdAt.slice(11,16)}</div>
</div>
    )) : <p>Loading...</p>
)}
</div>
</div>
</main>
);
}
export default AllNote;