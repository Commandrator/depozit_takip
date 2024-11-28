import { Outlet } from "react-router-dom"
import DrawerScrollableSideBar from "../components/SideBar/inex"
import { createContext, useState } from "react"
import { Container } from "@mui/material";
export const AppContext = createContext(undefined);
const App = () => {
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
export default App;