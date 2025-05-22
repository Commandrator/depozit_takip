import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";
import CreateCompanyDialogContent from "../../../components/Dialogs/company/index.tsx";
import ManageCompanyContent from "../../../components/Dialogs/company/manage.tsx";
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import DefaultTypeDialog from "../../../components/Dialogs/company/components/default.type.dailog.module.tsx";
/**
 * ŞUNUDA OKU!!
 *
 * ŞİRKET İŞLEMLERİNİN AÇILMASI ŞİRKET ID'SİNE BAĞLI OLUCAK!!!
 *
 * BİDE DİALOG RENGİ HİÇ GÜZEL DEĞİL
 */
const menuItems = [
  {
    id: "menu-commercial_operations ",
    label: "commercial_operations",
    icon: <RecentActorsIcon fontSize="small" />,
    hide: false,
    subMenu: [
      {
        id: "submenu-deposito-transactions",
        label: "deposite_transactions",
        action: "deposite",
        icon: <CategoryIcon fontSize="small" />,
        content:null
      },  
      {
        id: "submenu-merchant-transactions",
        label: "customer_transactions",
        action: "customer",
        icon: <RecentActorsIcon fontSize="small" />,
        content:null
      },  
      
      {
        id: "submenu-customer-type-transactions",
        label: "customer_type_transactions",
        action: "customer_type",
        icon: <StorefrontIcon fontSize="small" />,
        content:DefaultTypeDialog
      },
      {
        id: "submenu-deposito-type-transactions",
        label: "deposite_type_transactions",
        action: "deposite_type",
        icon: <InventoryIcon fontSize="small" />,
        content:DefaultTypeDialog
      },
    ],
  },
  {
    id: "menu-company-transactions",
    label: "company_transactions",
    icon: <BusinessIcon fontSize="small" />,
    hide: false,
    subMenu: [
      {
        id: "submenu-personnel-transactions",
        label: "personel_transactions",
        action: "personnel",
        icon: <PeopleIcon fontSize="small" />,
        content:DefaultTypeDialog
      },
      {
        id: "submenu-period-transactions",
        label: "period_transactions",
        action: "period",
        icon: <ManageHistoryIcon fontSize="small" />,
        content: DefaultTypeDialog
      },
      {
        id: "submenu-company-about-transactions",
        label: "about",
        action: "company",
        icon: <InfoIcon fontSize="small" />,
        content:ManageCompanyContent
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
        content: CreateCompanyDialogContent,
      },
    ],
  },
];
export default menuItems;
