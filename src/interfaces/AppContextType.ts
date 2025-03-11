import React from "react";
import User from "./UserDTO";
import DetailDTO from "./alert.detil.dto";
interface AppContextType {
    depositList: any[] | undefined;
    setDepositList: React.Dispatch<React.SetStateAction<any[] | undefined>>;
    auth: User | undefined;
    setAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDetail: React.Dispatch<React.SetStateAction<DetailDTO | undefined>>;
    navchildern: React.ReactNode | undefined;
    setNavchildern: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>;
}
export default AppContextType;