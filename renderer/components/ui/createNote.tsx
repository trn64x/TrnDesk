"use client";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { userContext } from "@/providers/HomeProvider";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Save } from "lucide-react";
import "../../styles/globals.css";
const CreateNote = ()=>{
    const [message,setMessage] = useState<string>("");
    const context = useContext(userContext);
    const form = useForm({
        defaultValues: {
            userId: context?.json?.userid ?? "",
            title: "".toLowerCase(),
            note: "",
        }

    })
    const onSubmit = async (values:any)=>{
     const res = await fetch("api/notes/create", {
        method: "POST",
        headers:{
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(values)
     })
     if(res){
        const data = await res.json();
        setMessage(data.message);
     }

    }
return(
    <main className="w-full h-[100vh] flex flex-col justify-start items-center">
        <Form {...form}>
            <div className="text-2xl m-3 text-foreground font-light">Stwórz Notatkę</div>
        <form className="object-contain flex flex-col bg-secondary/70 rounded-lg  w-[50%] max-lg:w-[90%] py-5 justify-start items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex justify-center items-center flex-col">
            <div className="flex flex-row justify-center items-center pl-4 pb-4 w-full"><input className="p-2 border-b-[1px] border-primary/70 text-lg w-full" {...form.register("title")} placeholder="Dodaj Tytuł"></input><div className="flex justify-end px-5"><Button type="submit"><Save></Save></Button></div></div>
            <textarea className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-[95%] min-h-50 max-h-[50vh]  min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    
                  )} {...form.register("note")} placeholder="Dodaj notatke"/>
            
            </div>
            
            <div className="text-foreground/60">{message}</div>
        </form>
        </Form>
    </main>
);
}
export default CreateNote;