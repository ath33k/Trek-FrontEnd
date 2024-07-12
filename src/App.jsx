import { Suspense, lazy } from "react";
//const HomePage = lazy(() => import("./pages/HomePage"));
import { Routes, Route } from "react-router-dom";

import Card from "./components/Card";
import { ErrorBoundary } from "./components/Errors/ErrorBoundary";
import ErrorScreen from "./components/Errors/ErrorScreen";
<<<<<<< HEAD
import LoadingScreen from "./components/Loading/LoadingScreen";
import AuthRoute from "./components/Routes/AuthRoute";
=======
import { navlinks } from "./navlinks";
import HomePage from "./pages/HomePage";
import ChatBotUI from "./pages/ChatBotUI2"; //chage bot UI
import ResultsPage from "./pages/ResultsPage";
>>>>>>> b28f15dcd3470ec30deb4e4c59f72f86f0485111
import AboutUs from "./pages/AboutUs";
import AuthPage from "./pages/AuthPage";
import ChatBotUI from "./pages/ChatBotUI";
import HomePage from "./pages/HomePage";
import MapTestPage from "./pages/MapTestPage";
import ResultsPage from "./pages/ResultsPage";
import SearchPage from "./pages/SearchPage";
import { useJsApiLoader } from "@react-google-maps/api";
import { navlinks } from "./navlinks";

const FDetialPage = lazy(() => import("./pages/FDetialPage"));
const MapViewPage = lazy(() => import("./pages/MapViewPage"));

const AddDestination = lazy(() => import("./pages/AddDestination"));

export default function App() {
  document.title = window.location.pathname.replaceAll("/", "") || "Home";
  const apiKey = "AIzaSyBPaYveAngQ1IzyBvJKjPy_LpLxECZPchQ";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  if (!isLoaded)
    return <LoadingScreen messages={["Loading Google Maps API..."]} />;
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path={navlinks.fdpage.path} element={<FDetialPage />} />
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
              <Route path={navlinks.card.path} element={<Card />} />
            </Route>
            <Route path={navlinks.login.path} element={<AuthPage />} />
            <Route path="*" element={<ErrorScreen type={"404"} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
