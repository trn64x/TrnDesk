"use client";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { userContext } from "@/providers/HomeProvider";
import { useForm } from "react-hook-form";
const CreateNote = ()=>{
    const context = useContext(userContext);
    const form = useForm({
        defaultValues: {
            userId: context?.json?.userid ?? "",
            title: "",
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
        <form className=" flex flex-col bg-primary rounded-lg w-[30vw] p-5 justify-center items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="text-3xl m-5 font-bold">Stwórz Notatkę</div>
            <Input className="my-2 w-[75%] border-black" {...form.register("title")} placeholder="Dodaj Tytuł"></Input>
            <Input className="my-2 w-[75%] border-black" {...form.register("note")} placeholder="Dodaj notatke"/>
            <Input className="my-2 mb-5 w-[40%] bg-background border-none" type="submit" value="Stwórz"/>
        </form>
        </Form>
    </main>
);
}
export default CreateNote;