import { Tabs, Tab } from "@mui/material";
import { theme, langPack } from "../../index.jsx";
import { DialogWithTabsMenuProps } from "../../interfaces/dailog.with.tab.menu.item.dto.js";

const DialogWithTabsMenu = ({ mainTabIndex, handleMainChange, menuItem }:DialogWithTabsMenuProps) => {
  if (!menuItem?.subMenu || menuItem.subMenu.length === 0) return null;
  return (
    <Tabs
      value={mainTabIndex >= 0 ? mainTabIndex : 0}
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
          key={item.id}
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
