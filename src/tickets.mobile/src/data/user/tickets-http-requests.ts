import * as TE from "fp-ts/TaskEither";
import axios from "axios";
import {AxiosError, TicketsAPI, ticketsQuery,onRejected} from "./tickets-auth-api";

export const GetBearerToken: ticketsQuery<string, string> = (e: TicketsAPI, shortCode: string) =>
    TE.tryCatch(() => axios.get(`${e.environmentSettings.baseUrl}/phoneapi/apisecuritytokens/GetBearerFromToken?shorttoken=${shortCode}`, e.axiosConfig).then(r => r.data.value), onRejected)

export const RequestShortCodeToEmail: ticketsQuery<string, void> = (e: TicketsAPI, emailAddress: string) =>
    TE.tryCatch(() => axios.post(`${e.environmentSettings.baseUrl}/phoneapi/apisecuritytokens/SendShortTokenToEmail?email=${emailAddress}`, e.axiosConfig).then(r => r.data), onRejected)

export const GetEnvironmentDetails: ticketsQuery<void, string> = (e: TicketsAPI) =>
    TE.tryCatch(() => axios.get(`${e.environmentSettings.baseUrl}/phoneapi/PhoneAPISamples/GetEnvironmentDetails`, e.axiosConfig).then(r => r.data), onRejected)