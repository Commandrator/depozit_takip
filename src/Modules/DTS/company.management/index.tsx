import React, { useState, useEffect } from "react";
import useCompany from "../../../hooks/useCompany.tsx";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  Typography,
  Button,
  ListSubheader,
  Pagination,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import BusinessIcon from "@mui/icons-material/Business";
import CompanyCardProps from "../../../interfaces/CompanyCardProps.ts";
import useApp from "../../../hooks/useApp.jsx";
import CompanyDialog from "../../../components/Dialogs/index.tsx";
import { langPack, theme } from "../../../index.jsx";
import BasicSelect from "../../../components/BasicSelect.tsx";
const CompanyMangement = () => {
  const { CreatePortal } = useApp();
  const {
    company,
    range,
    setRange,
    handleDialogAction,
    handleDialogClose,
    dialogType,
    dialogOpen,
    selectedCompanyId,
    companys,
    listCompanys,
    change
  } = useCompany();
  console.log(companys)
  useEffect(() => {if (!companys) listCompanys()}, [companys, listCompanys]);
  useEffect(() => {if (change) listCompanys()}, [change, listCompanys]);
  if(companys) return (
    <div className="flex flex-col min-h-screen pt-32">
      <div className="flex-grow space-y-5">
        {
          companys.companies.map((company) => (
            <CompanyCard
              company={company}
              key={company.id}
              handleDialogAction={handleDialogAction}
            />
          ))}
        {
          CreatePortal(
            <CompanyDialog
              dialogOpen={dialogOpen}
              handleDialogAction={handleDialogClose}
              dialogType={dialogType}
              company={company}
              selectedCompanyId={selectedCompanyId}
            />
          )}
      </div>
      <div className="w-full flex justify-between items-center px-4 py-4">
        <div className="flex-1 flex justify-center">
          <Pagination
            count={companys.totla /Number(range)}
            size="small"
            sx={{
              color: theme.menuItem,
              "& .MuiPaginationItem-root": {
                color: theme.menuItem,
              },
              "& .Mui-selected": {
                color: theme.text,
                background: theme.menu.backgroundColor,
              },
            }}
          />
        </div>
        <div>
          <BasicSelect range={range} setRange={setRange} />
        </div>
      </div>
    </div>
  );
  else return null;
};
// MenuItem component
const MenuItemComponent: React.FC<{ item: any; handleAction: any }> = ({
  item,
  handleAction,
}) => (
  <MenuItem
    onClick={() => handleAction(item.action)}
    sx={{
      color: item.color ?? theme.menuItem,
    }}
  >
    <ListItemIcon sx={{ color: item.color ?? theme.menuItem }}>
      {item.icon}
    </ListItemIcon>
    <Typography variant="inherit">{item.label}</Typography>
  </MenuItem>
);

// SubMenu component
const SubMenu: React.FC<{ subMenu: any[]; handleAction: any }> = ({
  subMenu,
  handleAction,
}) => (
  <>
    {subMenu.map((item, index) => (
      <MenuItemComponent
        key={item.label}
        item={item}
        handleAction={handleAction}
      />
    ))}
  </>
);

// MenuGroup component
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
      {group.label}
    </ListSubheader>
    <SubMenu subMenu={group.subMenu} handleAction={handleAction} />
  </>
);

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
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
    handleDialogAction(type, company.id);
    handleMenuClose();
  };
  // Menü gruplarının ve alt gruplarının tanımlanması
  const menuItems = [
    {
      label: langPack.general_transactions,
      icon: <ManageHistoryIcon fontSize="small" />,
      subMenu: [
        {
          label: langPack.company_transactions,
          action: "company",
          icon: <BusinessIcon fontSize="small" />,
        },
        {
          label: langPack.period_transactions,
          action: "period",
          icon: <ManageHistoryIcon fontSize="small" />,
        },
        {
          label: langPack.personel_transactions,
          action: "personnel",
          icon: <PeopleIcon fontSize="small" />,
        },
        {
          label: langPack.merchant_transactions,
          action: "merchant",
          icon: <RecentActorsIcon fontSize="small" />,
        },
      ],
    },
  ];

  return (
    <div className="w-full p-4 backdrop-blur-sm shadow-xl bg-opacity-15 hover:bg-opacity-25 bg-white">
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
        <div>
          <h1 className="text-md font-semibold">{company.name}</h1>
          <hr className="my-1" />
          <p>{company.about}</p>
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
              {menuItems.map((group) => (
                <MenuGroup
                  key={group.label}
                  group={group}
                  handleAction={handleAction}
                />
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default CompanyMangement;
