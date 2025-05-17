import React from "react";
import highlightSearchTerm from "../../../Filtres/charFinder.tsx";
import { ListItemButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DialogDeliverSearchItemProps } from "../../../../interfaces/dialog.result.dto.ts";
const SerachItem: React.FC<DialogDeliverSearchItemProps> = ({
  deliver,
  value,
  submitSearch,
}): JSX.Element => {
  return (
    <ListItemButton onClick={() => submitSearch(deliver.employee)}>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography key={deliver.id}>
            {highlightSearchTerm(deliver.employee, value)}
          </Typography>
        </div>
      </div>
      <Search style={{ marginLeft: "auto" }} />
    </ListItemButton>
  );
};
export default SerachItem;
