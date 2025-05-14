import { Typography, ListItemButton } from "@mui/material";
import highlightSearchTerm from "../../Filtres/charFinder.tsx";
import { type SearchItemProps } from "../../../interfaces/CompanyCardProps.ts";
import { Search } from "@mui/icons-material";
const SerachItem = ({ company, value, submitSearch }: SearchItemProps) => {
  return (
    <ListItemButton onClick={() => submitSearch(company.name)}>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography key={company.id}>
            {highlightSearchTerm(company.name, value)}
          </Typography>
          <Typography color="neutral">{company.about}</Typography>
        </div>
      </div>
      <Search style={{ marginLeft: "auto" }} />
    </ListItemButton>
  );
};
export default SerachItem;
