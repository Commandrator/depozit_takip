import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import DrawerScrollableSideBar from "../components/SideBar/index.tsx";
import useApp from "../hooks/useApp.jsx";
const PrivateLayer: React.FC = () => {
  const { auth, navchildern } = useApp();
  if (auth)
    return (
      <>
        <DrawerScrollableSideBar childern={navchildern} />
        <Outlet />
      </>
    );
  else return <Navigate to="/auth/login" />;
};

export default PrivateLayer;
