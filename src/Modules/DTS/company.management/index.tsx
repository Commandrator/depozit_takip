import React, { useEffect, useState } from "react";
import useCompany from "../../../hooks/useCompany";
import CompaniesDTO from "../../../interfaces/User.Companies.dto";
import { Companies } from "../../../classes/copanies.ts";
import { ButtonGroup, IconButton } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import CompanyCardProps from "../../../interfaces/CompanyCardProps.ts";
import useApp from "../../../hooks/useApp.jsx";
import CompanyDialog from "../../../components/Dialogs/Company.dialog.tsx";
import CompanyNav from "../../../components/SideBar/navbars/navbar.company.tsx";

const CompanyMangement = () => {
  const { CreatePortal } = useApp();
  const { listCompanys, change, setChange } = useCompany();
  const [companys, setCompanys] = useState<CompaniesDTO>();
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>("info");
  const { navchildern, setNavchildern } = useApp();

  useEffect(() => {
    const loader = async () => {
      const data = await listCompanys();
      if (data) {
        setCompanys(new Companies(data));
        if (change) setChange(false); // Değişim durumunu false yapıyoruz
      }
      if (!navchildern) setNavchildern(CompanyNav);
    };
    loader();
  }, [listCompanys, change, setChange, navchildern, setNavchildern]);

  const handleDialogAction = (type, id) => {
    if (id) setSelectedCompanyId(id);
    if (type) setDialogType(type);
    setDialogOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-[90vh] mt-2">
      <div className="w-full space-y-5 z-0 pt-[120px]">
        {companys &&
          companys.companies.map((company) => (
            <CompanyCard
              company={company}
              key={company.id}
              handleDialogAction={handleDialogAction}
            />
          ))}
        {CreatePortal(
          <CompanyDialog
            dialogOpen={dialogOpen}
            handleDialogAction={() => setDialogOpen((prev) => !prev)}
            dialogType={dialogType}
            selectedCompanyId={selectedCompanyId}
          />
        )}
      </div>
    </div>
  );
};

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  handleDialogAction,
}) => {
  return (
    <div className="w-full h-[100px] p-4 backdrop-blur-sm shadow-xl bg-opacity-15 hover:bg-opacity-25 bg-white">
      <h1>{company.name}</h1>
      <hr />
      <div className="flex items-center justify-between w-full">
        <p>{company.about}</p>
        <ButtonGroup>
          <IconButton onClick={() => handleDialogAction("info", company.id)}>
            <Info sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={() => handleDialogAction("edit", company.id)}>
            <Edit sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={() => handleDialogAction("delete", company.id)}>
            <Delete sx={{ color: "white" }} />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CompanyMangement;
