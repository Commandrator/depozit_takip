import React from "react";
import DetailDTO from "./alert.detil.dto";
interface AlertDTO{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;    
    detail: DetailDTO;
    setDetail : React.Dispatch<React.SetStateAction<DetailDTO>>;
}
export default AlertDTO;