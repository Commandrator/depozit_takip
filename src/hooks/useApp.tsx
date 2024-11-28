import { useContext, useCallback } from "react";
import { AppContext } from "../conexts/index.jsx";
import useDate from "./useDate.tsx";
const useApp = () => {
    const { depositList, setDepositList } = useContext(AppContext);
    const { addDaysToDate } = useDate();

    const getList = useCallback(() => {
        return depositList;
    }, [depositList]);  // `depositList` değiştiğinde yeniden çalışır

    const setList = useCallback(() => {
        const udt = [
            { date: addDaysToDate(new Date(), 30), complated: false },
            { date: addDaysToDate(new Date(), 0), complated: false },
            { date: addDaysToDate(new Date(), -1), complated: false },
            { date: addDaysToDate(new Date(), -30), complated: false },
            { date: addDaysToDate(new Date(), 1), complated: false }
        ];
        setDepositList(udt);
        //addDaysToDate, sabit verilerle çalışılmadığı için programın sürekli render edilmesinde sebep oluyor. Sabite veriyi simüle etmek için usecallback'e eklenmedi.
        // eslint-disable-next-line
    }, [setDepositList]);
    return {
        getList,
        setList
    };
};

export default useApp;
