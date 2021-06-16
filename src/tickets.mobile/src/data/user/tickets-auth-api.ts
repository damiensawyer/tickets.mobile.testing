// https://welcomemat.com/phoneapi/PhoneAPISamples/getnumbers?count=10 
import * as TE from "fp-ts/TaskEither";
import {EnvironmentSettings} from "../../app/ticketsCore.Tooling";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import axios, {AxiosRequestConfig} from "axios";
import {Lazy, pipe} from "fp-ts/function";
import {isSome} from "fp-ts/Option";
import {Either} from "fp-ts/Either";
import {Agent} from "https";

const onRejected: (reason: unknown) => Error = _ => Error(`bbbbb ${_}`)

export class TicketsAPI {
    public axiosConfig: AxiosRequestConfig;
    
    constructor(/**This comes from redux*/ public environmentSettings: EnvironmentSettings) {
        this.axiosConfig = {
            proxy:  (isSome(environmentSettings.proxy) && pipe(environmentSettings.proxy, O.match(() => undefined, x => x))), // possibly don't need to pipe if && is short-circuiting
            headers: {
                ...(isSome(environmentSettings.bearerToken) && {Authorization: `Bearer ${environmentSettings.bearerToken}`}),
                
            },
            httpsAgent:  environmentSettings.handleSelfSignedCerts ?  new Agent({rejectUnauthorized: false}) :  new Agent({rejectUnauthorized: false})
            
        };
        axios.defaults.adapter = require('axios/lib/adapters/http'); // search for "configure axios adapter" from wallaby support in gmail. https://github.com/axios/axios/issues/1754#issuecomment-572778305 
    }
    
    public  GetEnvironmentDetailsTemp = TE.tryCatch<Error, string>(() =>axios.get(`${this.environmentSettings.baseUrl}/phoneapi/PhoneAPISamples/GetEnvironmentDetails`, this.axiosConfig).then(r=>r.data), onRejected)
    //public  GetEnvironmentDetailsTemp = TE.tryCatch<Error, string>(() =>axios.get(`https://welcomemat.com/phoneapi/PhoneAPISamples/GetEnvironmentDetails`, this.axiosConfig).then(r=>r.data), onRejected)


    public  TCExample = (httpCode:number) => TE.tryCatch(() => axios.get(`https://httpstat.us/${httpCode}`), onRejected)
}


//https://dev.tickets.org.au/phoneapi/PhoneAPISamples/GetEnvironmentDetails

 