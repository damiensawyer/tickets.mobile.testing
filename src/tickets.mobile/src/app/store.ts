import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import darkModeSlice from "../features/darkmode/darkModeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
