import {configureStore, ThunkAction, Action, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import darkModeSlice from "../features/darkmode/darkModeSlice";
import pingSlice, { pingEpic, pongEpic, incrementCountEpic} from "../features/FlashIcon/FlashIconEpic";
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {ignoreElements, tap} from "rxjs/operators";
import {useAppSelector} from "./hooks";

//import {setDarkMode, selectDarkMode} from '../features/darkmode/darkModeSlice'
const epicMiddleware = createEpicMiddleware();
const dd = applyMiddleware(epicMiddleware)


export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    pingMode: pingSlice
  },
  // @ts-ignore
  middleware:getDefaultMiddleware =>
      getDefaultMiddleware().concat(epicMiddleware)
});

function logEpic(actions:any) {
  return actions.pipe(tap(console.log), ignoreElements())
}


export const rootEpic = combineEpics(
  logEpic, pingEpic,pongEpic, incrementCountEpic
);
epicMiddleware.run(rootEpic)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
