import { useCallback, useContext, useState } from "react";
import AppContext from "../context/index.tsx";

const useCompany = () => {
  const { setOpen, setDetail } = useContext(AppContext);
  const [change, setChange] = useState(false);

  const returnSeverity = (status) => {
    switch (status) {
      case 400:
        return "warning";
      case 500:
        return "error";
      default:
        return "error";
    }
  };

  const listCompanys = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/app/admin/company", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setChange(false); // Değişim durumunu false yapıyoruz
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
  }, [setOpen, setDetail]);

  const getCompanyDetail = useCallback(async (id) => {
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
        setChange(true);
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
  }, [setOpen, setDetail]);

  const deleteCompany = useCallback(async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/app/admin/company/".concat(id),
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
        setChange(true);
        title = "Silme işlemi başarılı";
      } else {
        severity = returnSeverity(response.status);
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
  }, [setOpen, setDetail]);

  const updateCompany = useCallback(async (id, data) => {
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
        setChange(true);
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
  }, [setOpen, setDetail]);

  return {
    listCompanys,
    getCompanyDetail,
    deleteCompany,
    updateCompany,
    change,
    setChange,
  };
};

export default useCompany;