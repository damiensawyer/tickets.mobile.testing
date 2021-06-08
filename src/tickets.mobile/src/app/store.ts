import {configureStore, ThunkAction, Action, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import darkModeSlice from "../features/darkmode/darkModeSlice";
import pingSlice, {epics as pingPongEpics} from "../features/LearningReactPatterns/PingPong/PingPongSlice"
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {ignoreElements, tap} from "rxjs/operators";
import counterSlice from "../features/LearningReactPatterns/Counter/counterSlice";
import {pin} from "ionicons/icons";
//import {logger} from 'redux-logger'
const rxjsEpicMiddleware = createEpicMiddleware();
const dd = applyMiddleware(rxjsEpicMiddleware)

// https://redux-toolkit.js.org/api/configureStore
export const store = configureStore({
    reducer: {
        darkMode: darkModeSlice,
        pingPong: pingSlice,
        counterSlice: counterSlice
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
        // https://redux-toolkit.js.org/api/getDefaultMiddleware  does different defaults for dev and prod. Includes redux-thunk in all
        getDefaultMiddleware().concat(rxjsEpicMiddleware)
});

function logEpic(actions: any) {
    return actions.pipe(tap(console.log), ignoreElements())
}


export const rootEpic = combineEpics(
    //logEpic, 
    ...pingPongEpics
);
rxjsEpicMiddleware.run(rootEpic)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
