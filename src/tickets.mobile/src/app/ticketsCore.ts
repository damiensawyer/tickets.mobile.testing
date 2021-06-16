// https://www.typescriptlang.org/docs/handbook/modules.html
import {useDispatch} from "react-redux";
import {EnumDictionary, EnvironmentSettings} from "./ticketsCore.Tooling";
import {fromNullable} from "fp-ts/Option";
import {useAppSelector} from "./hooks";
import {setPing} from "../features/LearningReactPatterns/PingPong/PingPongSlice";
import {TicketsAPI} from "../data/user/tickets-auth-api";
import {flow, pipe} from "fp-ts/function";
import {isLeft, isRight, match} from "fp-ts/Either";
import * as E from "fp-ts/Either";
import axios from "axios";

export type {EnvironmentSettings} from "./ticketsCore.Tooling";
//export * from './ticketsCore.pageSettings';

export const TestSettings = {
    RunIntegratorTests:false
}

export const RunSetup = () => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
    let dispatch = useDispatch()
    if (!useAppSelector(x => x.pingPong.isStarted))
        dispatch(setPing())
}

export enum Environment {
    production = "Production",
    development = "Development",
    local = "Localhost",
    localFiddler = "Local Fidler"
}

export const defaultEnvironment: EnvironmentSettings = {
    baseUrl: "",
    environment: Environment.local, 
    proxy: fromNullable(undefined),
    bearerToken: fromNullable(undefined),
    handleSelfSignedCerts:false
}

export const GetEnvironmentSettings: EnumDictionary<Environment, EnvironmentSettings> = {
    [Environment.development]: {...defaultEnvironment, environment: Environment.development, baseUrl: 'https://dev.tickets.org.au'},
    [Environment.production]: {...defaultEnvironment, environment: Environment.production, baseUrl: 'https://app.tickets.org.au'},
    [Environment.local]: {...defaultEnvironment, environment: Environment.local, baseUrl: 'https://welcomemat.com', handleSelfSignedCerts:true},
    [Environment.localFiddler]: {...defaultEnvironment, environment: Environment.localFiddler, baseUrl: 'https://welcomemat.com', proxy:fromNullable({port:8888, host:'localhost'})},
}

let api = new TicketsAPI(GetEnvironmentSettings[Environment.localFiddler])
//let api = new TicketsAPI(GetEnvironmentSettings[Environment.development])
// api.TCExample(200)().then(flow(match(x=>x /*?*/, y=>{
//     return y.data /*?*/
// } )))

api.environmentSettings //?
api.GetEnvironmentDetailsTemp().then(y => {
    let message = pipe(y, E.match((x:Error) => `There was an error ${x.message}`, y => y)) //?

})


// api.TCExample(200)().then(flow(match(x=>x /*?*/, y=>y.data /*?*/)))