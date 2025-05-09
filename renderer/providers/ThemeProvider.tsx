'use client';

import { createContext } from "vm";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ReactNode} from 'react';
type Props = {
    children:React.ReactNode;
    attribute?:"class" | "data-theme";
}
const ThemeProvider = ({children,attribute = "class"}:Props)=> {
return(
    <NextThemesProvider
    attribute={attribute}
    defaultTheme="light"
    enableSystem={false}
    themes={["light","dark"]}
    >
        {children}
    </NextThemesProvider>
)
}
export default ThemeProvider;