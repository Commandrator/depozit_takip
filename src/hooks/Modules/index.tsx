import deposite_type from "./deposite.type.module.ts";
import period from "./preiod.module.ts";
import personnel from "./personnel.module.ts";
import customer_type from "./customer.type.module.ts";
import { langPack } from "../../index.jsx";
const modules = {
  deposite_type,
  period,
  personnel,
  customer_type
};
const useModule = (moduleName: keyof typeof modules) => {
  const selected = modules[moduleName];
  if (!selected) throw new Error(langPack.module_notfount.replace(":name:",moduleName));
  return selected;
}
export type Modules = typeof modules;
export default useModule;