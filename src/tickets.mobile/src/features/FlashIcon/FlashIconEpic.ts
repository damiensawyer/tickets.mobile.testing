import { delay, mapTo} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {DarkModeState, darkModeValues} from "../darkmode/darkModeSlice";
const PING = 'PING'
const PONG = 'PONG'

// action creators
const ping = () => ({ type: PING });
const pong = () => ({ type: PONG });

export const pingEpic = (action$:any, store$:any) => action$.pipe(
    ofType(PING),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: PONG })
);

export const pongEpic = (action$:any) => action$.pipe(
    ofType(PONG),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: PING })
);

export type pingValues = typeof PING | typeof PONG
export interface PingState {
    value: pingValues
}


const initialState: PingState = {
    value: PING
};

export const pingSlice = createSlice({
    name: 'ping',
    initialState,
    reducers: {
        setPingMode: (state, action:PayloadAction<pingValues>) => {
            state.value = action.payload;
        }
    },
});

 export const { setPingMode } = pingSlice.actions;

 export const selectPingMode = (state: RootState) => state.pingMode.value;
//
 export default pingSlice.reducer;
