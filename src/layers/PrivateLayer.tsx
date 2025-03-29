import { Navigate, Outlet, useMatches } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";
import DrawerScrollableSideBar from "../components/SideBar/index.tsx";
import useApp from "../hooks/useApp.jsx";

interface MatchHandle {
  handle?: {
    nav?: ReactNode;
  };
}

const PrivateLayer: React.FC = () => {
  const matches = useMatches() as MatchHandle[];
  const { auth } = useApp();
  const [nav, setNav] = useState<ReactNode | null>(null);
  useEffect(() => {
    const match = matches.find((match) => match.handle?.nav)?.handle?.nav || null;
    setNav(match);
  }, [matches]);
  if (!auth) return <Navigate to="/auth/login" />;
  return (
    <>
      <DrawerScrollableSideBar>{nav}</DrawerScrollableSideBar>
      <Outlet />
    </>
  );
};

export default PrivateLayer;
