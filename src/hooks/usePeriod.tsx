import { useContext, useState, useCallback, useRef } from "react";
import AppContext from "../context/index.tsx";
import returnSeverity from "./useAPI.ts";
import { langPack } from "../index.jsx";
import type PeriodHookDTO from "../interfaces/period.dialog.hook.dto.ts";
import Periods from "../classes/Periods.ts";
import type PeriodsDTO from "../interfaces/periods.dto.ts";
import { type SelectChangeEvent } from "@mui/material/Select";
import PeriodInput, {
  PeriodInputError,
} from "../classes/period.input.value.ts";
const usePeriod = ({
  selectedCompanyId,
  defKey,
  defValue,
}: PeriodHookDTO = {}) => {
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [periods, setPeriods] = useState<PeriodsDTO>();
  const [range, setRange] = useState<string>("10");
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<PeriodsDTO>();
  const [viewResult, setViewResult] = useState<boolean>(false);
  const [viewCreate, setViewCreate] = useState<boolean>(false);
  const [deleteOption, setDeleteOption] = useState<string>();
  const [edit, setEdit] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<PeriodInput>(
    new PeriodInput(defKey && defValue ? { [defKey]: defValue } : {})
  );
  const [errors, setErrors] = useState<PeriodInputError>(
    new PeriodInputError(defKey && defValue ? { [defKey]: defValue } : {})
  );
  const create = async (company_id) => {
    try {
      const validationErrors = new PeriodInputError(inputValue);
      if (validationErrors.hasError()) {
        setErrors(validationErrors);
        return;
      }
      const response = await fetch(
        "http://localhost:3000/app/admin/period/".concat(company_id),
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
        setChange(true);
        title = "Oluşturma işlemi başarılı";
        setErrors(new PeriodInputError({}));
      } else {
        title = "Oluşturma sırasında bir hata oluştu.";
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
  };
  const listPeriods = useCallback(
    async (company_id, q?: string) => {
      const params = new URLSearchParams();
      const query = q ?? value;
      if (periods) {
        const min = (page - 1) * Number(range);
        const max = page * Number(range);
        params.set("min", String(min));
        params.set("max", String(max));
        if (query) params.set("q", query);
      }
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/period/"
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
          setPeriods(new Periods(data));
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
    [setChange, setOpen, setDetail, page, range, periods, value]
  );
  const searchPreview = async (query: string, company_id?: string) => {
    try {
      if (!company_id) throw new Error(langPack.company_id_is_required);
      const params = new URLSearchParams();
      params.set("min", String(0));
      params.set("max", String(5));
      params.set("q", query);
      const response = await fetch(
        "http://localhost:3000/app/admin/period/"
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
        setResults(new Periods(data).getUniquePeriods());
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
  const updatePeriod = async (company_id, id, data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/app/admin/period/"
          .concat(company_id)
          .concat("/")
          .concat(id),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      let title = "";
      let severity = returnSeverity(response.status);
      let resData = await response.json();
      if (response.ok) {
        setChange(true);
        setEdit((prev) => !prev);
        title = "Güncelleme işlemi başarılı";
      } else {
        severity = returnSeverity(response.status);
        title = "Güncelleme sırasında bir hata oluştu.";
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
  };
  /**
   * # isValidInput
   * ---
   * İnput değerine göre işlem yapmak için kullanılacaktır.
   * @param e
   * @param errorKey
   */
  const isValidInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    errorKey: string
  ) => {
    const target = e.target as HTMLInputElement;
    const { type, value, checked } = target;
    const result = type === "checkbox" ? checked : value;
    setInputValue((prev) => new PeriodInput({ ...prev, [errorKey]: result }));
    setErrors(new PeriodInputError({ ...inputValue, [errorKey]: result }));
  };
  const handleEdit = () => {
    setEdit((prev) => !prev);
    if (!edit)
      setInputValue(
        new PeriodInput(defKey && defValue ? { [defKey]: defValue } : {})
      );
  };
  const handleChangeRange = (event: SelectChangeEvent) => {
    setPage(1);
    setRange(event.target.value);
    setChange(true);
  };
  const getDay = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  };
  const delete_period = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      company_id: string,
      id: string
    ) => {
      e.preventDefault();
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/period/"
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
  const handleDeleteInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDeleteOption(e.target.value);
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
    listPeriods(selectedCompanyId);
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
    listPeriods(selectedCompanyId, name);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch();
  };
  const handleClickOutside = (event) =>
    setViewResult(
      Boolean(searchRef.current && !searchRef.current.contains(event.target))
    );
  const searchRef = useRef<HTMLDivElement>(null);
  return {
    handleSubmit,
    handleSearch,
    handleClear,
    create,
    listPeriods,
    change,
    setChange,
    isValidInput,
    periods,
    setPeriods,
    viewCreate,
    setViewCreate,
    setInputValue,
    errors,
    inputValue,
    setErrors,
    edit,
    setEdit,
    getDay,
    updatePeriod,
    handleEdit,
    delete_period,
    deleteOption,
    handleDeleteInput,
    isLoaded,
    setRange,
    handleChangeRange,
    handleChange,
    page,
    setPage,
    range,
    searchPreview,
    viewResult,
    results,
    value,
    searchRef,
    handleClickOutside,
    setViewResult,
    submitSearch,
  };
};
export default usePeriod;
