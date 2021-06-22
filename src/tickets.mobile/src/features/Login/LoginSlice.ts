import * as core from './../../app/ticketsCore'
import {Environment, EnvironmentSettings} from './../../app/ticketsCore'
import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnumDictionary, EnvironmentFunctions, validateEmail} from "../../app/ticketsCore.Tooling";
import {fromNullable, match, none, Option} from "fp-ts/Option";
import {pipe as fptsPipe} from "fp-ts/function";

import {ofType, StateObservable} from "redux-observable";
import {catchError, filter, map, mergeMap, switchMap} from "rxjs/operators";
import * as rxjs from "rxjs"
import {EMPTY, Observable} from "rxjs"
import {AxiosError, AxiosErrorWithStatusCode, AxiosRequest$, isStatusCodeError, TicketsAPI, ticketsQuery} from "../../data/user/tickets-auth-api";
import {isRight} from "fp-ts/Either";
import {RootState} from "../../app/store";
import {incrementAsync} from "../LearningReactPatterns/Counter/counterSlice";
import {initialEnvironment, setEnvironment, settingsSlice} from "../Settings/settingsSlice";
import {SettingsPage} from "../Settings/SettingsPage";
import {TaskEither} from "fp-ts/TaskEither";
import {GetBearerToken, RequestShortCodeToEmail} from "../../data/user/tickets-http-requests";
import {History} from 'history'; // https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
export type darkModeValues = 'light' | 'dark' // could have been an enum... but I was learning. Leave in to show another way. 

export interface LoginState {
    bearerTokens: EnumDictionary<Environment, Option<string>>, // I'm thinking to do this so that we can switch between environments without having to log back in and out.  
    activeEnvironment: EnvironmentSettings,
    isLoggedIn: boolean
}

const minShortCodeLength = 1 // need to keep this is sync with the back end. Will use so that they don't have to press enter. Search for CreateShortToken() in c# 

const initialState: LoginState = {
    bearerTokens: {
        [Environment.production]: fromNullable(null),
        [Environment.development]: fromNullable(null),
        [Environment.local]: fromNullable(null),
        [Environment.localFiddler]: fromNullable(null)
    },
    activeEnvironment: core.GetEnvironmentSettings[initialEnvironment],
    isLoggedIn: false
};
type codeWithHistory = { code: string, history: History }
export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setLoggedOut: (state, action: PayloadAction<{ environment: Option<Environment> }>) => {
            let env = fptsPipe(action.payload.environment, match(() => state.activeEnvironment.environment, b => b)) // if they don't pass an environment, log out the default
            state.bearerTokens[env] = none
            if (state.activeEnvironment.environment == env)
                state.activeEnvironment.bearerToken = none

            state.isLoggedIn = EnvironmentFunctions.isLoggedIn(state.activeEnvironment)
        },
        removeBearerToken: (state, action: PayloadAction<{ environment: Environment }>) => {
            state.bearerTokens[action.payload.environment] = none
            if (state.activeEnvironment.environment == action.payload.environment)
                state.activeEnvironment.bearerToken = none

            state.isLoggedIn = EnvironmentFunctions.isLoggedIn(state.activeEnvironment)
        },
        setBearerToken: (state, action: PayloadAction<{ token: string, environment: Environment }>) => {
            let p = action.payload
            let token = fromNullable(p.token)
            state.bearerTokens[p.environment] = token
            if (state.activeEnvironment.environment == action.payload.environment)
                state.activeEnvironment.bearerToken = token

            state.isLoggedIn = EnvironmentFunctions.isLoggedIn(state.activeEnvironment)
        },
        requestShortCodeToEmail: (state, action: PayloadAction<string>) => {
        },
        processShortCode: (state, action: PayloadAction<codeWithHistory>) => {
        },
        processedShortCodeSuccessfully: (state, action: PayloadAction<History>) => {
            // cant' navigate from here...... https://blog.logrocket.com/react-router-with-redux-navigation-state/
            // action.payload.push('/page/Home')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setEnvironment, (state, action: PayloadAction<Environment>) => {
                state.activeEnvironment = {...core.GetEnvironmentSettings[action.payload], bearerToken: state.bearerTokens[action.payload]}
                // The line below failed: https://stackoverflow.com/a/54413951/494635
                //state.activeEnvironment.bearerToken = state.bearerTokens[action.payload]
                state.isLoggedIn = EnvironmentFunctions.isLoggedIn(state.activeEnvironment)
            })
    }
});

// export const pingEpic = (action$:any) => action$.pipe(
//     ofType(processShortCode), // Pulling out the string 'ping/setPing' from the action creator 
//     //delay(delayTime),// Asynchronously wait 1000ms then continue
//     mapTo(setBearerToken({token:'123',environment:Environment.local})) // here we're executing the action creator to create an action Type 'plain old javascript object' 
// );

export const convertShortCodeToBearerEpic = (action$: Observable<any>, state$: StateObservable<RootState>) => // action$ is a stream of actions
    action$.pipe(
        ofType(processShortCode),
        filter((x: PayloadAction<codeWithHistory>) => x.payload.code.length >= minShortCodeLength),
        switchMap((x: PayloadAction<codeWithHistory>) => {
            return AxiosRequest$(state$.value.loginSlice.activeEnvironment, x.payload.code, GetBearerToken).pipe(
                // https://stackoverflow.com/questions/47965184/how-to-dispatch-multiple-actions-from-redux-observable
                //map((i: string) => setBearerToken({token: i, environment: (state$).value.loginSlice.activeEnvironment.environment})),
                mergeMap((i) => [
                    setBearerToken({token: i, environment: (state$).value.loginSlice.activeEnvironment.environment}),
                    processedShortCodeSuccessfully(x.payload.history)]
                ),
                catchError(error => rxjs.of(removeBearerToken({environment: (state$).value.loginSlice.activeEnvironment.environment})))
            )
        })
    )

// export const requestShortCodeToEmailEpic = (action$: Observable<any>, state$: StateObservable<RootState>) => // action$ is a stream of actions
//     action$.pipe(
//         ofType(requestShortCodeToEmail),
//         filter((x: PayloadAction<string>) => validateEmail(x.payload)),
//         switchMap((x: PayloadAction<string>) => {
//             return AxiosRequest$(state$.value.loginSlice.activeEnvironment, x.payload, RequestShortCodeToEmail).pipe(
//                 map(() => EMPTY),
//                 catchError(error => EMPTY) // handle somehow??
//                 //catchError(error => rxjs.of(removeBearerToken({environment: (state$).value.loginSlice.activeEnvironment.environment})))
//             )
//         })
//     )


// Export the actionCreators
export const {requestShortCodeToEmail, setBearerToken, processedShortCodeSuccessfully, processShortCode, removeBearerToken} = LoginSlice.actions;
export const epics = [convertShortCodeToBearerEpic]

// export the reducer
export default LoginSlice.reducer;
