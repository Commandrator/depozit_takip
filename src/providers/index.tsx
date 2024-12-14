import { Outlet } from "react-router-dom"
import DrawerScrollableSideBar from "../components/SideBar"
import React, { useState } from "react"
import { Container } from "@mui/material"
import AppContext from "../conexts/index"
interface AppProviderProps{};
const AppProvider: React.FC<AppProviderProps> = () => {
    const [depositList, setDepositList]=useState([]);
    const [auth, setAuth]=useState(undefined);
    const value = {
        depositList,
        setDepositList,
        auth,
        setAuth
    }
    return(
        <AppContext.Provider value={value}>                
            <DrawerScrollableSideBar/>
            <Container maxWidth="md">
                <Outlet/>
            </Container>
        </AppContext.Provider>
    );
}; 
export {AppProvider};