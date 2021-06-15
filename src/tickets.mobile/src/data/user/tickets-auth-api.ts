// https://welcomemat.com/phoneapi/PhoneAPISamples/getnumbers?count=10 

import {EnvironmentSettings} from "../../app/ticketsCore.Tooling";
import * as O from "fp-ts/Option";
import {AxiosRequestConfig} from "axios";
import {pipe} from "fp-ts/function";

export class TicketsAPI {
    private config: AxiosRequestConfig;

    constructor(public environmentSettings: EnvironmentSettings) {
        
        // perhaps get config from redux state?
        this.config = {
            proxy: pipe(environmentSettings.proxy, O.match(() => undefined, x => x)),
            headers: {
                Authorization: "bearer abc"
            },
        };

    }


    //export const  GetNumbers:TaskEither<{}> 
}
