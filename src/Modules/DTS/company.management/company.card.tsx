import React, { useState } from "react";
import { Menu, MenuList, Button } from "@mui/material";
import CompanyCardProps from "../../../interfaces/CompanyCardProps.ts";
import { langPack, theme } from "../../../index.jsx";
import menuItems from "./items.tsx";
import MenuGroup from "./company.card.group.tsx";
const CompanyCard: React.FC<CompanyCardProps> = ({
  result,
  handleDialogAction,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAction = (type: string) => {
    handleDialogAction(type, result.id);
    handleMenuClose();
  };
  return (
    <div className="w-full p-4 backdrop-blur-sm shadow-xl bg-opacity-15 hover:bg-opacity-25 bg-white">
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
        <div>
          <h1 className="text-md font-semibold">{result.name}</h1>
          <hr className="my-1" />
          <p>{result.about}</p>
        </div>
        <div>
          <Button variant="outlined" color="inherit" onClick={handleMenuOpen}>
            {langPack.transactions}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                style: {
                  backgroundColor: theme.menu.backgroundColor,
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                },
              },
            }}
          >
            <MenuList>
              {menuItems.map((group) => {
                if (group.hide) return null;
                return (
                  <MenuGroup
                    key={langPack[group.label]}
                    group={group}
                    handleAction={handleAction}
                  />
                );
              })}
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CompanyCard);
