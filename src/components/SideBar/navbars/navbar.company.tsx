import React, { 
  useState
} from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import CompanyFilter from "../../../components/Filtres/company.filter.tsx";
import CreateCompanyDialog from "../../Dialogs/Company.Create.Dialog.tsx";
import useApp from "../../../hooks/useApp.jsx";
import {langPack,theme} from "../../.."
/**
 * 
 * State kaynaklı bir hata alınıyor, sebenini henüz bulamadım. alternatif bulunmazsa 1. navbaradahil edilen kısımdaki 2. navbarla alakalı bir sorun olabilir.
 */
const CompanyNav = () => {
  const { CreatePortal } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false); // dialogOpen state'ini ekledik

  // Dialog'ı açma/kapama işlemi
  const handleDialogAction = () => {
    setDialogOpen((prev) => !prev); // dialogOpen değerini toggle ediyoruz
  };

  return (
    <div className="">
      <div className="w-full">
        <h1 className="text-xl font-semibold">{langPack.company_management}</h1>
        <hr />
        <div className="flex items-center justify-between p-2 rounded-md">
          <CompanyFilter className="h-7" />
          <IconButton 
          onClick={handleDialogAction}
          >
            <Add sx={{color:theme.menuItem.color}} />
          </IconButton>
        </div>
      </div>
      {dialogOpen && CreatePortal(
        <CreateCompanyDialog
          dialogOpen={dialogOpen}
          handleDialogAction={handleDialogAction}
        />
      )}
    </div>
  );
};

export default CompanyNav;
