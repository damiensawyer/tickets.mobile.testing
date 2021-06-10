import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "./hooks";
import {setPing} from "../features/LearningReactPatterns/PingPong/PingPongSlice";
export * from './ticketsCore.pageSettings'
export enum Environment {
    production = "production",
    development = "development",
    local = 'local'
}

export type EnvironmentSettings = {
    environment: Environment,
    baseUrl: string,
}

// export const trippleNumber = (a: number): number => a * 3;
export const GetEnvironmentSettings = (e: Environment): EnvironmentSettings => {
    switch (e) {
        case Environment.development:
            return {environment: Environment.local, baseUrl: 'https://dev.tickets.org.au'}
        case Environment.production:
            return {environment: Environment.local, baseUrl: 'https://app.tickets.org.au'}
        case Environment.local:
            return {environment: Environment.local, baseUrl: 'https://welcomemat.com'}
    }
}


export interface IDictionary<TValue> {
    [id: string]: TValue;
}


export type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};



export const RunSetup = () => {
    let dispatch = useDispatch()
    if (!useAppSelector(x => x.pingPong.isStarted))
        dispatch(setPing())


}