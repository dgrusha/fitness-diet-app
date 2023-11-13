import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/authHelper";
import { useAppContext } from "../AppContext";

function AdminRoute({children}) {
    const {user} = useAppContext();

    if (!user?.isAdmin) {
        return <Navigate to="/" />
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children;
}

export default AdminRoute;