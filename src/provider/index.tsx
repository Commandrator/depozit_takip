import React, { useMemo, useState, useEffect } from "react";
import AppContext from "../context/index.tsx";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserDTO from "../interfaces/UserDTO.ts";
import { GlobalAlert } from "../components/Alert/index.tsx";
import { CompanyDTO } from "../interfaces/CompanyDTO.ts";
import DetailDTO from "../interfaces/alert.detil.dto.ts";
import useApp from "../hooks/useApp.tsx";
import Role from "../interfaces/role.type.ts";
const AppProvider: React.FC = () => {
  const { validateSession } = useApp();
  const [depositList, setDepositList] = useState<any[]>();
  const [auth, setAuth] = useState<UserDTO>();
  const [usable, setUsable] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<DetailDTO>();
  const [change, setChange] = useState(false);
  const [defaultNavActive, setDefaultNavActive] = useState<boolean>(true);
  const [openNavbarDialog, setOpenNavbarDialog] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Role>("all"); //Role Option
  const [selectedCompanyId, setSelectedCompanyId] = useState<number|null>(null);
  const [company, setCompany] = useState<CompanyDTO>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>("info");
  useEffect(() => {
    const loadData = async () => {
      const verified = await validateSession();
      if (verified) {
        const authData = localStorage.getItem("auth");
        if (authData) {
          try {
            const parsedAuth = JSON.parse(authData);
            if (typeof parsedAuth === "object" && parsedAuth !== null) {
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
      change,
      setChange,
      selectedOption,
      setSelectedOption,
      dialogOpen,
      setDialogOpen,
      defaultNavActive,
      setDefaultNavActive,
      dialogType,
      setDialogType,
      company,
      setCompany,
      selectedCompanyId,
      setSelectedCompanyId,
      openNavbarDialog,
      setOpenNavbarDialog
    }),
    [
      depositList,
      auth,
      setOpen,
      setDetail,
      change,
      setChange,
      selectedOption,
      setSelectedOption,
      dialogOpen,
      setDialogOpen,
      defaultNavActive,
      setDefaultNavActive,
      dialogType,
      setDialogType,
      company,
      setCompany,
      selectedCompanyId,
      setSelectedCompanyId,      
      openNavbarDialog,
      setOpenNavbarDialog
    ]
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
