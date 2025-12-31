import { Navigate } from "react-router-dom";

import { selectIsLoggedIn } from "../redux/auth/selectors";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : children;
}

export default PublicRoute;
