import {combineAll, delay, mapTo, tap} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {DarkModeState, darkModeValues} from "../darkmode/darkModeSlice";
export const PING = 'PING'
export const PONG = 'PONG'

// action creators
const ping = () => ({ type: PING });
const pong = () => ({ type: PONG });

export const pingEpic = (action$:any) => action$.pipe(
    ofType('ping/setPing' ),
    delay(1000), // Asynchronously wait 1000ms then continue
    tap(x => console.log('hhhhhhhhhhhhhhhhhhhhhhhh')),
    mapTo({ type: 'ping/setPong' })
);

export const pongEpic = (action$:any) => action$.pipe(
    ofType('ping/setPong'),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'ping/setPing' })
);

export type pingValues = typeof PING | typeof PONG
export interface PingState {
    value: pingValues
}


const initialState: PingState = {
    value: PONG
};

export const pingSlice = createSlice({
    name: 'ping',
    initialState,
    reducers: {
        setPing: (state => {
            state.value = PING;
        }),

        setPong: (state => {
            state.value = PONG;
        }),

    },
});

 export const { setPing, setPong } = pingSlice.actions;

 export const selectPingMode = (state: RootState) => state.pingMode.value;
//
 export default pingSlice.reducer;
