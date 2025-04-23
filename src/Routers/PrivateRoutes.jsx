import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Pages/Shared/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children;
    }
    return  <Navigate to="/login" state={location?.pathname}> </Navigate>
};

export default PrivateRoutes;