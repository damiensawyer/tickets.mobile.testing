import {Environment} from "./ticketsCore";
import {fromNullable, Option} from "fp-ts/Option";
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
    proxy:Option<{host:string, port:number}>,
    bearerToken: Option<string>,
    handleSelfSignedCerts: boolean // This is needed to point to local. Note that, if you're going through fiddler, you're good.
}
