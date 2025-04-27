import { useContext, useEffect, useState, useCallback } from "react";
import AppContext from "../context/index.tsx";
import returnSeverity from "./useAPI.ts";
import { langPack } from "../index.jsx";
import PeriodDTO from "../interfaces/period.dto.ts";
import Period from "../classes/Period.ts";
import PeriodInputDTO from "../interfaces/period.dialog.input.dto.ts";
import PeriodHookDTO from "../interfaces/period.dialog.hook.dto.ts";
const usePeriod = ({ selectedCompanyId }: PeriodHookDTO = {}) => {
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
  const [isLoaded, setIsLoaded]=useState<boolean>(false);
  const [periods, setPeriods] = useState<PeriodDTO[] | undefined>();
  const [viewCreate, setViewCreate] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const [deleteOption, setDeleteOption] = useState<string>();
  const [inputValue, setInputValue] = useState<PeriodInputDTO>({
    deadline: new Date(new Date().setFullYear(nextYear))
      .toISOString()
      .split("T")[0],
    name: `${currentYear} - ${nextYear} ${langPack.working_period}`,
  });
  const [errors, setErrors] = useState<{
    deadline?: string;
    name?: string;
  }>({});
  const [edit, setEdit] = useState<boolean>(true);
  const checkEmpty = () => {
    let newErrors: Partial<PeriodInputDTO> = {};
    if (!inputValue.name.trim())
      newErrors.name = langPack.company_name_cannot_be_blank;
    if (!inputValue.deadline.trim())
      newErrors.deadline = langPack.company_name_cannot_be_blank;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };
  const createPeriod = async (company_id, data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/app/admin/period/".concat(company_id),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      let title = "";
      let severity = returnSeverity(response.status);
      let resData = await response.json();
      if (response.ok) {
        setChange(true); // Yeni şirket oluşturulduğu için değişim
        title = "Oluşturma işlemi başarılı";
      } else {
        severity = returnSeverity(response.status);
        title = "Oluşturma sırasında bir hata oluştu.";
      }
      setDetail({ title, severity, message: resData.message });
      setErrors({});
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
    async (company_id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/app/admin/period/${company_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChange(true); // Veri başarıyla alındı, değişim durumunu sıfırla
          return data;
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
    [setChange, setOpen, setDetail]
  );
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
  const isValidCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: any) => void,
    errorKey: string,
    message: string,
    regex: RegExp // düzeltildi: string değil RegExp
  ) => {
    const value = e.target.value;
    const isValid = regex.test(value);
    setValue({ [errorKey]: value });
    setErrors((prev) => ({
      ...prev,
      [errorKey]: isValid ? "" : message,
    }));
  };
  const handleEdit = (value, dataKey) => {
    setEdit((prev) => !prev);
    if (!edit)
      setInputValue((prev) => ({ ...prev, [dataKey]: value[dataKey] }));
  };
  useEffect(() => {
    const loader = async () => {
      if (change) {
        const rawPeriods = await listPeriods(selectedCompanyId);
        if (rawPeriods) {
          const formattedPeriods = rawPeriods.map(
            (p: PeriodDTO) => new Period(p)
          );
          setIsLoaded(true);
          setPeriods(formattedPeriods);
          setChange(false);
        }
      }
    };
    if (selectedCompanyId) loader();
  }, [listPeriods, setPeriods, setChange, setIsLoaded, change, selectedCompanyId]);
  const getDay = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  };
  const deletePeriod = useCallback(
    async (company_id, id) => {
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
  const handleDeleteInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeleteOption(e.target.value)
  }
  return {
    createPeriod,
    listPeriods,
    change,
    setChange,
    isValidCompanyName,
    periods,
    setPeriods,
    viewCreate,
    setViewCreate,
    setInputValue,
    errors,
    inputValue,
    setErrors,
    checkEmpty,
    edit,
    setEdit,
    getDay,
    updatePeriod,
    handleEdit,
    deletePeriod,
    deleteOption,
    handleDeleteInput,
    isLoaded
  };
};
export default usePeriod;
