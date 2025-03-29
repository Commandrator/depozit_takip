import AppsIcon from "@mui/icons-material/Apps";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessIcon from "@mui/icons-material/Business";
import React from "react";
const paths = [
    {
        id: "0",
        path: "/app/depozite",
        label: "Uygulamaya git",
        icon: <AppsIcon />,
      },
      {
        id: "1",
        path: "/app/manage/company",
        label: "Şirketleri Yönet",
        icon: <BusinessIcon />,
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
];
export default paths;