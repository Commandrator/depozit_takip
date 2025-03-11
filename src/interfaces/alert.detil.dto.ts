import { AlertProps } from "@mui/material";
interface DetailDTO extends AlertProps{
    message: string;
    title:string;
}
export default DetailDTO;