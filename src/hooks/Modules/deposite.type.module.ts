import { DepositeTypes as DataAdapter } from "../../classes/deposite.types.ts";
import { DepositeTypeInputtError as InputErrorAdapter, DepositeTypeInput as InputAdapter } from "../../classes/deposite.input.values.ts";
const api = process.env.REACT_APP_API_URL?.concat("/app/admin/deposite/type/");
const depositeType = { DataAdapter, InputErrorAdapter, InputAdapter, api };
export default depositeType;