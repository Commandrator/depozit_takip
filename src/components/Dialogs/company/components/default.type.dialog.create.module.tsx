import { Modules } from "../../../../hooks/Modules/index.tsx";
import DialogCreateDTO from "../../../../interfaces/dialog.create.dto";
import CreateCustomerType from "./customer type/customer.type.create.tsx";
import CreateCustomer from "./customer/customer.create.tsx";
import CreateDeliver from "./deliver/deliver.create.tsx";
import CreateDepositeType from "./deposite type/deposite.type.create.tsx";
import CreatePeriod from "./period/period.create.tsx";

const Create = <M extends keyof Modules>(props: DialogCreateDTO<M>) => {
  const { module, selectedCompanyId, setViewCreate } = props;
  switch (module) {
    case "personnel":
      return (
        <CreateDeliver
          module={module}
          selectedCompanyId={selectedCompanyId}
          setViewCreate={setViewCreate}
        />
      );
    case "deposite_type":
      return (
        <CreateDepositeType
          module={module}
          selectedCompanyId={selectedCompanyId}
          setViewCreate={setViewCreate}
        />
      );
    case "period":
      return (
        <CreatePeriod
          module={module}
          selectedCompanyId={selectedCompanyId}
          setViewCreate={setViewCreate}
        />
      );
    case "customer_type":
      return <CreateCustomerType
        module={module}
        selectedCompanyId={selectedCompanyId}
        setViewCreate={setViewCreate}
      />;
    case "customer":
      return <CreateCustomer
        module={module}
        selectedCompanyId={selectedCompanyId}
        setViewCreate={setViewCreate}
        />
    default:
      return null;
  }
};
export default Create;
