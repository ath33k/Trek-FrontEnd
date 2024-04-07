import { Suspense, lazy } from "react";

//const HomePage = lazy(() => import("./pages/HomePage"));
import { Routes, Route } from "react-router-dom";
const FDetialPage = lazy(() => import("./pages/FDetialPage"));
const MapViewPage = lazy(() => import("./pages/MapViewPage"));
import AuthPage from "./pages/AuthPage";
import LoadingScreen from "./components/Loading/LoadingScreen";
import { ErrorBoundary } from "./components/Errors/ErrorBoundary";
import AuthRoute from "./components/Routes/AuthRoute";
import ErrorScreen from "./components/Errors/ErrorScreen";
import { navlinks } from "./navlinks";
import HomePage from "./pages/HomePage";
import ChatBotUI from "./pages/ChatBotUI";
import ResultsPage from "./pages/ResultsPage";
import AboutUs from "./pages/AboutUs";
import MapTestPage from "./pages/MapTestPage";
import SearchPage from "./pages/SearchPage";

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
              <Route
                path={navlinks.results.path}
                element={
                  <ResultsPage
                    results={[
                      {
                        name: "Polonnaruwa Vatadageya",
                        id: "8onQvGuAicMdvL77ikOi",
                        description:
                          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error natus dicta corrupti incidunt, totam laboriosam quibusdam sit, provident ullam fuga nobis ea necessitatibus ad molestiae atque! Veritatis voluptas soluta cumque!",
                      },
                      {
                        name: "Galle",
                        id: "HeRima8M7SPZaXowWuat",
                        description:
                          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error natus dicta corrupti incidunt, totam laboriosam quibusdam sit, provident ullam fuga nobis ea necessitatibus ad molestiae atque! Veritatis voluptas soluta cumque!",
                      },
                    ]}
                  />
                }
              />
              <Route path={navlinks.home.path} element={<HomePage />} />
              <Route path={navlinks.prompt.path} element={<ChatBotUI />} />
              <Route path={navlinks.about.path} element={<AboutUs />} />
              <Route path={navlinks.map.path} element={<MapViewPage />} />
              <Route path={navlinks.add.path} element={<AddDestination />} />
              <Route path={"/testmapcard"} element={<MapTestPage />} />
              <Route path={navlinks.search.path} element={<SearchPage />} />
            </Route>
            <Route path={navlinks.login.path} element={<AuthPage />} />
            <Route path="*" element={<ErrorScreen type={"404"} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
