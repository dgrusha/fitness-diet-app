import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/authHelper";

function ProtectedRoute({children}) {
    //add role on db to user
    // add enum on frontend to check this role 
		
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute;