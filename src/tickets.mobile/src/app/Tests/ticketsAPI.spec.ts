import {GetEnvironmentSettings, Environment, TestSettings, itIfAPI} from "../ticketsCore";
import {isSome, none, some} from "fp-ts/Option";
import {AxiosErrorWithNoStatusCode, AxiosErrorWithStatusCode, isStatusCodeError, TicketsAPI} from "../../data/user/tickets-auth-api";
import {isLeft, isRight} from "fp-ts/Either";
import {interval, lastValueFrom, of, pipe, from, firstValueFrom} from 'rxjs';
import { concatWith, combineLatestWith } from 'rxjs/operators';

import '@relmify/jest-fp-ts';
import {observe} from "web-vitals/dist/modules/lib/observe";

describe('API Tests', () => {
    let api = new TicketsAPI(GetEnvironmentSettings[Environment.local])

    it('Tests jest-fp-ts', () => {
        expect(some(10)).toBeOption()
        expect(some(10)).toBeSome()
        expect(none).toBeNone()
    })


    itIfAPI()('Get BearerToken with bad test name gets 403 - with jest-fp-ts', () => {
        return api.GetBearerToken('damienbad')().then(y => {
            expect(y).toBeEither()
            expect(y).toSubsetEqualLeft(<AxiosErrorWithStatusCode>{status: 403})
            expect(y).toBeLeft()
        })
    })
    
})


