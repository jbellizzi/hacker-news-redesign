import {
  Navigate,
  RouterProvider,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import { Error404, Footer, Header, LatestStories, StarredStories, useFilterController } from "./components";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { initializeFromStorage } from "./redux/slices";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeFromStorage());
  }, [dispatch]);

  const router = createBrowserRouter(
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
  const filterController = useFilterController();
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <div className={`theme-${themeMode}`}>
      <Header {...filterController} />
      <Outlet />
      <Footer {...filterController} />
    </div>
  );
};

export default App;
