import {GetEnvironmentSettings, Environment, TestSettings, itIfAPI} from "../ticketsCore";
import {isSome, none, some} from "fp-ts/Option";
import {AxiosErrorWithNoStatusCode, AxiosErrorWithStatusCode, isStatusCodeError, TicketsAPI} from "../../data/user/tickets-auth-api";
import {isLeft, isRight, left, right} from "fp-ts/Either";
import '@relmify/jest-fp-ts';
import {GetBearerToken, GetEnvironmentDetails} from "../../data/user/tickets-http-requests";
//import {right} from "fp-ts/These";

describe('API Tests', () => {
    let api = new TicketsAPI(GetEnvironmentSettings[Environment.local])

    it('Tests jest-fp-ts', () => {
        expect(some(10)).toBeOption()
        expect(some(10)).toBeSome()
        expect(none).toBeNone()
    })

    itIfAPI()('Get BearerToken with bad test name gets 403 - with jest-fp-ts', () => {
        return GetBearerToken(api,'damienbad')().then(y => {
            expect(y).toBeEither()
            expect(y).toSubsetEqualLeft(<AxiosErrorWithStatusCode>{status: 403})
            expect(y).toBeLeft()
        })
    })

    itIfAPI()('Get BearerToken with good test gets 200', () => {
        return GetBearerToken(api,'emma')().then(y => {
            expect(y).toBeEither()
            expect(y).toBeRight()
            expect(y).toBeTruthy()
        })
    })

    itIfAPI()('Get Environment Details', () => {
        return GetEnvironmentDetails(api)().then(y => {
            expect(y).toBeEither()
            expect(y).toBeRight()
            if (isRight(y))
                expect(y.right).toMatch(/local development/i)
        })
    })
    
})


