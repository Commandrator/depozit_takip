import { Modules } from "../../../../hooks/Modules/index.tsx";
import { DialogModuleResultDTO } from "../../../../interfaces/dialog.result.dto.ts";
import { Item as DepositeTypeItem } from "./deposite type/deposite.type.item.tsx";
import { PeriodItem } from "./period/period.item.tsx";
import Add from "./default.type.add.data.tsx";
import React from "react";
import DeliverItem from "./deliver/deliver.item.tsx";
import CustomerTypeItem from "./customer type/customer.type.item.tsx";
const ResultList = <M extends keyof Modules>(
  props: DialogModuleResultDTO<M>
) => {
  const { listedData, setViewCreate, module } = props;
  if (listedData.results.length === 0)
    return <Add setViewCreate={setViewCreate} />;
  /**
   * Modüle göre farklı sonuçlar listleme kısmı burada olacak.
   */
  switch (module) {
    case "customer_type":
      return listedData.results.map((result) => (
        <CustomerTypeItem key={result.id} result={result} module={module} />
      ));
    case "deposite_type":
      return listedData.results.map((result) => (
        <DepositeTypeItem key={result.id} result={result} module={module} />
      ));
    case "period":
      return listedData.results.map((result) => (
        <PeriodItem key={result.id} result={result} module={module} />
      ));
    case "personnel":
      return listedData.results.map((result) => (
        <DeliverItem key={result.id} result={result} module={module} />
      ));
    default:
      return null;
  }
};
export default React.memo(ResultList);
