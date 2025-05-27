import React from "react";
import SerachItem from "./navbar.seacrh.item.tsx";
import { type SearchResultProps } from "../../../interfaces/CompanyCardProps";
import { langPack } from "../../..";
import { Divider, List, Typography, ListItem } from "@mui/material";
import ReactMarkdown from "react-markdown";

const CompanySearchList: React.FC<SearchResultProps> = ({
  results,
  value,
  submitSearch,
}) => {
  if (!results?.results && results?.results.length === 0) {
    return <Typography color="neutral">{langPack.no_results_found}</Typography>;
  }
  return (
    <List sx={{ padding: 0 }}>
      {results?.results?.map((result, index) => (
        <React.Fragment key={result.id}>
          <SerachItem
            results={result}
            value={value}
            submitSearch={submitSearch}
          />
          {index < results.results.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <ListItem>
        <div className="items-start w-full">
          <Typography
            color="neutral"
            sx={{ textAlign: "right" }}
            component={ReactMarkdown}
          >
            {langPack.matching_result.replace(
              ":total:",
              results?.total
            )}
          </Typography>
        </div>
      </ListItem>
    </List>
  );
};
export default CompanySearchList;
