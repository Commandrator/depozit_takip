import React from "react"
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import BusinessIcon from "@mui/icons-material/Business";
const menuItems = [
  {
    label: "general_transactions",
    icon: <ManageHistoryIcon fontSize="small" />,
    subMenu: [
      {
        label: "company_transactions",
        action: "company",
        icon: <BusinessIcon fontSize="small" />,
      },
      {
        label: "period_transactions",
        action: "period",
        icon: <ManageHistoryIcon fontSize="small" />,
      },
      {
        label: "personel_transactions",
        action: "personnel",
        icon: <PeopleIcon fontSize="small" />,
      },
      {
        label: "merchant_transactions",
        action: "merchant",
        icon: <RecentActorsIcon fontSize="small" />,
      },
    ],
  },
];
export default menuItems;
