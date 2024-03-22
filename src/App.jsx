import { Suspense, lazy } from "react";

//const HomePage = lazy(() => import("./pages/HomePage"));
import { Routes, Route, useNavigate } from "react-router-dom";
const FDetialPage = lazy(() => import("./pages/FDetialPage"));
const MapViewPage = lazy(() => import("./pages/MapViewPage"));
import AuthPage from "./pages/AuthPage";
import LoadingScreen from "./components/Loading/LoadingScreen";
import { ErrorBoundary } from "./components/Errors/ErrorBoundary";
import AuthRoute from "./components/Routes/AuthRoute";
import ErrorScreen from "./components/Errors/ErrorScreen";
import { navlinks } from "./navlinks";
import HomePage from "./pages/HomePage";
import Newviewcard from "./components/NewViewCard";

import sigiriya from "./assets/sigiriya.png";

const AddDestination = lazy(() => import("./pages/AddDestination"));

export default function App() {
  document.title = window.location.pathname.replaceAll("/", "") || "Home";
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route
                path={navlinks.fdpage.path}
                element={<FDetialPage destinationID={"8onQvGuAicMdvL77ikOi"} />}
              />
              <Route path={navlinks.home.path} element={<HomePage />} />
              <Route
                path="/testprompt"
                element={
                  <Newviewcard
                    description={"sfsbfb rsjbwgkbnw btwjbtb j"}
                    title="Sigiriya"
                    backgroundImage={sigiriya}
                    height={"100vh"}
                    distance={"24"}
                    rating={"4"}
                  />
                }
              />
              <Route path={navlinks.map.path} element={<MapViewPage />} />
              <Route path={navlinks.add.path} element={<AddDestination />} />
            </Route>
            <Route path={navlinks.login.path} element={<AuthPage />} />
            <Route path="*" element={<ErrorScreen type={"404"} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
