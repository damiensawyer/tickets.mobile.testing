import * as core from './../../app/ticketsCore'
import {Environment, EnvironmentSettings} from './../../app/ticketsCore'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnumDictionary} from "../../app/ticketsCore.Tooling";
import {fromNullable, match, none, Option} from "fp-ts/Option";
import {pipe as fptsPipe} from "fp-ts/function";

import {ofType, StateObservable} from "redux-observable";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import * as rxjs from "rxjs"
import {Observable} from "rxjs"
import {isStatusCodeError, TicketsAPI} from "../../data/user/tickets-auth-api";
import {isRight} from "fp-ts/Either";
import {RootState} from "../../app/store";
import {incrementAsync} from "../LearningReactPatterns/Counter/counterSlice";
import {initialEnvironment, setEnvironment, settingsSlice} from "../Settings/settingsSlice";
import {SettingsPage} from "../Settings/SettingsPage";

export type darkModeValues = 'light' | 'dark' // could have been an enum... but I was learning. Leave in to show another way. 

export interface LoginState {
    bearerTokens: EnumDictionary<Environment, Option<string>>, // I'm thinking to do this so that we can switch between environments without having to log back in and out.  
    activeEnvironment: EnvironmentSettings
}

const shortCodeLength = 6 // need to keep this is sync with the back end. Will use so that they don't have to press enter. Search for CreateShortToken() in c# 

const initialState: LoginState = {
    bearerTokens: {
        [Environment.production]: fromNullable(null),
        [Environment.development]: fromNullable(null),
        [Environment.local]: fromNullable(null),
        [Environment.localFiddler]: fromNullable(null)
    },
    activeEnvironment: core.GetEnvironmentSettings[initialEnvironment]
};

export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setLoggedOut: (state, action: PayloadAction<{ environment: Option<Environment> }>) => {
            let env = fptsPipe(action.payload.environment, match(() => state.activeEnvironment.environment, b => b)) // if they don't pass an environment, log out the default
            state.bearerTokens[env] = none
            if (state.activeEnvironment.environment == env)
                state.activeEnvironment.bearerToken = none
        },
        removeBearerToken:(state, action: PayloadAction<{ environment: Environment }>) => {
            let p = action.payload
            state.bearerTokens[p.environment] = none
            if (state.activeEnvironment.environment == action.payload.environment)
                state.activeEnvironment.bearerToken = none
        },
        setBearerToken: (state, action: PayloadAction<{ token: string, environment: Environment }>) => {
            let p = action.payload
            let token = fromNullable(p.token)
            state.bearerTokens[p.environment] = token
            if (state.activeEnvironment.environment == action.payload.environment)
                state.activeEnvironment.bearerToken = token
        },
        requestShortCodeToEmail: (state, action: PayloadAction<string>) => {
        },
        processShortCode: (state, action: PayloadAction<string>) => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setEnvironment, (state,action: PayloadAction<Environment>) => {
                state.activeEnvironment = core.GetEnvironmentSettings[action.payload]
            })
    }
});

// export const pingEpic = (action$:any) => action$.pipe(
//     ofType(processShortCode), // Pulling out the string 'ping/setPing' from the action creator 
//     //delay(delayTime),// Asynchronously wait 1000ms then continue
//     mapTo(setBearerToken({token:'123',environment:Environment.local})) // here we're executing the action creator to create an action Type 'plain old javascript object' 
// );


// to do... make this generic so that we can use for multiple API calls. 
let getBearerFromShortCode$ = (environmentSettings: EnvironmentSettings, shortCord: string):Observable<string> =>
    new Observable((s) => {
        //let cancellationSource = axios.CancelToken.source();
        let api = new TicketsAPI(environmentSettings)
        api.GetBearerToken(shortCord)().then(r => {
            if (isRight(r)) {
                s.next(r.right.value)
                s.complete()
            } else {
                if (isStatusCodeError(r.left))
                    s.error(`${r.left.status} ${r.left.statusText}`)
                else
                    s.error(`error from http call ${r.left.code}`)
            }
        })
        //return a function which is called when they unsubscribe.
        return () => {
            api.axiosCancellationSource.cancel()
            //console.log(`tearing down ${searchTerm}`);
        };
    });


export const convertShortCodeToBearerEpic = (action$: any, state$: any) => // action$ is a stream of actions
    action$.pipe(
        ofType(processShortCode),
        filter((x: PayloadAction<string>) => x.payload.length >= 1),
        switchMap((x: PayloadAction<string>) => {
            return getBearerFromShortCode$(state$.value.loginSlice.activeEnvironment, x.payload).pipe(
                 map((i: string) => setBearerToken({token: i, environment: (state$ as StateObservable<RootState>).value.loginSlice.activeEnvironment.environment})),
                 catchError(error => rxjs.of(removeBearerToken({environment: (state$ as StateObservable<RootState>).value.loginSlice.activeEnvironment.environment})))
            )
        })
    )


// Export the actionCreators
export const {requestShortCodeToEmail, setBearerToken, processShortCode, removeBearerToken} = LoginSlice.actions;
export const epics = [convertShortCodeToBearerEpic]

// export the reducer
export default LoginSlice.reducer;
