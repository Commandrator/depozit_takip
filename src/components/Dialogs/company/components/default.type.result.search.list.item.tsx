import React from "react";
import highlightSearchTerm from "../../../Filtres/charFinder.tsx";
import { ListItemButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DialogModuleSearchItemProps } from "../../../../interfaces/dialog.result.dto.ts";
import { Modules } from "../../../../hooks/Modules/index.tsx";
const SearchItem = <M extends keyof Modules>(
  props: DialogModuleSearchItemProps<M>
): JSX.Element => {
  const { result, value, submitSearch, module } = props;
  const fieldValue = getSearchField(result, module);
  return (
    <ListItemButton onClick={() => submitSearch(fieldValue)}>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start w-full">
        <div>
          <Typography>{highlightSearchTerm(fieldValue, value)}</Typography>
        </div>
      </div>
      <Search style={{ marginLeft: "auto" }} />
    </ListItemButton>
  );
};
type ExtractEntity<M extends keyof Modules> = InstanceType<Modules[M]["Entity"]>;
function getSearchField<M extends keyof Modules>(result: ExtractEntity<M>, module: M): string {
  if (module === "personnel") {
    return (result as any).employee;
  }
  return (result as any).name;
}

export default SearchItem;
