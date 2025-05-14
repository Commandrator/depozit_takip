import React from "react";
import highlightSearchTerm from "../../../Filtres/charFinder.tsx";
import { ListItemButton, Typography } from "@mui/material";
import { SearchItemProps } from "../../../../interfaces/company.period.search.item.props.ts";
import { Search } from "@mui/icons-material";
const SerachItem = ({ period, value, submitSearch }: SearchItemProps) => {
  return (
    <ListItemButton onClick={() => submitSearch(period.name)}>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography key={period.id}>
            {highlightSearchTerm(period.name, value)}
          </Typography>
        </div>
      </div>
      <Search style={{ marginLeft: "auto" }} />
    </ListItemButton>
  );
};
export default SerachItem;
