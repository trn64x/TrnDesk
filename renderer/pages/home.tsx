"use client";
import { useRouter } from 'next/router';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import {useEffect,useContext,useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { BookUser, Brain, StickyNoteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlarmCheck, Settings } from 'lucide-react';
import Barbutton from '@/components/ui/barbutton';
import { useMode } from '@/providers/ActionProvider';
import CreateNote from '@/components/ui/createNote';
import UserDataProvider, { userContext } from '@/providers/HomeProvider';
import { Archive } from 'lucide-react';
import AllNote from '@/components/ui/allnotes';
import { useTheme } from 'next-themes';
const home = () => {
    const {theme,setTheme} = useTheme();
    const {mode,setMode} = useMode();
const [name,setName] = useState<string | undefined>();
const context = useContext(userContext);
if(!context){
    throw new Error("kys");
}
const {json,setJson} = context;
const router= useRouter();
useEffect(()=> {

    const userData = async () => {
    const res = await fetch("api/home");
if(res.ok){
    const data = await res.json();
    setJson(data);
}else{
router.push("/");
}
    }
    userData();
},[])
useEffect(() => {
    if (context?.json?.name) {
      setName(context.json.name);
    }
  }, [context?.json]);
return(
<>
<Sidebar className='border-r-1 border-r-gray-600'>
    <SidebarHeader className='flex flex-row justify-between items-center'>
        <div className='flex flex-row items-center mx-1'><img className='rounded-md  border-1 border-background w-10 h-auto object-contain' src="profile.png" alt="" /><div className='mx-2 tracking-wide font-extralight text-lg'>{name}</div></div> 
        <DropdownMenu>
  <DropdownMenuTrigger><Settings className='mr-2'/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Ustawienia</DropdownMenuItem>
    <DropdownMenuItem onClick={()=> setTheme(theme === "dark" ? "light" :"dark")}>Tło</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </SidebarHeader>
    <SidebarContent>
        <div className=" border-t-1 border-y-gray-700 text-lg pt-2 mx-1 px-2 tracking-widest text-sm text-grey-700 font-lighjt">Opcje</div>
        <SidebarGroup>
<Barbutton onClick={() => setMode('create')}> <StickyNoteIcon className="text-foreground mr-2 p-0.5" />Stwórz notatki</Barbutton>
<Barbutton onClick={() => setMode('edit')}><Archive className="text-foreground mr-2 p-0.5" />Wszystkie notatki</Barbutton>
<Barbutton><BookUser className="text-foreground mr-2 p-0.5" />Planer dnia</Barbutton>
<Barbutton><Brain className="text-foreground mr-2 p-0.5"/>Statystyki</Barbutton>
        </SidebarGroup>
    </SidebarContent>
    <SidebarFooter className='border-t-1 border-background m-2'><Button className='bg-background text-red-500 font-bold border-1 border-red-500 hover:bg-red-500 hover:border-foreground hover:text-background' onClick={()=> router.push("/")}>Wyloguj mnie</Button></SidebarFooter>
</Sidebar>
<SidebarTrigger/>
{mode === undefined && (<div className='w-full flex items-center justify-center max-h flex-col'><div className='text-2xl'>Welcome to TrnDesk, your free notes, and day plan maker</div><div className='text-base mt-2'>Click sidebar menu buttons to interact!</div></div>)}
{ mode === "create" && <CreateNote></CreateNote> }
{ mode === "edit" && <AllNote/>}
</>
)
}
export default home;