import { useCallback, useContext } from "react";
import AppContext from "../context/index.tsx";
import returnSeverity from "./useAPI.ts"
const useCompany = () => {
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
  const listCompanys = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/app/admin/company", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setChange(false); // Veri başarıyla alındı, değişim durumunu sıfırla
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
  }, [setOpen, setDetail, setChange]);
  const getCompanyDetail = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/company/".concat(id),
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setChange(true); // Yeni veri geldiği için true yapıyoruz
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
    },
    [setOpen, setDetail, setChange]
  );

  const deleteCompany = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/app/admin/company/${id}`,
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

  const updateCompany = useCallback(
    async (id, data) => {
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/company/".concat(id),
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
          setChange(true); // Güncelleme işlemi sonrası değişim
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
    },
    [setOpen, setDetail, setChange]
  );

  const createCompany = useCallback(
    async (data) => {
      try {
        const response = await fetch(
          "http://localhost:3000/app/admin/company/",
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
    },
    [setOpen, setDetail, setChange]
  );

  return {
    listCompanys,
    getCompanyDetail,
    deleteCompany,
    updateCompany,
    createCompany,
    change,
    setChange
  };
};
export {returnSeverity}
export default useCompany;
