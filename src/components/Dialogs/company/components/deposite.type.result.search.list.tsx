import { Divider, List, Typography, ListItem } from "@mui/material";
import React from "react";
import { langPack } from "../../../../index.jsx";
import SerachItem from "./deposite.type.result.search.list.item.tsx";
import ReactMarkdown from "react-markdown";
import { DepositeTypesDTO } from "../../../../interfaces/deposite.types.dto.ts";
const SearchResultList = ({
  results,
  value,
  submitSearch,
}: {
  results?: DepositeTypesDTO;
  value: string;
  submitSearch: (name?: string) => void;
}) => {
  if ((!results?.deposits || results.deposits.length === 0)) {
    return <Typography color="neutral">{langPack.no_results_found}</Typography>;
  }
  return (
    <List sx={{ padding: 0 }}>
      {results.deposits.map((deposit, index) => (
        <React.Fragment key={deposit.id}>
          <SerachItem
            result={deposit}
            value={value}
            submitSearch={submitSearch}
          />
          {index < results.deposits.length - 1 && <Divider />}
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
