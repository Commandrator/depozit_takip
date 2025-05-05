import React from "react";
import MenuItemComponent from "./company.card.submenu.item.tsx";
const SubMenu: React.FC<{ subMenu: any[]; handleAction: any }> = ({
  subMenu,
  handleAction,
}) => (
  <>
    {subMenu.map((item) => (
      <MenuItemComponent
        key={item.label}
        item={item}
        handleAction={handleAction}
      />
    ))}
  </>
);

export default SubMenu;
