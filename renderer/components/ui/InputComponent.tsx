import { Input } from "./input"

const InputComponent = ({value}:any)=>{
    return(
        <Input  className="bg-foreground text-primary/50 font-semibold w-50 mt-4 border-1  self-center rounded-full hover:bg-background hover:text-foreground" value={value} type="submit"/>
    )
}
export default InputComponent