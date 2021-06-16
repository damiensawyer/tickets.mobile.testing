import {GetEnvironmentSettings, Environment, TestSettings} from "../ticketsCore";
import {isSome} from "fp-ts/Option";
import {TicketsAPI} from "../../data/user/tickets-auth-api";
import {pipe} from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

const itif = () => TestSettings.RunIntegratorTests ? it : it.skip;

describe('placeHolder', () => {
    it('should handle initial state', () => {
        expect(false).toBeFalsy();
    });
})


describe('core tests', () => {
    itif()('should handle initial state', () => {
        expect(false).toBeFalsy();
    });

    itif()('should have multiple envrionemnts', () => {
        expect(GetEnvironmentSettings[Environment.production]).toBeTruthy()
        expect(GetEnvironmentSettings[Environment.development]).toBeTruthy()
        // just check some option stuff... practising tests. 
        expect(isSome(GetEnvironmentSettings[Environment.local].proxy)).toBeFalsy()
        expect(isSome(GetEnvironmentSettings[Environment.localFiddler].proxy)).toBeTruthy()
    })
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
