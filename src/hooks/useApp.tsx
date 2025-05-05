import { useContext, useCallback } from "react";
import AppContext from "../context/index.tsx";
import useDate from "./useDate.tsx";
import useAuth from "./useAuth.tsx";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
const useApp = () => {
  const navigate = useNavigate();
  const {
    depositList,
    setDepositList,
    dialogOpen,
    setDialogOpen,
    defaultNavActive,
    setDefaultNavActive,
  } = useContext(AppContext);
  const { addDaysToDate } = useDate();
  const getList = useCallback(() => {
    return depositList;
  }, [depositList]);
  const setList = useCallback(() => {
    const udt = [
      { date: addDaysToDate(new Date(), 30), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
      { date: addDaysToDate(new Date(), 0), complated: false },
      { date: addDaysToDate(new Date(), -1), complated: false },
      { date: addDaysToDate(new Date(), -30), complated: false },
      { date: addDaysToDate(new Date(), 1), complated: false },
    ];
    setDepositList(udt);
    //addDaysToDate, sabit verilerle çalışılmadığı için programın sürekli render edilmesinde sebep oluyor. Sabite veriyi simüle etmek için usecallback'e eklenmedi.
    // eslint-disable-next-line
  }, [setDepositList]);
  const portal = document.getElementById("portal");
  const CreatePortal = (Protal) =>
    portal ? createPortal(Protal, portal) : null;
  const handleOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const sidebarClose = (path: string | undefined) => {
    if (path) navigate(path);
    setDialogOpen(false);
  };
  return {
    ...useAuth(),
    getList,
    setList,
    navigate,
    CreatePortal,
    sidebarClose,
    handleOpen,
    handleClose,
    dialogOpen,
    defaultNavActive,
    setDefaultNavActive,
  };
};

export default useApp;
