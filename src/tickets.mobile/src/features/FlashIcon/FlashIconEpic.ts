import {combineAll, delay, ignoreElements, mapTo, tap} from 'rxjs/operators';
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
    delay(delayTime), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'ping/setPong' })
);

const delayTime = 1000
export const incrementCountEpic = (action$:any) => action$.pipe(ofType('ping/setPing','ping/setPong' ),mapTo({type:'ping/incrementCounter'}))


// REWORK ALL THIS AS DESCRIBED HERE. Don't use oftype  https://redux-toolkit.js.org/api/createAction#with-redux-observable
export const pongEpic = (action$:any) => action$.pipe(
    ofType('ping/setPong'),
    delay(delayTime), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'ping/setPing' })
);

export type pingValues = typeof PING | typeof PONG
export interface PingState {
    value: pingValues,
    isStarted:boolean,
    count:number
}


const initialState: PingState = {
    value: PONG,
    isStarted:false,
    count:0
};

export const pingSlice = createSlice({
    name: 'ping',
    initialState,
    reducers: {
        setPing: (state => {
            state.value = PING
            state.isStarted = true
        }),

        setPong: (state => {
            state.value = PONG;
            state.isStarted = true
        }),
        incrementCounter:(state =>{state.count++})

    },
});

 export const { setPing, setPong, incrementCounter } = pingSlice.actions;

 export const selectPingMode = (state: RootState) => state.pingMode.value;
//
 export default pingSlice.reducer;
