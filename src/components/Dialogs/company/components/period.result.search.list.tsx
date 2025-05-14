import { Divider, List, Typography, ListItem } from "@mui/material";
import React from "react";
import PeriodsDTO from "../../../../interfaces/periods.dto";
import { langPack } from "../../../..";
import SerachItem from "./period.result.search.list.item.tsx";
import ReactMarkdown from "react-markdown";
const SearchResultList = ({
  results,
  value,
  submitSearch,
}: {
  results?: PeriodsDTO;
  value: string;
  submitSearch: (name?: string) => void;
}) => {
  if (!results?.periods || results.periods.length === 0) {
    return <Typography color="neutral">{langPack.no_results_found}</Typography>;
  }
  return (
    <List sx={{ padding: 0 }}>
      {results.periods.map((period, index) => (
        <React.Fragment key={period.id}>
          <SerachItem
            period={period}
            value={value}
            submitSearch={submitSearch}
          />
          {index < results.periods.length - 1 && <Divider />}
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
            {langPack.matching_periods_result.replace(":total:", results.total)}
          </Typography>
        </div>
      </ListItem>
    </List>
  );
};
export default SearchResultList;
