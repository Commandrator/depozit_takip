import React from "react";
import { Tabs, Tab } from "@mui/material";
import { theme, langPack } from "../../index.jsx";
const SubMenu = (props) => {
  const {
    subTabIndex,
    handleSubChange,
    currentSubMenu
  } = props;
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      scrollButtons="auto"
      value={subTabIndex}
      onChange={handleSubChange}
      aria-label="Alt sekmeler"
      sx={{
        backgroundColor: theme.menu.backgroundColor,
        borderBottom: theme.border,
        "& .MuiTabs-flexContainer": {
          flexDirection: "column",
        },
        "& .MuiTab-root": {
          whiteSpace: "nowrap",
          alignItems: "flex-start",
          color: theme.text,
          justifyContent: "flex-start",
          minHeight: "auto",
          textAlign: "left",
          padding: "8px",
          opacity: 0.6,
          transition: "opacity 0.3s ease",
        },
        "& .MuiTab-root.Mui-selected": {
          color: theme.menuItem.color,
          opacity: 1,
        },
        "& .MuiTabs-indicator": {
          left: 0,
          right: "auto",
          backgroundColor: theme.menuItem.color,
          height: "2px",
        },
      }}
    >
      {currentSubMenu.map((item) => (
        <Tab
          key={item.id}
          label={langPack[item.label]}
          disableRipple
          icon={item.icon}
          iconPosition="start"
        />
      ))}
    </Tabs>
  );
};
export default SubMenu;