import { configureStore } from "@reduxjs/toolkit";
import { hnApi, starredReducer, storiesReducer, themeReducer } from "./slices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    stories: storiesReducer,
    starred: starredReducer,
    [hnApi.reducerPath]: hnApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hnApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
