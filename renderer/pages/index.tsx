import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Header from "@/components/ui/header";
import InputComponent from "@/components/ui/InputComponent";
export default function index(){
  return(
    <div className="bg-background">

   <Header></Header>
    <div className="w-[100vw] h-[90vh] flex items-center justify-center flex-row">

      <div className="w-full h-full flex justify-center items-center flex-col">
        
      <div className="text-3xl text-foreground m-2">TrnDesk</div>
      <div className="text-foreground m-2">Czyli twój niezasobożerny planer dnia z otwarto-źródłowym kodem.</div>
      <Link href="/sign"><InputComponent value="Zarejestruj się" /> </Link>
      <Link href="/log"><InputComponent value="Zaloguj się" /></Link>
      </div>
    </div>
    </div>
  )
}