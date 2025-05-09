"use client";
import {Input} from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Header from "@/components/ui/header";
const Sign = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password:""
        },
    });
    
    const onSubmit = async (values: any) => {
        const req = await fetch("/api/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if(req.ok){
            router.push("/log")
        }
      };
      
    return(
        <>
        <Header></Header>
        <div className="h-[90vh] w-full flex items-center flex-col justify-center ">
            
        <div className="w-full flex items-center justify-center flex-col">
        <div className="text-3xl text-bold my-2">Zarejestruj się</div>
<Form  {...form}>
<form className="rounded-2xl bg-primary-foreground text-foreground m-5 p-4 w-[30vw] flex justify-center flex-col" onSubmit={form.handleSubmit(onSubmit)}>
<label className="text-foreground tracking-wide text-lg">Twoja nazwa</label>
<div className="w-full my-5">
<Input className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"{...form.register("name")} placeholder="Twoja Nazwa"></Input>
<sub className="text-foreground">*nazwa ta potem będzie wyświetlana na twoim profilu</sub>
</div>
<label className="text-foreground tracking-wide text-lg">Twój email</label>
<Input  className="my-5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"{...form.register("email")} placeholder="Twój email"></Input>
<label className="text-foreground tracking-wide text-lg">Twoje hasło</label>
<Input type="password"  className="my-5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" {...form.register("password")} placeholder="Twoje hasło"></Input>
<Input  className="bg-foreground text-primary/50 font-semibold mt-4 border-1  self-center rounded-full w-[50%] hover:bg-background hover:text-foreground" type="submit" value="Zarejestruj się"></Input>
</form>
</Form>
<a className="text-blue-500 cursor-pointer hover:underline " onClick={()=> router.push("/")}>Powrót do menu głównego</a>
        </div>

</div>
</>
    )
}
export default Sign;