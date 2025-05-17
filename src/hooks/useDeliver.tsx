import { useCallback, useState, useContext, useRef } from "react";
import returnSeverity from "./useAPI.ts";
import AppContext from "../context/index.tsx";
import { langPack } from "../index.jsx";
import { Delivers } from "../classes/delivers.ts";
import DeliverInput, {
  DeliverInputError,
} from "../classes/deliver.input.values.ts";
import { SelectChangeEvent } from "@mui/material";
interface UseDeliverProps {
  selectedCompanyId?: string;
}
const useDeliver = ({ selectedCompanyId }: UseDeliverProps = {}) => {
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
  const searchRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<string>("10");
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [delivers, setDelivers] = useState<Delivers>();
  const [results, setResults] = useState<Delivers>();
  const [viewResult, setViewResult] = useState<boolean>(false);
  const [viewCreate, setViewCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(true);
  const [deleteOption, setDeleteOption] = useState<string>();
  const [inputValue, setInputValue] = useState<DeliverInput>(
    new DeliverInput({ employee: "", mail: "", active: true })
  );
  const [errors, setErrors] = useState<DeliverInputError>(
    new DeliverInputError({ employee: "", mail: "" })
  );
  const list = useCallback(
    async (company_id, q?: string) => {
      const params = new URLSearchParams();
      const query = q ?? value;
      if (delivers) {
        const min = (page - 1) * Number(range);
        const max = page * Number(range);
        params.set("min", String(min));
        params.set("max", String(max));
        if (query) params.set("q", query);
      }
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/deliver/"
            .concat(company_id ?? "")
            .concat("/?")
            .concat(params.toString()),
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDelivers(new Delivers(data));
          setChange(false);
          setIsLoaded(true);
        } else {
          const message = await response.json();
          let severity = returnSeverity(response.status);
          setOpen(true);
          setDetail({ ...message, title: "İşlem başarısız", severity });
        }
      } catch (error) {
        console.error("Network Error:", error);
        return null;
      }
    },
    [setChange, setOpen, setDetail, page, range, delivers, value]
  );
  const searchPreview = async (query: string, company_id?: string) => {
    try {
      if (!company_id) throw new Error(langPack.company_id_is_required);
      const params = new URLSearchParams();
      params.set("min", String(0));
      params.set("max", String(5));
      params.set("q", query);
      params.set("preview", String(true));
      const response = await fetch(
        "http://localhost:3000/app/admin/deliver/"
          .concat(company_id)
          .concat("/?")
          .concat(params.toString()),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResults(new Delivers(data));
        setViewResult(true);
      } else {
        const message = await response.json();
        let severity = returnSeverity(response.status);
        setOpen(true);
        setDetail({ ...message, title: "İşlemi başarısız", severity });
      }
    } catch (error) {
      console.error("Network Error:", error);
      return null;
    }
  };
  const handleEdit = (value: string, dataKey: keyof DeliverInput) => {
    setEdit((prev) => !prev);
    if (!edit)
      setInputValue((prev) => {
        if (!prev) return prev;
        return { ...prev, [dataKey]: value } as DeliverInput;
      });
  };
  const isValidInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    errorKey: string
  ) => {
    const target = e.target as HTMLInputElement;
    const { type, value, checked } = target;
    const result = type === "checkbox" ? checked : value;
    setInputValue((prev) => new DeliverInput({ ...prev, [errorKey]: result }));
    setErrors(new DeliverInputError({ ...inputValue, [errorKey]: result }));
  };
  const create = async (company_id) => {
    try {
      const validationErrors = new DeliverInputError(inputValue);
      if (validationErrors.hasError()) {
        setErrors(validationErrors);
        return; // Hatalıysa form gönderimi durdurulur
      }
      const response = await fetch(
        "http://localhost:3000/app/admin/deliver/".concat(company_id),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(inputValue),
        }
      );

      let title = "";
      let severity = returnSeverity(response.status);
      let resData = await response.json();

      if (response.ok) {
        setChange(true); // Yeni teslim oluşturuldu
        title = "Oluşturma işlemi başarılı";
        setErrors(new DeliverInputError({ employee: "", mail: "" }));
      } else {
        title = "Oluşturma sırasında bir hata oluştu.";
      }

      setDetail({ title, severity, message: resData.message });
      setOpen(true);
    } catch (error) {
      setDetail({
        title: "İşlem başarısız",
        severity: "error",
        message: error.message,
      });
      setOpen(true);
    }
  };
  /**
   * AŞAĞIDAKİ FONKSİYONLAR DÖNEM FONKSİYONLARININ KLONLANMIŞ HALİDİR.
   * @param _event
   *
   * @param value
   */
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setChange(true);
  };
  const handleClear = () => {
    setViewResult(false);
    setChange(true);
    setValue("");
    setResults(undefined);
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
      setResults(undefined);
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
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setViewResult(false);
    } else setViewResult(true);
  };
  const handleDeleteInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDeleteOption(e.target.value);
  };
  const delete_deliver = useCallback(
    async (company_id: string, id: string) => {
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/deliver/"
            .concat(company_id)
            .concat("/")
            .concat(id),
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        let title = "";
        let severity = returnSeverity(response.status);
        let resData = await response.json();
        if (response.ok) {
          setChange(true); // Silme işlemi sonrası değişim
          title = "Silme işlemi başarılı";
        } else {
          title = "Silme esnasında bir hata oluştu.";
        }
        setDetail({ title, severity, message: resData.message });
        setOpen(true);
      } catch (error) {
        setDetail({
          title: "İşlemi başarısız",
          severity: "error",
          message: error.message,
        });
        setOpen(true);
      }
    },
    [setOpen, setDetail, setChange]
  );
  return {
    delete_deliver,
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
    delivers,
    setDelivers,
    isLoaded,
    setIsLoaded,
    value,
    setValue,
    page,
    setPage,
    range,
    setRange,
    change,
    inputValue,
    setInputValue,
    edit,
    setEdit,
    handleEdit,
    errors,
    setErrors,
    create,
    searchRef,
    handleClickOutside,
    deleteOption,
    setDeleteOption,
    handleDeleteInput,
  };
};
export default useDeliver;
