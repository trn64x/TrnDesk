import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/ui/header";
export default function index(){
  return(
    <>

   <Header></Header>
    <div className="max-w h-[90vh] bg-background flex items-center justify-center flex-row">

      <div className="w-full h-full flex justify-center items-center flex-col">
        
      <div className="text-3xl m-2">TrnDesk</div>
      <div>Czyli twój niezasobożerny planer dnia z otwarto-źródłowym kodem.</div>
      <Link href="/sign"><Button className="w-40 m-2">Zarejestruj się</Button></Link>
      <Link href="/log"><Button className="w-40" m-2>Zaloguj się</Button></Link>
      </div>
      </div>
    </>
  )
}