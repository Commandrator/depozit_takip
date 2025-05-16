import { useCallback, useState, useContext } from "react";
import DeliverDTO from "../interfaces/deliver.dto";
import returnSeverity from "./useAPI.ts";
import AppContext from "../context/index.tsx";
import { langPack } from "../index.jsx";
import { Delivers } from "../classes/delivers.ts";
interface UseDeliverProps {
  selectedCompanyId?: string;
}
const useDeliver = ({ selectedCompanyId }: UseDeliverProps) => {
  const { setOpen, setDetail, change, setChange } = useContext(AppContext);
  const [range, setRange] = useState<string>("10");
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [delivers, setDelivers] = useState<Delivers>();
  const [results, setResults] = useState<Delivers>();
  const [viewResult, setViewResult] = useState<boolean>(false);
  const listPeriods = useCallback(
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
      params.set("preview",String(true));
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
        setResults(new Delivers(data).getUnique());
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

  return { listPeriods, searchPreview };
};

export default useDeliver;
