import { FcGoogle } from "react-icons/fc";
import Container from "../components/Container";
import { FaUserSecret } from "react-icons/fa";
import { auth } from "../config/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import LoadingScreen from "../components/Loading/LoadingScreen";
import ErrorScreen from "../components/Errors/ErrorScreen";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { navlinks } from "../navlinks";
import { authActions } from "../store/authSlice";
import { extractUserData } from "../firefunctions";
import { signInAnonymously } from "firebase/auth";
import { useState } from "react";

export default function AuthPage() {
  const [signInWithGoogle, gAuthData, gloading, gerror] =
    useSignInWithGoogle(auth);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  if (gerror || error) {
    return <ErrorScreen />;
  }

  if (gloading) {
    return <LoadingScreen />;
  }
  if (gAuthData) {
    dispatch(authActions.login(extractUserData(gAuthData.user)));
    return <Navigate to={navlinks.home.path} replace />;
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>Welcome to</h2>
        <h1 className="text-4xl font-bold text-cyan-600 mb-6">Trek AI</h1>
        <button
          className="bg-gray-200 gap-2 inline-flex justify-center items-center text-gray-700 px-4 py-2 rounded-md"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          <FcGoogle />
          Sign in with Google
        </button>
        <button
          onClick={async () => {
            try {
              const userData = await signInAnonymously(auth);
              dispatch(authActions.login(extractUserData(userData)));
              navigator(navlinks.home.path);
            } catch (e) {
              setError(e);
            }
          }}
          className="bg-gray-800 gap-2 inline-flex justify-center items-center text-white px-4 py-2 rounded-md mt-4"
        >
          <FaUserSecret />
          Continue as Guest
        </button>
      </div>
    </Container>
  );
}
