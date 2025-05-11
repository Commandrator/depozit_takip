import React from "react";
import PeriodDTO from "./period.dto";
export default interface Period {
  period: PeriodDTO;
}
export interface SearchItemProps extends Period {
  value: string;
  setViewResult: React.Dispatch<React.SetStateAction<boolean>>;
}