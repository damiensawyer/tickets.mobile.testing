import * as core from './../../app/ticketsCore'
import {Environment, PageName} from './../../app/ticketsCore'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnumDictionary} from "../../app/ticketsCore.Tooling";
import {LoginPage} from "./LoginPage";
import {SettingsPage} from "../Settings/SettingsPage";
import {HomePage} from "../Home/HomePage";
import {FC} from "react";
import {ofType} from "redux-observable";
import {delay, mapTo} from "rxjs/operators";
import {setPing, setPong} from "../LearningReactPatterns/PingPong/PingPongSlice";

export type darkModeValues = 'light' | 'dark'

export interface LoginState {
    bearerTokens: EnumDictionary<Environment, string>
}
const initialState: LoginState = {

    bearerTokens: {
        [Environment.production]: '',
        [Environment.development]: '',
        [Environment.local]: '',
        [Environment.localFiddler]: '',
    }
};

export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<darkModeValues>) => {
            // state.darkMode = action.payload
        },
        setBearerToken: (state, action: PayloadAction<{ token: string, environment: Environment }>) => {
            state.bearerTokens[action.payload.environment] = action.payload.token
        },
        requestShortCodeToEmail: (state, action:PayloadAction<string>) =>{}
    },
});

export const pingEpic = (action$:any) => action$.pipe(
    ofType(requestShortCodeToEmail), // Pulling out the string 'ping/setPing' from the action creator 
    //delay(delayTime),// Asynchronously wait 1000ms then continue
    mapTo(setPong()) // here we're executing the action creator to create an action Type 'plain old javascript object' 
);

// Export the actionCreators
export const {requestShortCodeToEmail} = LoginSlice.actions;
// export const epics = [pingEpic, pongEpic]

// export the reducer
export default LoginSlice.reducer;
