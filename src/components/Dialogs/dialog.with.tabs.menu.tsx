import { Tabs, Tab } from "@mui/material";
import { theme, langPack } from "../../index.jsx";
import React,{ ReactElement } from "react";

interface SubMenuItem {
  id: string;
  label: string;
  action: string;
  icon?: ReactElement;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: ReactElement;
  hide?: boolean;
  subMenu: SubMenuItem[];
}
interface DialogWithTabsMenuProps {
  mainTabIndex: number;
  handleMainChange: (event: React.SyntheticEvent, newValue: number) => void;
  menuItem?: MenuItem;
}

const DialogWithTabsMenu = ({ mainTabIndex, handleMainChange, menuItem }:DialogWithTabsMenuProps) => {
  if (!menuItem) return null;
  return (
    <Tabs
      value={mainTabIndex}
      onChange={handleMainChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        backgroundColor: theme.menu.backgroundColor,
        "& .MuiTabs-indicator": {
          left: 0,
          backgroundColor: theme.menuItem.color,
          height: "2px",
        },
      }}
    >
      {menuItem.subMenu.map((item) => (
        <Tab
          label={langPack[item.label]}
          icon={item.icon}
          iconPosition="start"
          disableRipple
          sx={{
            minHeight: "28px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            whiteSpace: "nowrap",
            textTransform: "none",
            fontSize: "0.875rem",
            color: theme.text,
            opacity: 0.7,
            "&.Mui-selected": {
              color: theme.menuItem.color,
              opacity: 1,
            },
          }}
        />
      ))}
    </Tabs>
  );
};
export default DialogWithTabsMenu;
