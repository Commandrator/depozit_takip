// Desc: Paths for the sidebar (navigation) of the application, like a SAP module.
// Date: 2025-03-10
// Author: Talha Yaşar
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessIcon from "@mui/icons-material/Business";
import React from "react";
import CompanyNav from "../navbars/navbar.company";
const paths = [
  {
    id: "0",
    label: "Materyal Yönetimi",
    children: [
      {
        id: "0",
        label: "Depozito Takip Modülü",
        children: [
          {
            id: "0",
            path: "/app/depozite",
            label: "Uygulamaya git",
            icon: <AppsIcon />,
          },
          {
            id: "1",
            label: "Şirket İşlemleri",
            children: [
              {
                id: "0",
                path: "/app/manage/company",
                label: "Şirketleri Yönet",
                icon: <BusinessIcon />
              },
              {
                id: "1",
                path: "/app/depozite",
                label: "Dönem İşlemleri",
                icon: <ManageHistoryIcon />,
              },
              {
                id: "3",
                path: "/app/depozite",
                label: "Personel İşlemleri",
                icon: <PeopleIcon />,
              },
              {
                id: "2",
                path: "/app/depozite",
                label: "Cari İşlemleri",
                icon: <RecentActorsIcon />,
              },
            ],
          },
          {
            id: "2",
            path: "/app/depozite",
            label: "Yapılan İşlemler",
            icon: <EventNoteIcon />,
          },
          {
            id: "3",
            path: "/app/",
            label: "Raporlama",
            icon: <AssessmentIcon />,
          },
          { id: "4", path: "/app/", label: "Depozito (Demo)" },
        ],
      },
    ],
  },
];
export default paths;