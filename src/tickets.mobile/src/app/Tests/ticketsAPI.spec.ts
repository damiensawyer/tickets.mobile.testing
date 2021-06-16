import {GetEnvironmentSettings, Environment, TestSettings, itIfAPI} from "../ticketsCore";
import {isSome} from "fp-ts/Option";
import {AxiosErrorWithNoStatusCode, AxiosErrorWithStatusCode, isStatusCodeError, TicketsAPI} from "../../data/user/tickets-auth-api";
import {pipe} from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import {isLeft, isRight} from "fp-ts/Either";





describe('API Testsdd', () => {
    let api = new TicketsAPI(GetEnvironmentSettings[Environment.development])
    
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

    itIfAPI()('Get BearerToken with bad name still returns successful promise', () => {
        return expect(api.GetBearerToken('damien_bad')()).toBeTruthy()
    })


    //
    // itIfAPI()('Get BearerToken with bad name fails', () => {
    //     return api.GetBearerToken('damien_bad')().then(y => {
    //         return expect(isRight(y)).toBeTruthy()
    //     })
    // });

    // itIfAPI()('should have multiple envrionemnts', () => {
    //     expect(GetEnvironmentSettings[Environment.production]).toBeTruthy()
    //     expect(GetEnvironmentSettings[Environment.development]).toBeTruthy()
    //     // just check some option stuff... practising tests. 
    //     expect(isSome(GetEnvironmentSettings[Environment.local].proxy)).toBeFalsy()
    //     expect(isSome(GetEnvironmentSettings[Environment.localFiddler].proxy)).toBeTruthy()
    // })
})


// let api = new TicketsAPI(GetEnvironmentSettings[Environment.local])
// //let api = new TicketsAPI(GetEnvironmentSettings[Environment.development])
// // api.TCExample(200)().then(flow(match(x=>x /*?*/, y=>{
// //     return y.data /*?*/
// // } )))
//
// //api.environmentSettings //?
// let ss = pipe(api.GetEnvironmentDetailsTemp, TE.map(x=> `hello TE MAP!!!: ${x}`))()
//     .then(y => {
//         pipe(y, E.match((x:Error) => `There was an error ${x.message}`, y => y)) //?
//
//     })
//
// api.GetEnvironmentDetailsTemp().then(y => {
//     pipe(y, E.match((x:Error) => `There was an error ${x.message}`, y => y)) //?
//
// })
//
// api.GetBearerToken('damien')().then(y => {
//     pipe(y, E.match((x:Error) => `There was an error ${x.message}`, y => y.value)) //?
// })
