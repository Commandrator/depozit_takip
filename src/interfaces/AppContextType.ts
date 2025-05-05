import React from "react";
import User from "./UserDTO";
import DetailDTO from "./alert.detil.dto";
import Role from "./role.type";
interface AppContextType {
    depositList: any[] | undefined;
    setDepositList: React.Dispatch<React.SetStateAction<any[] | undefined>>;
    auth: User | undefined;
    change: boolean;
    setAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;    
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    setDetail: React.Dispatch<React.SetStateAction<DetailDTO | undefined>>;    
    selectedOption: Role;
    setSelectedOption: React.Dispatch<React.SetStateAction<Role>>;

}
export default AppContextType;