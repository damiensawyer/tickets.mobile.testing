﻿import * as TE from "fp-ts/TaskEither";
import axios from "axios";
import {AxiosError, TicketsAPI, ticketsQuery,onRejected} from "./tickets-auth-api";

export const GetBearerToken: ticketsQuery<string, string> = (e: TicketsAPI, shortCode: string) =>
    TE.tryCatch(() => axios.get(`${e.environmentSettings.baseUrl}/phoneapi/apisecuritytokens/GetBearerFromToken?shorttoken=${shortCode}`, e.axiosConfig).then(r => r.data.value), onRejected)

export const GetEnvironmentDetails: ticketsQuery<void, string> = (e: TicketsAPI) =>
    TE.tryCatch(() => axios.get(`${e.environmentSettings.baseUrl}/phoneapi/PhoneAPISamples/GetEnvironmentDetails`, e.axiosConfig).then(r => r.data), onRejected)