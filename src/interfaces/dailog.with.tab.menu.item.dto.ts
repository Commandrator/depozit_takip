
import React,{ ReactElement } from "react";

export interface SubMenuItem {
  id: string;
  label: string;
  action: string;
  icon?: ReactElement;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactElement;
  hide?: boolean;  
  subMenu: SubMenuItem[];
}
export interface DialogWithTabsMenuProps {
  mainTabIndex: number;
  handleMainChange: (event: React.SyntheticEvent, newValue: number) => void;
  menuItem?: MenuItem;
}