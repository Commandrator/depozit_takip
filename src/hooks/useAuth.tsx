import { useCallback, useContext } from "react";
import AuthHook from "../interfaces/AuthHook";
import AppContext from "../context/index.tsx";
import returnSeverity from "./useAPI.ts";
// Hook fonksiyonu
const useAuth = (): AuthHook => {
  const { auth, setAuth, setOpen, setDetail } = useContext(AppContext);
  // Giriş fonksiyonu
  const login = async (userInfo: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    let result;
    if (emailRegex.test(userInfo)) {
      result = "email";
    } else if (usernameRegex.test(userInfo)) {
      result = "username";
    } else {
      result = "invalid";
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [result]: userInfo, password }),
        credentials: "include",
      });
      if (response.ok) {
        await get_about();
      } else {
        const message = await response.json();
        let severity = returnSeverity(response.status);
        setOpen(true);
        setDetail({ ...message, title: "İşlem başarısız", severity });
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  // Çıkış fonksiyonu
  const logout = async () => {
    try {
      if (auth) {
        const response = await fetch("http://localhost:3000/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) clearStorage();
        else {
          const message = await response.json();
          let severity = returnSeverity(response.status);
          setOpen(true);
          setDetail({ ...message, title: "İşlem başarısız", severity });
          clearStorage();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const get_about = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setAuth(result);
        localStorage.setItem("auth", JSON.stringify(result));
      } else {
        const message = await response.json();
        let severity = returnSeverity(response.status);
        setOpen(true);
        setDetail({ ...message, title: "İşlem başarısız", severity });
        clearStorage();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clearStorage = useCallback(() => {
    setAuth(undefined);
    localStorage.removeItem("auth");
  }, [setAuth]);
  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const result = await fetch(
        "http://localhost:3000/auth/validate-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!result.ok) {
        clearStorage();
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }, [clearStorage]);
  return { auth, login, logout, validateSession };
};

export default useAuth;
