import PeriodsDTO from "../../../../interfaces/periods.dto";
import PeriodItem from "./period.item.tsx";
import Add from "./period.add.tsx";
import React from "react";
const ResultList = React.memo(
  ({
    periods,
    setViewCreate,
  }: {
    periods: PeriodsDTO;
    setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    if (periods.periods.length === 0)
      return <Add setViewCreate={setViewCreate} />;
    return periods.periods.map((period) => (
      <PeriodItem key={period.id} period={period} />
    ));
  }
);
export default ResultList;
