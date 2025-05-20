import deposite_type from "./deposite.type.module.ts";
import { langPack } from "../../index.jsx";
const modules = {
  deposite_type
};
const useModule = (moduleName: keyof typeof modules) => {
  const selected = modules[moduleName];
  if (!selected) throw new Error(langPack.module_notfount.replace(":name:",moduleName));
  return selected;
}
export type Modules = typeof modules;
export default useModule;