import {configureStore, ThunkAction, Action, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import darkModeSlice from "../features/darkmode/darkModeSlice";
import pingSlice, {pingEpic, pongEpic} from "../features/FlashIcon/FlashIconEpic";
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {ignoreElements, tap} from "rxjs/operators";

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
  return actions.pipe(tap(x => console.log(x)), ignoreElements())
}


// export const rootEpic = combineEpics({
//   // @ts-ignore
//   logEpic
//  
// });

epicMiddleware.run(logEpic)



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
