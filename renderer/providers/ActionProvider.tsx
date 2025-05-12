'use client';
import { createContext, useState,useContext, SetStateAction } from "react";
type Mode = 'create' | 'edit' | 'menu' | 'stats' | "plan" | undefined;
type ModeContext = {
    mode: Mode,
    setMode: React.Dispatch<SetStateAction<Mode>>;
}
const ActionContext = createContext<ModeContext | undefined>(undefined);
export const ActionProvider = ({children}: {children: React.ReactNode}) =>{
const [mode,setMode] = useState<Mode>(undefined);
return <ActionContext.Provider value={{mode,setMode}}>
    {children}
</ActionContext.Provider>
};
export const useMode = (): ModeContext => {
    const context = useContext(ActionContext);
    if(!context){
        throw new Error('useMode failed.')
    }
    return context;
}

