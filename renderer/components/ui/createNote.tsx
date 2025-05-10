"use client";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { userContext } from "@/providers/HomeProvider";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
const CreateNote = ()=>{
    const context = useContext(userContext);
    const form = useForm({
        defaultValues: {
            userId: context?.json?.userid ?? "",
            title: "".toLowerCase(),
            note: "",
        }

    })
    const onSubmit = async (values:any)=>{
     await fetch("api/create", {
        method: "POST",
        headers:{
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(values)
     })

    }
return(
    <main className="w-full h-[100vh] flex justify-center items-center">
        <Form {...form}>
        <form className=" flex flex-col bg-sidebar rounded-lg w-[30vw] p-5 justify-center items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="text-2xl m-5 text-foreground font-light">Stwórz Notatkę</div>
            <Input className="my-2 w-[75%]" {...form.register("title")} placeholder="Dodaj Tytuł"></Input>
            <textarea className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-[75%] min-h-20  min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    
                  )} {...form.register("note")} placeholder="Dodaj notatke"/>
            <Input className="my-2 mb-5 w-[40%] bg-background border-none" type="submit" value="Stwórz"/>
        </form>
        </Form>
    </main>
);
}
export default CreateNote;