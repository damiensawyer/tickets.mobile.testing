import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import settingsSlice from './../features/Settings/settingsSlice'
import pingSlice, {epics as pingPongEpics} from "../features/LearningReactPatterns/PingPong/PingPongSlice"
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {ignoreElements, tap} from "rxjs/operators";
import counterSlice from "../features/LearningReactPatterns/Counter/counterSlice";
import * as EnvironmentFunctions from "./environmentFunctions";

const rxjsEpicMiddleware = createEpicMiddleware();


export const store = configureStore({
    reducer: {
        settings : settingsSlice,
        pingPong: pingSlice,
        counterSlice: counterSlice
    },
    devTools: EnvironmentFunctions.IsProduction() ? false : true, // is is the redux devtools integration ENHANCEMENT
    middleware: getDefaultMiddleware => {
        // https://redux-toolkit.js.org/api/getDefaultMiddleware  does different defaults for dev and prod. Includes redux-thunk in all
        let result = getDefaultMiddleware().concat(rxjsEpicMiddleware)
        if (!EnvironmentFunctions.IsProduction()) {
            // don't need the redux-logger if you're using the redux devtools above... but wanted to show how to do an optional middlewear inclusion
            //result = result.concat(logger) // This is redux logger which is MIDDLEWEAR. It logs previous and next state to the console on every change.  
        }
        return result
    }

});

/* eslint-disable-next-line */
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
