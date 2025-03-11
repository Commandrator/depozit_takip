import React, { useMemo, useState, useEffect } from "react";
import AppContext from "../context/index.tsx";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserDTO from "../interfaces/UserDTO.ts";
import { GlobalAlert } from "../components/Alert/index.tsx";
import DetailDTO from "../interfaces/alert.detil.dto.ts";
import useApp from "../hooks/useApp.jsx";
const AppProvider: React.FC = () => {
  const {validateSession} = useApp();
  const [depositList, setDepositList] = useState<any[]>();
  const [auth, setAuth] = useState<UserDTO>();
  const [usable, setUsable] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<DetailDTO>();
  const [navchildern, setNavchildern] = useState<React.ReactNode | undefined>();
  useEffect(() => {
    const loadData = async () => {
      const verified = await validateSession();
      if (verified) {
        const authData = localStorage.getItem("auth");
        if (authData) {
          try {
            const parsedAuth = JSON.parse(authData);
            if (typeof parsedAuth === 'object' && parsedAuth !== null) {
              setAuth(parsedAuth);
            } else {
              throw new Error("Geçersiz auth verisi");
            }
          } catch (error) {
            console.error("JSON Parse Hatası:", error);
            localStorage.removeItem("auth");
          }
        }
      }
      setUsable(true);
    };
    loadData();
  }, [validateSession]);
  const value = useMemo(
    () => ({
      depositList,
      setDepositList,
      auth,
      setAuth,
      setOpen,
      setDetail,
      navchildern,
      setNavchildern
    }),
    [depositList, navchildern, setNavchildern, auth, setOpen, setDetail]
  );
  return (
    <AppContext.Provider value={value}>
      <GlobalAlert
        open={open}
        setOpen={setOpen}
        setDetail={setDetail}
        detail={detail}
      />
      <Container maxWidth="md">{usable ? <Outlet /> : null}</Container>
    </AppContext.Provider>
  );
};

export default AppProvider;
