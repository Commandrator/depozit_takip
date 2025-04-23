import React, { useEffect, useState } from "react";
import useCompany from "../../../hooks/useCompany";
import CompaniesDTO from "../../../interfaces/User.Companies.dto";
import { Companies } from "../../../classes/copanies.ts";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  Typography,
  Button,
  ListSubheader,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import BusinessIcon from "@mui/icons-material/Business";
import CompanyCardProps from "../../../interfaces/CompanyCardProps.ts";
import useApp from "../../../hooks/useApp.jsx";
import CompanyDialog from "../../../components/Dialogs/index.tsx";
import { CompanyDTO } from "../../../interfaces/CompanyDTO.ts";
import { langPack, theme } from "../../../index.jsx";
const CompanyMangement = () => {
  const { CreatePortal } = useApp();
  const { listCompanys, getCompanyDetail, change, setChange } = useCompany();
  const [companys, setCompanys] = useState<CompaniesDTO | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [company, setCompany] = useState<CompanyDTO>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>("info");

  useEffect(() => {
    const loader = async () => {
      const data = await listCompanys();
      if (data) {
        setCompanys(new Companies(data));
      }
    };
    if (!companys) {
      loader();
    }
  }, [companys, listCompanys]);

  useEffect(() => {
    const loader = async () => {
      if (change) {
        const data = await listCompanys();
        if (data) {
          setCompanys(new Companies(data));
          setChange(false);
        }
      }
    };
    loader();
  }, [change, listCompanys, setChange]);
  const handleDialogAction = async (type: string, id: number) => {
    setDialogType(type);
    setCompany(await getCompanyDetail(id));
    setSelectedCompanyId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogType("info");
    setSelectedCompanyId(null);
  };
  return (
    <div className="relative flex flex-col min-h-full top-32">
      <div className="absolute top-0 left-0 w-full space-y-5">
        {companys &&
          companys.companies.map((company) => (
            <CompanyCard
              company={company}
              key={company.id}
              handleDialogAction={handleDialogAction}
            />
          ))}
        {company
          ? CreatePortal(
              <CompanyDialog
                dialogOpen={dialogOpen}
                handleDialogAction={handleDialogClose}
                dialogType={dialogType}
                company={company}
                selectedCompanyId={selectedCompanyId}
              />
            )
          : null}
      </div>
    </div>
  );
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
    <ListItemIcon
      sx={{ color: item.color ?? theme.menuItem }}
    >
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
    }
  ];

  return (
    <div className="w-full h-[100px] p-4 backdrop-blur-sm shadow-xl bg-opacity-15 hover:bg-opacity-25 bg-white">
      <h1>{company.name}</h1>
      <hr />
      <div className="flex items-center justify-between w-full">
        <p>{company.about}</p>
        <Button variant="outlined" color="inherit" sx={{mt:1}} onClick={handleMenuOpen}>
          {langPack.transactions}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              style: {
                backgroundColor: theme.menu.backgroundColor, // Tema durumuna göre renk seçimi
                borderRadius: "8px", // Köşe yuvarlaklık
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Gölgelendirme
              },
            },
          }}
        >
          <MenuList>
            {menuItems.map((group) => (
              <MenuGroup
                key={group.label} // Assuming 'label' is unique for each group
                group={group}
                handleAction={handleAction}
              />
            ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default CompanyMangement;
