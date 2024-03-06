/* eslint-disable react/prop-types */
import { useAuthState } from "react-firebase-hooks/auth";

import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { extractUserData } from "../../firefunctions";
import { authActions } from "../../store/authSlice";
import { navlinks } from "../../navlinks";
import { auth } from "../../config/firebase";
import LoadingScreen from "../Loading/LoadingScreen";
import ErrorScreen from "../Errors/ErrorScreen";

export default function AuthRoute() {
  const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(authActions.login(extractUserData(user)));
    }
  }, [user, dispatch]);

  if (error) return <ErrorScreen />;
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to={navlinks.login.path} replace />;

  return <Outlet />;
}
