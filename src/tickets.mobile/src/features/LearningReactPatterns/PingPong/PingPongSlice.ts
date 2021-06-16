/*
    Demonstration of using redux-observable with React Toolkit for async. 
    Note that there's no reason that you couldn't combine this with the redux-thunk example used in Counter.tsx. Redux thunk with Redux Toolkit can do some cool things, including generating action types in response to sucess/fail/complete states on promises. 
 */

import {delay, mapTo, tap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import {EMPTY} from "rxjs";
import {RootState} from "../../../app/store";

const delayTime = 200000
export type pingValues = 'PING' | 'PONG'

export interface PingState {
    value: pingValues,
    isStarted: boolean,
    count: number
}

const initialState: PingState = {
    value: 'PING',
    isStarted: false,
    count: 0
};

const pingSlice = createSlice({
    name: 'ping',
    initialState,
    reducers: {
        // createSlice does some cool things here. It creates an Action Create function (setPing()) and an Action Type, with a type property 'ping/setPing'. It adds that string as ToString() on the function as well which we can use in the ofType() calls with rxjs
        setPing: (state => {
            state.value = 'PING'
            state.isStarted = true
            state.count++;
        }),
        setPong: (state => {
            state.value = 'PONG';
            state.isStarted = true;
            state.count++;
        })
    },
});

// export const trackStateEpic = (action$: any, state: any) =>
//
//    
//
// {
//         console.log(`Tracking State ${state}`, state)
//         return EMPTY;
//     }
//

export const pingEpic = (action$: any, state: any) => action$.pipe(
    ofType(setPing), // Pulling out the string 'ping/setPing' from the action creator 
    tap(()=>console.log(`ping state:`), state),
    delay(delayTime),// Asynchronously wait 1000ms then continue
    mapTo(setPong()) // here we're executing the action creator to create an action Type 'plain old javascript object' 
);

export const pongEpic = (action$: any, state:any) => action$.pipe(
    ofType(setPong),
    tap(()=>console.log(`pong state:`, state)),
    delay(delayTime),
    mapTo(setPing())
);


// Export the actionCreators
export const {setPing, setPong} = pingSlice.actions;
export const epics = [pingEpic, pongEpic]

// export the reducer
export default pingSlice.reducer;
