import { useContext } from "react";
import AppContext from "../context/index.tsx";
import returnSeverity from "./useAPI.ts"
const usePeriod = () => {
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
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
  const listPeriods = async (company_id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/app/admin/period/".concat(company_id),
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
        setDetail({ ...message, title: "İşlemi başarısız", severity });
      }
    } catch (error) {
      console.error("Network Error:", error);
      return null;
    }
  };
  return {
    createPeriod,
    listPeriods,
    change,
    setChange,
  };
};
export default usePeriod;
