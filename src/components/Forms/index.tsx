import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.tsx";
import useApp from "../../hooks/useApp.jsx";
const LoginForm = () => {
  const { login } = useAuth();
  const [userInfo, setUserInfo] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userInfo, password);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="min-w-[300px] min-h-[400px]">
        <h1 className="text-3xl text-center mb-10">Giriş Sayfası</h1>
        <h2 className="text-2xl">Kullanıcı Girişi</h2>
        <hr />
        <input
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
          type="text"
          className="mt-5 w-full rounded-lg h-[40px] text-xl p-2 text-black"
          placeholder="Kullanıcı adı veya e-posta adresi"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 w-full rounded-lg h-[40px] text-xl p-2 text-black"
          placeholder="Parola"
        />
        <div className={`flex  items-center justify-center`}>
          <button className="bg-white text-xl text-black w-[150px] h-[40px] mt-[40px] rounded-full">
            İleri
          </button>
        </div>
      </form>
    </div>
  );
};
const LoginWithSavedAccounts = ({ auth, setNextProcess }) => {
  const { logout } = useAuth();
  const { navigate } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/app/depozite"); // Kullanıcıyı uygulamaya yönlendir
  };

  const handleExit = async () => {
    try {
      await logout(); // Oturumdan çıkış
      setNextProcess(false); // Bir sonraki sürece dön
    } catch (error) {
      console.error("Çıkış işlemi sırasında hata oluştu:", error);
    }
  };

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  if (!auth) return null; // Eğer `auth` boşsa hiçbir şey render etme

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="min-w-[300px] min-h-[400px]">
        <h1 className="text-3xl text-center mb-10">Giriş Sayfası</h1>
        <h2 className="text-2xl">Kullanıcı Girişi</h2>
        <hr />
        <button
          type="submit"
          aria-label="Mevcut hesapla giriş yap"
          className="cursor-pointer mt-5 mb-10 bg-white text-gray-500 hover:text-gray-900 rounded-2xl p-5 transition-all duration-300 text-left"
        >
          <h1 className="md:text-2xl xs:text-xs">
            {`Merhaba ${capitalizeFirstLetter(auth.username)}!`}
          </h1>
          <h2 className="md:text-xl xs:text-[8px]">
            {`${auth.email} ile devam et`}
          </h2>
        </button>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-white text-xl text-black w-[300px] h-[40px] mt-[40px] rounded-full"
            aria-label="Oturumu sonlandır ve çıkış yap"
            onClick={handleExit}
          >
            Oturumu Sonlandır
          </button>
        </div>
      </form>
    </div>
  );
};
export { LoginForm, LoginWithSavedAccounts };
