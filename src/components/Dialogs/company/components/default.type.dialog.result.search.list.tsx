import { Divider, List, Typography, ListItem } from "@mui/material";
import React from "react";
import { langPack } from "../../../../index.jsx";
import SearchItem from "./default.type.result.search.list.item.tsx";
import ReactMarkdown from "react-markdown";
import { DialogModuleSerachResultDTO } from "../../../../interfaces/dialog.result.dto.ts";
import { Modules } from "../../../../hooks/Modules/index.tsx";
const SearchResultList = <M extends keyof Modules>(
  props: DialogModuleSerachResultDTO<M>
) => {
  const { results, value, submitSearch,module } = props;
  if (!results?.results || results.results.length === 0) {
    return <Typography color="neutral">{langPack.no_results_found}</Typography>;
  }
  return (
    <List sx={{ padding: 0 }}>
      {results.results.map((result, index) => (
        <React.Fragment key={result.id}>
          <SearchItem
            result={result}
            value={value}
            submitSearch={submitSearch}
            module={module}
          />
          {index < results.results.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <Divider />
      <ListItem>
        <div className="items-start w-full">
          <Typography
            color="neutral"
            sx={{ textAlign: "right" }}
            component={ReactMarkdown}
          >
            {langPack.matching_result.replace(":total:", results.total)}
          </Typography>
        </div>
      </ListItem>
    </List>
  );
};
export default SearchResultList;
