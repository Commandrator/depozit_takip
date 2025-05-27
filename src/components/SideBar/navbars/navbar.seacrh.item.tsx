import { Typography, ListItemButton } from "@mui/material";
import highlightSearchTerm, {isExistTerm} from "../../Filtres/charFinder.tsx";
import { type SearchItemProps } from "../../../interfaces/CompanyCardProps.ts";
import { Search } from "@mui/icons-material";
const SerachItem = ({ results, value, submitSearch }: SearchItemProps) => {
  return (
    <ListItemButton onClick={() => submitSearch(results.name)}>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography key={results.id}>
            {highlightSearchTerm(results.name, value)}
          </Typography>
          <Typography color="neutral">
            {isExistTerm(results.about, value) ? highlightSearchTerm(results.about, value) : null}
          </Typography>
        </div>
      </div>
      <Search style={{ marginLeft: "auto" }} />
    </ListItemButton>
  );
};
export default SerachItem;
