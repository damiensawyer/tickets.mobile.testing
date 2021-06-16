import {GetEnvironmentSettings, Environment, TestSettings} from "../ticketsCore";
import {isSome, some} from "fp-ts/Option";
import {EnvironmentFunctions} from '../ticketsCore.Tooling'

describe('placeHolder', () => {
    it('should handle initial state', () => {
        expect(false).toBeFalsy();
    });
})


describe('core tests', () => {
    it('should handle initial state', () => {
        expect(false).toBeFalsy();
    });

    it('should have multiple envrionemnts', () => {
        expect(GetEnvironmentSettings[Environment.production]).toBeTruthy()
        expect(GetEnvironmentSettings[Environment.development]).toBeTruthy()
        // just check some option stuff... practising tests. 
        expect(isSome(GetEnvironmentSettings[Environment.local].proxy)).toBeFalsy()
        expect(isSome(GetEnvironmentSettings[Environment.localFiddler].proxy)).toBeTruthy()
    })

    it('should correctly report logged in', () => {
        let e = GetEnvironmentSettings[Environment.production]
        expect(EnvironmentFunctions.isLoggedIn(e)).toBeFalsy()
        e.bearerToken = some('hello')
        expect(EnvironmentFunctions.isLoggedIn(e)).toBeTruthy()
    })
})
