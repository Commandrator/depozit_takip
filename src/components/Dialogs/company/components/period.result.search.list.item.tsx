import React from "react";
import { Button, Typography, ListItem } from "@mui/material";
import highlightSearchTerm from "../../../Filtres/charFinder.tsx";
import { langPack } from "../../../..";
import { SearchItemProps } from "../../../../interfaces/company.period.search.item.props.ts";
const SerachItem = ({
  period,
  value,
  setViewResult,
}: SearchItemProps) => {
  const handleAction = () => {
    setViewResult(false);
  };
  return (
    <ListItem>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography key={period.id}>
            {highlightSearchTerm(period.name, value)}
          </Typography>
          <Typography color="neutral">{period.creation_date}</Typography>
        </div>
        <Button variant="outlined" color="inherit" onClick={handleAction}>
          {langPack.view}
        </Button>
      </div>
    </ListItem>
  );
};
export default SerachItem;