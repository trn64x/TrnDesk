import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
export type userContextType = {
    json: any,
    setJson: Dispatch<SetStateAction<any>>
}
type UserData = {
    name: string;
    userid: string;
  };
export const userContext = createContext<userContextType | undefined>(undefined);
const UserDataProvider = ({children}:{children:React.ReactNode})=> {
    const [json,setJson] = useState<UserData | undefined>(undefined);
return <userContext.Provider value = {{json,setJson}}>{children}</userContext.Provider>

}
export default UserDataProvider;