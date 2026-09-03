import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {

    const location = useLocation();

    const {
        user,
        token,
        isAuthenticated
    } = useSelector((state) => state.auth);

    const role = user?.role || user?.Role;

    // Not Logged In
    if (!isAuthenticated || !token) {

        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );

    }

    // Role Not Allowed
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role)
    ) {

        if (role === "Admin") {
            return <Navigate to="/admin" replace />;
        }

        if (role === "Vendor") {
            return <Navigate to="/vendor" replace />;
        }

        if (role === "User") {
            return <Navigate to="/home" replace />;
        }

        return <Navigate to="/login" replace />;

    }

    return <Outlet />;

};

export default ProtectedRoute;