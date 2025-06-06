import React from "react";
import { DeaultInterface } from "../../../../../interfaces/Default.pros.ts";
import { CustomerDTO } from "../../../../../interfaces/customers.dto.ts";
export const CustomerEdit: React.FC<DeaultInterface<CustomerDTO>> = ({
  result,
  module,
}): JSX.Element | null => {
  return <div>{JSON.stringify(result)}</div>;
};
export default CustomerEdit;
