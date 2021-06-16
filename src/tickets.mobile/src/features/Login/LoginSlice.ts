import * as core from './../../app/ticketsCore'
import {Environment, EnvironmentSettings} from './../../app/ticketsCore'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EnumDictionary} from "../../app/ticketsCore.Tooling";
import {fromNullable, match, none, Option} from "fp-ts/Option";
import {pipe} from "fp-ts/function";
import {ofType} from "redux-observable";
import {filter, map, mapTo, switchMap} from "rxjs/operators";
import * as rxjs from "rxjs"

export type darkModeValues = 'light' | 'dark' // could have been an enum... but I was learning. Leave in to show another way. 
 
export interface LoginState {
    bearerTokens: EnumDictionary<Environment, Option<string>>, // I'm thinking to do this so that we can switch between environments without having to log back in and out.  
    activeEnvironment:EnvironmentSettings
}

const shortCodeLength=6 // need to keep this is sync with the back end. Will use so that they don't have to press enter. Search for CreateShortToken() in c# 

const initialState: LoginState = {
    bearerTokens: {
        [Environment.production]: fromNullable(null),
        [Environment.development]: fromNullable(null),
        [Environment.local]: fromNullable(null),
        [Environment.localFiddler]: fromNullable(null)
    },
    activeEnvironment : core.GetEnvironmentSettings[Environment.local]
};

export const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setLoggedOut: (state, action: PayloadAction<{ environment: Option<Environment> }>) => {
            let env = pipe(action.payload.environment, match(()=>state.activeEnvironment.environment, b=>b)) // if they don't pass an environment, log out the default
            state.bearerTokens[env] = none
            if (state.activeEnvironment.environment == env)
                state.activeEnvironment.bearerToken = none
        },
        setBearerToken: (state, action: PayloadAction<{ token: string, environment: Environment }>) => {
            let p = action.payload
            let token = fromNullable(p.token)
            state.bearerTokens[p.environment] = token
            if (state.activeEnvironment.environment == action.payload.environment) 
                state.activeEnvironment.bearerToken = token
        },
        requestShortCodeToEmail: (state, action:PayloadAction<string>) =>{},
        processShortCode: (state, action:PayloadAction<string>) =>{},
    },
});

// export const pingEpic = (action$:any) => action$.pipe(
//     ofType(processShortCode), // Pulling out the string 'ping/setPing' from the action creator 
//     //delay(delayTime),// Asynchronously wait 1000ms then continue
//     mapTo(setBearerToken({token:'123',environment:Environment.local})) // here we're executing the action creator to create an action Type 'plain old javascript object' 
// );


export const convertShortCodeToBearerEpic = (action$:any) => // action$ is a stream of actions
    action$.pipe(
        ofType(processShortCode),
        filter((x:PayloadAction<string>) => x.payload.length == shortCodeLength),
        switchMap(map((x:string) =>setBearerToken({token:x,environment:Environment.local})))
    )



// function convertShortCodeToBearer(action$) { // action$ is a stream of actions
//     // action$.ofType is the outer Observable
//     return action$
//         .ofType(FETCH_WHISKIES) // ofType(FETCH_WHISKIES) is just a simpler version of .filter(x => x.type === FETCH_WHISKIES)
//         .switchMap(() => {
//             // ajax calls from Observable return observables. This is how we generate the inner Observable
//             return ajax
//                 .getJSON(url) // getJSON simply sends a GET request with Content-Type application/json
//                 .map(data => data.results) // get the data and extract only the results
//                 .map(whiskies => whiskies.map(whisky => ({
//                     id: whisky.id,
//                     title: whisky.title,
//                     imageUrl: whisky.img_url
//                 })))// we need to iterate over the whiskies and get only the properties we need
//                 // filter out whiskies without image URLs (for convenience only)
//                 .map(whiskies => whiskies.filter(whisky => !!whisky.imageUrl))
//             // at the end our inner Observable has a stream of an array of whisky objects which will be merged into the outer Observable
//         })
//         .map(whiskies => fetchWhiskiesSuccess(whiskies)) // map the resulting array to an action of type FETCH_WHISKIES_SUCCESS
//         // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
//         // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
//         .catch(error => Observable.of(fetchWhiskiesFailure(error.message)))
// }



// Export the actionCreators
export const {requestShortCodeToEmail, setBearerToken, processShortCode} = LoginSlice.actions;
 export const epics = [convertShortCodeToBearerEpic]

// export the reducer
export default LoginSlice.reducer;
