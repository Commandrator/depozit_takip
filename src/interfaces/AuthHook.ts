import User from "./UserDTO";
interface AuthHook {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  validateSession: () => Promise<boolean>;
  auth: User | undefined;
}
export default AuthHook;
