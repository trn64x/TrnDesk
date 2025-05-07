import Link from "next/link";
import { Button } from "./button";

const Header = ()=> {

return(
    <header className="max-w h-[10vh] bg-background text-background flex flex-row justify-between items-center">
        <div className="m-5 text-white font-bold text-2xl tracking-widest">TrnDesk</div>
    </header>
);
}
export default Header;