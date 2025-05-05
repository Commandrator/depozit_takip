import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.tsx";
import { LoginForm, LoginWithSavedAccounts } from "../components/Forms/index.tsx";
import useApp from "../hooks/useApp.tsx";
const Login = () => {
  const { auth } = useAuth();
  const {validateSession} = useApp();
  const [nextProcess, setNextProcess] = useState(Boolean(auth));  
  useEffect(() => {
    const loadData = async () => {
      try {
        const verified = await validateSession();
        if (verified && auth) setNextProcess(true);
      } catch (error) {
        setNextProcess(false);
      }      
    }
    loadData()
  }, [auth, validateSession]);
  switch (nextProcess) {
    case true:
        return <LoginWithSavedAccounts auth={auth} setNextProcess={setNextProcess}/>
    case false:
        return <LoginForm/>
    default:
        return <LoginForm/>
  }
};
const Register = () => {
  return "test";
};
const Panel = () => {
  return "test";
};
export { Login, Register, Panel };
