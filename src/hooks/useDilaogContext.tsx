import { useCallback, useState, useContext, useRef } from "react";
import { langPack } from "../index.jsx";
import {
  Method,
  getOperationMessagesByStatus,
  StatusToSeverity,
} from "./useAPI.ts";
import AppContext from "../context/index.tsx";
import { SelectChangeEvent } from "@mui/material";
import useModule, { type Modules } from "./Modules/index.tsx";
interface UseProps<M extends keyof Modules> {
  module: M;
  selectedCompanyId: string;
  defVal?: Modules[M]["InputAdapter"][keyof Modules[M]["InputAdapter"]];
  defKey?: string;
}
/**
 * # useDialogContext
 * ---
 * Dialog modülleirndeki CURD işlemleri ve genel fonksion yapıları için
 * kullandım. Hook gelen modül bilgisine göre şekillenir.
 * Bunu yapmamın amacı benzer işlemleri yapan modülleri merkezi olarak
 * yönetmek istemem.
 */
const useDialogContext = <M extends keyof Modules>(props: UseProps<M>) => {
  const { module, defKey, defVal, selectedCompanyId } = props;
  const { InputAdapter, InputErrorAdapter, DataAdapter, Entity, api } =
    useModule(module);
  type InputErrorInstance = InstanceType<typeof InputErrorAdapter>;
  type InputInstance = InstanceType<typeof InputAdapter>;
  type DataInstance = InstanceType<typeof DataAdapter>;
  const initialData = defKey && defVal ? { [defKey]: defVal } : {};
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
  const searchRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<string>("10");
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [listedData, setListedData] = useState<Record<string, DataInstance>>(
    {}
  );
  const [results, setResults] = useState<Record<string, DataInstance>>({});
  const [viewResult, setViewResult] = useState<boolean>(false);
  const [viewCreate, setViewCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(true);
  const [deleteOption, setDeleteOption] = useState<string>();
  const [inputValue, setInputValue] = useState<InputInstance>(
    new InputAdapter(initialData)
  );
  const [errors, setErrors] = useState<InputErrorInstance>(
    new InputErrorAdapter(initialData)
  );
  const OperationMessagesByStatus = getOperationMessagesByStatus(langPack);
  const list = useCallback(
    async (company_id: string | number, q?: string) => {
      const params = new URLSearchParams();
      const query = q ?? value;
      if (listedData) {
        const min = (page - 1) * Number(range);
        const max = page * Number(range);
        params.set("min", String(min));
        params.set("max", String(max));
        if (query) params.set("q", query);
      }
      try {
        if (!api) return;
        const method: Method = "GET";
        const url = new URL(String(company_id), api);
        url.search = params.toString();
        const response = await fetch(url.toString(), {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const result = await response.json();
        if (response.ok) {
          setListedData((prev) => ({
            ...prev,
            [module]: new DataAdapter(result),
          }));
          setChange(false);
          setIsLoaded(true);
          return;
        }
        const detail = {
          message: result.message,
          severity: StatusToSeverity[response.status],
          title: OperationMessagesByStatus[method][response.status],
        };
        setOpen(true);
        setDetail(detail);
      } catch (error) {
        console.error("Network Error:", error);
      }
    },
    [
      setChange,
      setOpen,
      setDetail,
      page,
      range,
      listedData,
      value,
      api,
      DataAdapter,
      OperationMessagesByStatus,
      module,
    ]
  );
  const searchPreview = async (query: string, company_id: string | number) => {
    try {
      if (!api) return;
      const params = new URLSearchParams({
        min: "0",
        max: "5",
        q: query,
        preview: "true",
      });
      const method: Method = "GET";
      const url = new URL(String(company_id), api);
      url.search = params.toString();
      const response = await fetch(url.toString(), {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setResults((prev) => ({
          ...prev,
          [module]: new DataAdapter(result),
        }));
        setViewResult(true);
        return;
      }
      const detail = {
        message: result.message,
        severity: StatusToSeverity[response.status],
        title: OperationMessagesByStatus[method][response.status],
      };
      setOpen(true);
      setDetail(detail);
    } catch (error) {
      console.error("Network Error:", error);
    }
  };
  const delete_data = useCallback(
    async (
      company_id: string,
      id: string,
      e?: React.FormEvent<HTMLFormElement>
    ) => {
      e?.preventDefault();
      if (!api) return;
      try {
        const method = "DELETE";
        const url = new URL(`${company_id}/${id}`, api);
        const response = await fetch(url.toString(), {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const result = await response.json();
        const success = response.ok;
        if (success) setChange(true);
        const detail = {
          title: OperationMessagesByStatus[method][response.status],
          severity: StatusToSeverity[response.status],
          message: result.message,
        };
        setDetail(detail);
        setOpen(true);
      } catch (error) {
        setDetail({
          title: "İşlem başarısız",
          severity: "error",
          message: (error as Error).message,
        });
        setOpen(true);
      }
    },
    [setOpen, setDetail, setChange, api, OperationMessagesByStatus]
  );
  const update = async (company_id: string, id: string, data: any) => {
    if (!api) return;
    try {
      const method = "PUT";
      const url = new URL(`${company_id}/${id}`, api);
      const response = await fetch(url.toString(), {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(new Entity(data)),
      });
      const result = await response.json();
      const success = response.ok;
      const detail = {
        title: OperationMessagesByStatus[method][response.status],
        severity: StatusToSeverity[response.status],
        message: result.message,
      };
      if (success) {
        setChange(true);
        setEdit((prev) => !prev);
      }
      setDetail(detail);
      setOpen(true);
    } catch (error) {
      setDetail({
        title: "İşlem başarısız",
        severity: "error",
        message: (error as Error).message,
      });
      setOpen(true);
    }
  };

  const create = async (company_id: string) => {
    if (!api) return;
    const validationErrors = new InputErrorAdapter(inputValue);
    if (validationErrors.hasError()) {
      setErrors(validationErrors);
      return;
    }
    try {
      console.log(inputValue)
      const method: Method = "POST";
      const url = new URL(company_id, api);
      const response = await fetch(url.toString(), {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(inputValue),
      });
      const result = await response.json();
      const success = response.ok;
      if (success) {
        setChange(true);
        setErrors(new InputErrorAdapter({}));
      }
      setDetail({
        title: OperationMessagesByStatus[method][response.status],
        severity: StatusToSeverity[response.status],
        message: result.message,
      });
      setOpen(true);
    } catch (error) {
      setDetail({
        title: "İşlem başarısız",
        severity: "error",
        message: (error as Error).message,
      });
      setOpen(true);
    }
  };
  const isValidInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    errorKey: string
  ) => {
    const target = e.target as HTMLInputElement;
    const { type, value, checked } = target;
    const result = type === "checkbox" ? checked : value;
    setInputValue((prev) => new InputAdapter({ ...prev, [errorKey]: result }));
    setErrors(new InputErrorAdapter({ ...inputValue, [errorKey]: result }));
  };
  const handleEdit = () => {
    setEdit((prev) => !prev);
    if (!edit) {
      setInputValue(new InputAdapter(initialData));
      setErrors(new InputErrorAdapter(initialData));
    }
  };
  const handleChange = (_, value: number) => {
    setPage(value);
    setChange(true);
  };
  const handleClear = () => {
    setViewResult(false);
    setChange(true);
    setValue("");
    setResults({});
    setPage(1);
    list(selectedCompanyId);
  };
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setValue(keyword);
    if (keyword.length > 1) {
      await searchPreview(keyword, selectedCompanyId);
    } else {
      setViewResult(false);
      setResults({});
    }
  };
  const submitSearch = (name?: string) => {
    if (name) setValue(name);
    setViewResult(false);
    setIsLoaded(false);
    setPage(1);
    list(selectedCompanyId, name);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch();
  };
  const handleChangeRange = (event: SelectChangeEvent) => {
    setPage(1);
    setRange(event.target.value);
    setChange(true);
  };
  const handleClickOutside = (event) => {
    setViewResult(searchRef.current?.contains(event.target) ?? false);
  };
  const handleDeleteInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDeleteOption(e.target.value);
  return {
    delete_data,
    handleChangeRange,
    handleChange,
    handleClear,
    handleSearch,
    handleSubmit,
    isValidInput,
    submitSearch,
    list,
    searchPreview,
    viewCreate,
    setViewCreate,
    viewResult,
    setViewResult,
    results,
    setResults,
    listedData,
    setListedData,
    isLoaded,
    setIsLoaded,
    value,
    setValue,
    page,
    setPage,
    range,
    setRange,
    change,
    inputValue:
      inputValue as Modules[M]["InputAdapter"][keyof Modules[M]["InputAdapter"]],
    setInputValue,
    edit,
    setEdit,
    handleEdit,
    errors:
      errors as Modules[M]["InputErrorAdapter"][keyof Modules[M]["InputErrorAdapter"]],
    setErrors,
    create,
    searchRef,
    handleClickOutside,
    deleteOption,
    setDeleteOption,
    handleDeleteInput,
    update,
  };
};
export default useDialogContext;