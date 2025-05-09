import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/ui/header";
export default function index(){
  return(
    <div className="bg-background">

   <Header></Header>
    <div className="max-w h-[90vh] flex items-center justify-center flex-row">

      <div className="w-full h-full flex justify-center items-center flex-col">
        
      <div className="text-3xl text-foreground m-2">TrnDesk</div>
      <div className="text-foreground m-2 ">Czyli twój niezasobożerny planer dnia z otwarto-źródłowym kodem.</div>
      <Link href="/sign"><Button className="w-40 m-2 bg-primary text-primary-foreground">Zarejestruj się</Button></Link>
      <Link href="/log"><Button className="w-40 bg-primary text-primary-foreground">Zaloguj się</Button></Link>
      </div>
      </div>
    </div>
  )
}