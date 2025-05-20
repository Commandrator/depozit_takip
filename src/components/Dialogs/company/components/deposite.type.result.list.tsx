import { DepositeTypes } from "../../../../classes/deposite.types.ts";
import { Modules } from "../../../../hooks/Modules/index.tsx";
import Item from "./deposite.item.tsx";
import Add from "./period.add.tsx";
import React from "react";
const ResultList = React.memo(
  ({
    listedData,
    setViewCreate,
    module
  }: {
    listedData: DepositeTypes;
    setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
    module: keyof Modules
  }) => {
    if (listedData.deposits.length === 0)
      return <Add setViewCreate={setViewCreate} />;
    return listedData.deposits.map((deposite) => (
      <Item key={deposite.id} deposite={deposite} module={module} />
    ));
  }
);
export default ResultList;
