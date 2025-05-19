import depositeType from "./deposite.type.module.ts";
import { langPack } from "../../index.jsx";
const modules = {
  depositeType
};
const useModuleAdapter = (moduleName: keyof typeof modules) => {
  const selected = modules[moduleName];
  if (!selected) throw new Error(langPack.module_notfount.replace(":name:",moduleName));
  return selected;
}
export default useModuleAdapter;