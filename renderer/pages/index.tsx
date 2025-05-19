import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Header from "@/components/ui/header";
import InputComponent from "@/components/ui/InputComponent";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userContext } from "@/providers/HomeProvider";
import { Divide } from "lucide-react";
export default function index(){
  const context = useContext(userContext);
  if(!context) throw new Error("there is no context");
  const {json,setJson} = context;
  const [show,setShow] = useState(false);
  const router = useRouter();
     useEffect(()=> {
  async function setSessionFromCookie(){
    if(typeof(json) === undefined){
try{setShow(true)}
catch(err){console.error(`failed index.tsx due to ${err}`)}
finally{
  return null;
}
    };
      const res = await fetch("/api/validate",
          {
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              credentials: 'include'
          }
      );
      if(res.ok){
        try{
        const data = res.json();
        setJson(data);
        }
        catch(err){console.error(`failed due to ${err}`)}
        finally{
    router.push("/home")
        }
        
      }else{
        try{
          setShow(true);
        }
        catch(err){console.error({error:`failed due to ${err}`})}
        finally{
          return;
        }
      }
  }
  setSessionFromCookie();
      },[])
  return(
    <div className="bg-background">
{!show ? (null): (
  <>
  <Header></Header>
    <div className="w-[100vw] h-[90vh] flex items-center justify-center flex-row">

      <div className="w-full h-full flex justify-center items-center flex-col">
        
      <div className="text-3xl text-foreground m-2">TrnDesk</div>
      <div className="text-foreground m-2">Czyli twój niezasobożerny planer dnia z otwarto-źródłowym kodem.</div>
      <Link href="/sign"><InputComponent value="Zarejestruj się" /> </Link>
      <Link href="/log"><InputComponent value="Zaloguj się" /></Link>
      </div>
    </div>
    </>
  )}
   
    </div>
  )
}