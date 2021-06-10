import * as core from './../../app/ticketsCore'
import { delay, mapTo} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { createSlice} from "@reduxjs/toolkit";

const delayTime = 200
export type pingValues = 'PING' | 'PONG'

export interface SettingsState {
   activeSettings: core.EnvironmentSettings,
  // isStarted: boolean,
  // count: number
}

const initialState: SettingsState = {
  activeSettings:core.
};

export const settingsSlice = createSlice({
  name: 'ping',
  initialState,
  reducers: {
    // createSlice does some cool things here. It creates an Action Create function (setPing()) and an Action Type, with a type property 'ping/setPing'. It adds that string as ToString() on the function as well which we can use in the ofType() calls with rxjs
    // setPing: (state => {
    //   state.value = 'PING'
    //   state.isStarted = true
    //   state.count++;
    // }),
    // setPong: (state => {
    //   state.value = 'PONG';
    //   state.isStarted = true;
    //   state.count++;
    // })
  },
});

// export const pingEpic = (action$:any) => action$.pipe(
//     ofType(setPing), // Pulling out the string 'ping/setPing' from the action creator 
//     delay(delayTime),// Asynchronously wait 1000ms then continue
//     mapTo(setPong()) // here we're executing the action creator to create an action Type 'plain old javascript object' 
// );
//
// export const pongEpic = (action$:any) => action$.pipe(
//     ofType(setPong),
//     delay(delayTime),
//     mapTo(setPing())
// );


// Export the actionCreators
export const { setPing, setPong } = settingsSlice.actions;
export const epics = [pingEpic, pongEpic]

// export the reducer
export default settingsSlice.reducer;
