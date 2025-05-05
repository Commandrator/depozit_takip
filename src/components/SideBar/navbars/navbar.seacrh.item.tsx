import React from "react";
import { Button, Typography, ListItem } from "@mui/material";
import highlightSearchTerm from "../../Filtres/charFinder.tsx";
import { langPack } from "../../../index.jsx";
import {SearchItemProps} from "../../../interfaces/CompanyCardProps.ts";
const SerachItem = ({
  company,
  value,
  handleDialogAction,
  setViewResult
}: SearchItemProps) => {
  
  const handleAction = () => {
    handleDialogAction("company",company.id);
    setViewResult(false);
  }
  return (
    <ListItem>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography key={company.id}>
            {highlightSearchTerm(company.name, value)}
          </Typography>
          <Typography color="neutral">{company.about}</Typography>
        </div>
        <Button variant="outlined" color="inherit" onClick={handleAction}>
              {langPack.view}
        </Button>
      </div>
    </ListItem>
  );
};
export default SerachItem;
