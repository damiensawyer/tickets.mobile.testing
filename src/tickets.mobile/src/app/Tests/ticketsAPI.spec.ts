import {GetEnvironmentSettings, Environment, TestSettings, itIfAPI} from "../ticketsCore";
import {isSome, none, some} from "fp-ts/Option";
import {AxiosErrorWithNoStatusCode, AxiosErrorWithStatusCode, isStatusCodeError, TicketsAPI} from "../../data/user/tickets-auth-api";
import {isLeft, isRight} from "fp-ts/Either";

import '@relmify/jest-fp-ts';


describe('API Testsdd', () => {
    let api = new TicketsAPI(GetEnvironmentSettings[Environment.development])

    it('Tests jest-fp-ts', () => {
        expect(some(10)).toBeOption()
        expect(some(10)).toBeSome()
        expect(none).toBeNone()
    })

    itIfAPI()('Get BearerToken with test name', () => {
        return api.GetBearerToken('damien')().then(y => {
            expect(isRight(y)).toBeTruthy()
        })
    })

    itIfAPI()('Get BearerToken with bad test name gets 403', () => {
        return api.GetBearerToken('damienbad')().then(y => {
            expect(isLeft(y)).toBeTruthy()
            if (isLeft(y) && isStatusCodeError(y.left))
                expect(y.left.status).toEqual(403)
            else
                expect(false).toBeTruthy()
        })
    })

    itIfAPI()('Get BearerToken with bad test name gets 403 - with jest-fp-ts', () => {
        return api.GetBearerToken('damienbad')().then(y => {
            expect(y).toBeEither()
            //expect(y).toSubsetEqualLeft(<AxiosErrorWithStatusCode>{status:404})
            expect(y).toBeLeft()
                //expect(y).toBeRight()


            // if (isLeft(y) && isStatusCodeError(y.left))
            //     expect(y.left.status).toEqual(403)
            // else
            //     expect(false).toBeTruthy()
        })
    })



    itIfAPI()('Get BearerToken with bad name still returns successful promise', () => {
        return expect(api.GetBearerToken('damien_bad')()).toBeTruthy()
    })

})
