import {combineAll, delay, ignoreElements, mapTo, tap} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";

// export const PING = 'PING'
// export const PONG = 'PONG'

// action creators
// 
// const ping = createAction('ping')
// const pong = createAction('ping')

const delayTime = 100
export const incrementCountEpic = (action$:any) => action$.pipe(ofType('ping/setPing','ping/setPong' ),mapTo({type:'ping/incrementCounter'}))

export type pingValues = 'PING' | 'PONG'
export interface PingState {
    value: pingValues,
    isStarted:boolean,
    count:number
}


const initialState: PingState = {
    value: 'PING',
    isStarted:false,
    count:0
};

export const pingSlice = createSlice({
    name: 'ping',
    initialState,
    reducers: {
        setPing: (state => {
            state.value = 'PING'
            state.isStarted = true
        }),

        setPong: (state => {
            state.value = 'PONG';
            state.isStarted = true
        }),
        incrementCounter:(state =>{state.count++})

    },
});
export const { setPing, setPong, incrementCounter } = pingSlice.actions;

export const pingEpic = (action$:any) => action$.pipe(
    ofType(setPing),
    delay(delayTime), // Asynchronously wait 1000ms then continue
    mapTo(setPong())
);

// REWORK ALL THIS AS DESCRIBED HERE. Don't use oftype  https://redux-toolkit.js.org/api/createAction#with-redux-observable
export const pongEpic = (action$:any) => action$.pipe(
    ofType(setPong),
    delay(delayTime), // Asynchronously wait 1000ms then continue
    mapTo(setPing())
);

 

 export const selectPingMode = (state: RootState) => state.pingPong.value;
//
 export default pingSlice.reducer;
