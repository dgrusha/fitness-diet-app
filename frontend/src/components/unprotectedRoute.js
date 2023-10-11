import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/authHelper";

function UnprotectedRoute({children}) {
    if (isAuthenticated()) {
        return <Navigate to="/" />
    }
    return children;
}

export default UnprotectedRoute;