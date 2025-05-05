import { useCallback, useContext, useState } from "react";
import AppContext from "../context/index.tsx";
import returnSeverity from "./useAPI.ts";
import CompaniesDTO from "../interfaces/User.Companies.dto";
import { CompanyDTO } from "../interfaces/CompanyDTO.ts";
import { Companies } from "../classes/copanies.ts";
import { Role, RoleEnum } from "../interfaces/role.type.ts";
const useCompany = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const {
    setOpen,
    setDetail,
    change,
    setChange,
    selectedOption,
    setSelectedOption,
  } = useContext(AppContext);
  const [companys, setCompanys] = useState<CompaniesDTO | null>(null);
  const [company, setCompany] = useState<CompanyDTO>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>("info");
  const [range, setRange] = useState<string>("10");
  const listCompanys = async (min?: number, max?: number) => {
    try {
      const params = new URLSearchParams();
      if (min) params.set("min", String(min));
      if (max) params.set("max", String(max));
      if (selectedOption !== "all") params.set("role", String(selectedOption));
      const response = await fetch(
        `http://localhost:3000/app/admin/company?${params}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setChange(false);
        setCompanys(new Companies(data));
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
  const handleDialogAction = async (type: string, id: number) => {
    setDialogType(type);
    setCompany(await getCompanyDetail(id));
    setSelectedCompanyId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogType("info");
    setSelectedCompanyId(null);
  };
  const handleChangeRole = (value: string) => {
    const validRoles: string[] = Object.values(RoleEnum); // Enum'un değerlerini bir diziye alıyoruz
    if (validRoles.includes(value)) {
      setSelectedOption(value as Role); // Geçerli role'ü setter'a gönderiyoruz
      // listCompanys()
      setChange(true);
    } else {
      console.log("Invalid role");
    }
  };
  return {
    listCompanys,
    getCompanyDetail,
    deleteCompany,
    updateCompany,
    createCompany,
    change,
    setChange,
    companys,
    setCompanys,
    selectedCompanyId,
    setSelectedCompanyId,
    company,
    setCompany,
    dialogOpen,
    setDialogOpen,
    dialogType,
    setDialogType,
    handleDialogClose,
    handleDialogAction,
    range,
    setRange,
    selectedOption,
    setSelectedOption,
    handleChangeRole,
  };
};
export { returnSeverity };
export default useCompany;
