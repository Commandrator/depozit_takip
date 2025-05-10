import React, { useEffect } from "react";
import menuItems from "../Modules/DTS/company.management/items.tsx";
import useCompany from "./useCompany.tsx";
interface UseDialogProps {
  handleDialogClose: () => void;
  dialogType: string;
}
const useDialog = ({ handleDialogClose, dialogType }: UseDialogProps) => {
  const { setDialogType } = useCompany();
  const menuItem = menuItems.find((item) => {
    return (
      Array.isArray(item.subMenu) &&
      item.subMenu.some((subItem) => subItem.action === dialogType)
    );
  });
  const findIndex = (aciton: string) => {
    if (!menuItem) return undefined;
    return menuItem.subMenu?.findIndex((data) => data.action === aciton);
  };
  const [mainTabIndex, setMainTabIndex] = React.useState(
    findIndex(dialogType) ?? 0
  );
  useEffect(() => {
    if (menuItem) {
      const index = menuItem.subMenu.findIndex(
        (data) => data.action === dialogType
      );
      setMainTabIndex(index);
    }
  }, [dialogType, menuItem]);
  const handleMainChange = (_, newValue) => {
    setDialogType(menuItem?.subMenu[newValue].action ?? "info");
    setMainTabIndex(newValue);
  };
  const handleClose = () => {
    setMainTabIndex(0);
    handleDialogClose();
  };
  return {
    mainTabIndex,
    handleMainChange,
    menuItem,
    handleClose,
  };
};
export default useDialog;
