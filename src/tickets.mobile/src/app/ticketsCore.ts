// https://www.typescriptlang.org/docs/handbook/modules.html
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "./hooks";
import {EnumDictionary, EnvironmentSettings} from "./ticketsCore.Tooling";
import {setPing} from "../features/LearningReactPatterns/PingPong/PingPongSlice";
import {fromNullable} from "fp-ts/Option";
import {from} from "rxjs";
import {EnumValueMappee} from "ts-enum-util";
export type {EnvironmentSettings} from "./ticketsCore.Tooling";
export * from './ticketsCore.pageSettings';

export enum Environment {
    production = "Production",
    development = "Development",
    local = "Localhost",
    localFiddler = "Local Fidler"
}

export const defaultEnvironment: EnvironmentSettings = {
    baseUrl: "",
    environment: Environment.local, 
    proxy: fromNullable(undefined)
}

export const GetEnvironmentSettings: EnumDictionary<Environment, EnvironmentSettings> = {
    [Environment.development]: {...defaultEnvironment, environment: Environment.development, baseUrl: 'https://dev.tickets.org.au'},
    [Environment.production]: {...defaultEnvironment, environment: Environment.production, baseUrl: 'https://app.tickets.org.au'},
    [Environment.local]: {...defaultEnvironment, environment: Environment.local, baseUrl: 'https://welcomemat.com'},
    [Environment.localFiddler]: {...defaultEnvironment, environment: Environment.localFiddler, baseUrl: 'https://welcomemat.com', proxy:fromNullable({port:8888, host:'localhost'})},
}


let  s = GetEnvironmentSettings[Environment.local] //?
export const RunSetup = () => {
    let dispatch = useDispatch()
    // if (!useAppSelector(x => x.pingPong.isStarted))
    //     dispatch(setPing())

}