﻿// https://welcomemat.com/phoneapi/PhoneAPISamples/getnumbers?count=10 
import * as TE from "fp-ts/TaskEither";
import {TaskEither} from "fp-ts/TaskEither";
import {EnvironmentSettings} from "../../app/ticketsCore.Tooling";
import * as O from "fp-ts/Option";
import {isSome} from "fp-ts/Option";
import axios, {AxiosRequestConfig, CancelTokenSource} from "axios";
import {pipe} from "fp-ts/function";
import {Agent} from "https";
import {Observable} from "rxjs";
import {isRight} from "fp-ts/Either";

export const onRejected: (reason: unknown) => AxiosError = (r: any) => !!r.response
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
export type ticketsQuery<TProps, TResult> = (e:TicketsAPI, p:TProps)=>TaskEither<AxiosError, TResult>

/**Wraps an axios query in an observable. If the Observable is cancelled (eg, by a SwitchMap), then the http request is cancelled too */
export const AxiosRequest$ = <TProps, TResult>(environmentSettings: EnvironmentSettings, p: TProps, f: ticketsQuery<TProps, TResult>): Observable<TResult> =>
    new Observable((s) => {
        let api = new TicketsAPI(environmentSettings)
        f(api, p)().then(r => {

            if (isRight(r)) {
                s.next(r.right)
                s.complete()
            } else {
                if (isStatusCodeError(r.left))
                    s.error(`${r.left.status} ${r.left.statusText}`)
                else
                    s.error(`error from http call ${r.left.code}`)
            }
        })
        return () => {
            api.axiosCancellationSource.cancel()
        };
    });


export class TicketsAPI {
    public axiosConfig: AxiosRequestConfig;
    public axiosCancellationSource: CancelTokenSource;

    constructor(/**This comes from redux*/ public environmentSettings: EnvironmentSettings) {
        
        this.axiosCancellationSource = axios.CancelToken.source();
        this.axiosConfig = {
            proxy: (isSome(environmentSettings.proxy) && pipe(environmentSettings.proxy, O.match(() => undefined, x => x))), // possibly don't need to pipe if && is short-circuiting
            headers: {
                ...(isSome(environmentSettings.bearerToken) && {Authorization: `Bearer ${environmentSettings.bearerToken.value}`}),

            },
            httpsAgent: true || environmentSettings.handleSelfSignedCerts ? new Agent({rejectUnauthorized: false}) : new Agent({rejectUnauthorized: false}),
            cancelToken: this.axiosCancellationSource.token

        };
        axios.defaults.adapter = require('axios/lib/adapters/http'); // search for "configure axios adapter" from wallaby support in gmail. https://github.com/axios/axios/issues/1754#issuecomment-572778305 
    }


    public TCExample = (httpCode: number) => TE.tryCatch(() => axios.get(`https://httpstat.us/${httpCode}`), onRejected)
}


//https://dev.tickets.org.au/phoneapi/PhoneAPISamples/GetEnvironmentDetails

 