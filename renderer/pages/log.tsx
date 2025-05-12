"use client";
import { Form } from "@/components/ui/form";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
const log = ()=>{
    const router = useRouter();
    const form = useForm({
        defaultValues:{
            email: "",
            password: "",
        }
    })
    const onSubmit = async(values:any)=> {
const req= await fetch("/api/notes/log-in", {
    method:"POST",
    headers:{"Content-Type": "application/JSON"},
    body: JSON.stringify(values),
    credentials: "include"
})
if(req.ok){
    router.push("/home")
}
    }
    return(
<>
<Header></Header>
<div className="h-[90vh] w-full flex items-center flex-col justify-center ">
            
        <div className="w-full flex items-center justify-center flex-col">
        <div className="text-3xl text-bold my-2">Zaloguj się</div>
    <Form {...form}>
    <form className="rounded-2xl bg-primary-foreground m-5 p-4 w-[30vw] flex justify-center flex-col" onSubmit={form.handleSubmit(onSubmit)}>
    <label className="text-foreground tracking-wide text-lg">Twój email</label>
            <Input className="my-5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Twój email" {...form.register("email")}/>
    <label className="text-foreground tracking-wide text-lg">Twoje hasło</label>
            <Input type="password" className="my-5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Twoje hasło" {...form.register("password")}/>
            <Input  className="bg-foreground text-primary/50 font-semibold mt-4 border-1  self-center rounded-full w-[50%] hover:bg-background hover:text-foreground" type="submit" value="Zaloguj się"></Input>
        </form>
    </Form>
    <a className="text-blue-500 cursor-pointer hover:underline " onClick={()=> router.push("/")}>Powrót do menu głównego</a>
</div>
</div>
</>
    );
}
export default log;