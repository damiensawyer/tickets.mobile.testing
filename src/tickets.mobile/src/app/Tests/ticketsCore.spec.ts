import {GetEnvironmentSettings, Environment, TestSettings} from "../ticketsCore";
import {isSome} from "fp-ts/Option";

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
