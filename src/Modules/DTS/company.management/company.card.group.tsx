import React from "react";
import { ListSubheader } from "@mui/material";
import { theme, langPack } from "../../../index.jsx";
import SubMenu from "./company.card.submenu.tsx";
const MenuGroup: React.FC<{
  group: any;
  handleAction: any;
}> = ({ group, handleAction }) => (
  <>
    <ListSubheader
      sx={{
        backgroundColor: "transparent", // Arka planı transparan yapıyoruz
        color: theme.menuItem, // Tema moduna göre yazı rengi
      }}
    >
      {langPack[group.label]}
    </ListSubheader>
    <SubMenu subMenu={group.subMenu} handleAction={handleAction} />
  </>
);

export default MenuGroup;
