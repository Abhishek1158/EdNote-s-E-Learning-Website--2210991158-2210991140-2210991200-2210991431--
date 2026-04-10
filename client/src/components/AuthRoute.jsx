import { Navigate } from "react-router-dom";
const AuthRoute = ({ children }) => {
  return !localStorage.getItem("token") ? children : <Navigate to="/" replace />;
};
export default AuthRoute;