import { Navigate, RouterProvider, Outlet, createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import styles from "./App.module.css";
import { Error404, Footer, Header, LatestStories, StarredStories, useFilterController } from "./components";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { initializeStarsFromStorage } from "./redux/slices";
import classNames from "classnames";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // initialize starred storage from localStorage
    dispatch(initializeStarsFromStorage());
  }, [dispatch]);

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppRoot />} errorElement={<Error404 />}>
        <Route index element={<Navigate to="latest" replace />} />
        <Route path="latest" element={<LatestStories />} />
        <Route path="starred" element={<StarredStories />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

const AppRoot = () => {
  // shared filter controller shared by top and bottom filters
  const filterController = useFilterController();

  // get theme (dark or light mode)
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <div
      className={classNames(styles.app, `theme-${themeMode}`, {
        [styles.themeDark]: themeMode === "dark",
        ["bp5-dark"]: themeMode === "dark",
      })}
    >
      <Header {...filterController} />
      <Outlet />
      <Footer {...filterController} />
    </div>
  );
};

export default App;
