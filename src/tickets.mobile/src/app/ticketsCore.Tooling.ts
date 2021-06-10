import {Environment} from "./ticketsCore";

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
