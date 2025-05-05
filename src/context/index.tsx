import React from "react";
import AppContextType from "../interfaces/AppContextType.ts"; // ".ts" uzantısını kaldırabilirsin.
const AppContext = React.createContext<AppContextType>({
  depositList: [], // Dizi literal kullanımı doğru
  setDepositList: () => {}, // Başlangıçta boş fonksiyon
  auth: undefined, // Başlangıçta auth undefined
  setAuth: () => {}, // Başlangıçta boş fonksiyon
  setOpen: () => {}, // Başlangıçta boş fonksiyon
  setDetail: () => {}, // Başlangıçta boş fonksiyon
  change: false, // Başlangıçta false
  setChange: () => {}, // Başlangıçta boş fonksiyon
  selectedOption: "all",
  setSelectedOption: () => {}
});

export default AppContext;
