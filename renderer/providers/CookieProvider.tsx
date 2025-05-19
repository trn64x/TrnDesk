import React, { createContext, SetStateAction, useContext, useState } from "react";
type CookieContextType = {
  cookie?: string;
  setCookie: React.Dispatch<SetStateAction<string | undefined>>;
};
const CookieContext = createContext<CookieContextType | undefined>(undefined);
const CookieProvider = ({children}:{children:React.ReactNode}) => {
const [cookie,setCookie] = useState<string |undefined>(undefined);
return <CookieContext.Provider value={{cookie,setCookie}}>{children}</CookieContext.Provider>
}
function useCookie(){
    const CookieCtx = useContext(CookieContext);
    if(!CookieCtx) return;
    return CookieCtx;
}
export default useCookie;