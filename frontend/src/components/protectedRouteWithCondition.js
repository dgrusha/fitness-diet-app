import { Navigate } from "react-router-dom";
import { isAuthenticated, hasPassedObligatoryForm } from "../helpers/authHelper";

function ProtectedRouteWithCondition({children}) {
    if(Boolean(hasPassedObligatoryForm()) === true){
        return <Navigate to="/" />
    }
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRouteWithCondition;