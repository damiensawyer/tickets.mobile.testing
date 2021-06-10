import {Environment} from "./ticketsCore";
export {$enum } from 'ts-enum-util'; // https://stackoverflow.com/a/49205982/494635 


export interface IDictionary<TValue> {
    [id: string]: TValue;
}


export type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export type EnvironmentSettings = {
    environment: Environment,
    baseUrl: string,
}
