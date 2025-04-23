import { useContext } from "react";
import { AuthContext } from "../provider/Authprovider";

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
  };
  
  export default useAuth;