import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";
/**
 * ŞUNUDA OKU!!
 *
 * ŞİRKET İŞLEMLERİNİN AÇILMASI ŞİRKET ID'SİNE BAĞLI OLUCAK!!!
 *
 * BİDE DİALOG RENGİ HİÇ GÜZEL DEĞİL
 */
const menuItems = [
  {
    id: "menu-company-transactions",
    label: "company_transactions",
    icon: <BusinessIcon fontSize="small" />,
    hide: false,
    subMenu: [
      {
        id: "submenu-merchant-transactions",
        label: "merchant_transactions",
        action: "merchant",
        icon: <RecentActorsIcon fontSize="small" />,
      },
      {
        id: "submenu-personnel-transactions",
        label: "personel_transactions",
        action: "personnel",
        icon: <PeopleIcon fontSize="small" />,
      },
      {
        id: "submenu-period-transactions",
        label: "period_transactions",
        action: "period",
        icon: <ManageHistoryIcon fontSize="small" />,
      },
      {
        id: "submenu-company-about-transactions",
        label: "about",
        action: "company",
        icon: <InfoIcon fontSize="small" />,
      },
    ],
  },
  {
    id: "menu-general-transactions",
    label: "general_transactions",
    icon: <TuneIcon fontSize="small" />,
    hide: true,
    subMenu: [
      {
        id: "submenu-create-company",
        label: "create_company",
        action: "create-company",
        icon: <AddBusinessIcon fontSize="small" />,
      },
    ],
  },
];
export default menuItems;
