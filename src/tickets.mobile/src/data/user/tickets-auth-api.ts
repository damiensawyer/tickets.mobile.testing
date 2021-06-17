// https://welcomemat.com/phoneapi/PhoneAPISamples/getnumbers?count=10 
import * as TE from "fp-ts/TaskEither";
import {EnvironmentSettings} from "../../app/ticketsCore.Tooling";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import axios, {AxiosRequestConfig, CancelTokenSource} from "axios";
import {Lazy, pipe} from "fp-ts/function";
import {isSome} from "fp-ts/Option";
import {Either} from "fp-ts/Either";
import {Agent} from "https";

const onRejected: (reason: unknown) => AxiosError = (r: any) => !!r.response
    ? {status: r.response.status, statusText: r.response.statusText}
    : {code: r.code}

export interface AxiosErrorWithStatusCode {
    /**The status code returned with the error. Eg 403 */
    status: number,
    statusText: string,
}

/** Get these when you get the host wrong etc. */
export interface AxiosErrorWithNoStatusCode {
    code: number
}

/** Type Guard to ascertain error type*/
export function isStatusCodeError(axiosError: AxiosError): axiosError is AxiosErrorWithStatusCode {
    return !!(axiosError as AxiosErrorWithStatusCode).status;
}


export type AxiosError = AxiosErrorWithStatusCode | AxiosErrorWithNoStatusCode

export class TicketsAPI {
    public axiosConfig: AxiosRequestConfig;
    public axiosCancellationSource: CancelTokenSource;
    
    constructor(/**This comes from redux*/ public environmentSettings: EnvironmentSettings) {
        
        this.axiosCancellationSource = axios.CancelToken.source();
        this.axiosConfig = {
            proxy: (isSome(environmentSettings.proxy) && pipe(environmentSettings.proxy, O.match(() => undefined, x => x))), // possibly don't need to pipe if && is short-circuiting
            headers: {
                ...(isSome(environmentSettings.bearerToken) && {Authorization: `Bearer ${environmentSettings.bearerToken}`}),

            },
            httpsAgent: true || environmentSettings.handleSelfSignedCerts ? new Agent({rejectUnauthorized: false}) : new Agent({rejectUnauthorized: false}),
            cancelToken: this.axiosCancellationSource.token

        };
        axios.defaults.adapter = require('axios/lib/adapters/http'); // search for "configure axios adapter" from wallaby support in gmail. https://github.com/axios/axios/issues/1754#issuecomment-572778305 
    }

    public GetBearerToken = (shortCode: string) =>
        TE.tryCatch<AxiosError, { value: string }>(() => axios.get(`${this.environmentSettings.baseUrl}/phoneapi/apisecuritytokens/GetBearerFromToken?shorttoken=${shortCode}`, this.axiosConfig).then(r => r.data), onRejected)

    public GetEnvironmentDetailsTemp = TE.tryCatch<AxiosError, string>(() => axios.get(`${this.environmentSettings.baseUrl}/phoneapi/PhoneAPISamples/GetEnvironmentDetails`, this.axiosConfig).then(r => r.data), onRejected)


    public TCExample = (httpCode: number) => TE.tryCatch(() => axios.get(`https://httpstat.us/${httpCode}`), onRejected)
}


//https://dev.tickets.org.au/phoneapi/PhoneAPISamples/GetEnvironmentDetails

 