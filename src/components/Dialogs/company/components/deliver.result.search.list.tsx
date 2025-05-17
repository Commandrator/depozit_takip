import { Divider, List, Typography, ListItem } from "@mui/material";
import React from "react";
import { langPack } from "../../../../index.jsx";
import ReactMarkdown from "react-markdown";
import { DialogDeliverSearchResultDTO } from "../../../../interfaces/dialog.result.dto.ts";
import SerachItem from "./deliver.result.search.list.item.tsx";
const SearchResultList = ({
  results,
  value,
  submitSearch,
}: DialogDeliverSearchResultDTO): JSX.Element => {
  if (!results?.delivers || results.delivers.length === 0) {
    return <Typography color="neutral">{langPack.no_results_found}</Typography>;
  }
  return (
    <List sx={{ padding: 0 }}>
      {results.delivers.map((deliver, index) => (
        <React.Fragment key={deliver.id}>
          <SerachItem
            deliver={deliver}
            value={value}
            submitSearch={submitSearch}
          />
          {index < results.delivers.length - 1 && <Divider />}
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
