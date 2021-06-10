import {constants} from "os";
import EINTR = module

export enum Environment {
    production = "production",
    development = "development",
    local = 'local'
}

export type EnvironmentSettings = {
    environment: Environment,
    baseUrl: string,
}

// export const trippleNumber = (a: number): number => a * 3;
export const GetEnvironmentSettings = (e: Environment): EnvironmentSettings => {
    switch (e) {
        case Environment.development:
            return {environment: Environment.local, baseUrl: 'https://dev.tickets.org.au'}
        case Environment.production:
            return {environment: Environment.local, baseUrl: 'https://app.tickets.org.au'}
        case Environment.local:
            return {environment: Environment.local, baseUrl: 'https://welcomemat.com'}
    }
}

// export enum PageName {
//     settings = "Settings",
// };

// interface PageSettingsBase {
//     isSecure:boolean
// }

// export interface PageSettings extends PageSettingsBase {
//     page: PageName
// }
//
// const defaultSecurePage:PageSettingsBase = {isSecure:true}
// let ss:PageSettings = {page:PageName.settings, isSecure:false}
// const Pages = {
//     settings:<PageSettings>{...defaultSecurePage}
// } 
// let s = Pages //?




export enum PageName {
    settings = "Settings",
    home = "Home"
};

interface IDictionary<TValue> {
    [id: string]: TValue;
}

export  const pageSettings:IDictionary<PageSettings> = {
    '':{pageName:PageName.settings, isSecure:true}
    // settings: <PageSettings>{...defaultSecurePage, ...{pageName: PageName.settings}},
    // home: <PageSettings>{...defaultSecurePage, ...{pageName: PageName.home}}
}


type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum Direction {
    Up,
    Down,
}

export interface PageSettingsBase {
    isSecure:boolean
}

export interface PageSettings extends PageSettingsBase
{
    pageName:PageName

}

const defaultSecurePage:PageSettingsBase = {isSecure:true}
const defaultUnsecuredPage:PageSettingsBase = {isSecure:false}

const a: EnumDictionary<PageName, PageSettings> = {
    [PageName.settings]: <PageSettings>{...defaultSecurePage, ...{pageName: PageName.settings}},
    [PageName.home]: <PageSettings>{...defaultUnsecuredPage, ...{pageName: PageName.settings}},
};
 //?

// export type PageSettings = {
//     isSecure:boolean,
//     pageName:PageName
// }
//
// const defaultSecurePage:Partial<PageSettings> = {isSecure:true}
//
// export class allPages {
//     settings:PageSettings = {...defaultSecurePage, pageName:PageName.settings}
// }
//
//
//



// export class allPages {
//     settings:PageSettings = {...defaultSecurePage, ...{pageName:PageName.settings}}
//     home:PageSettings = {...defaultUnsecuredPage, ...{pageName:PageName.home}}
// }
// export const pageSettings = {
//     settings: <PageSettings>{...defaultSecurePage, ...{pageName: PageName.settings}},
//     home: <PageSettings>{...defaultSecurePage, ...{pageName: PageName.home}}
// }
// pageSettings //?
// // var s = new allPages()
// // s //?
// //
//








// export const Pages = (): PageSettings[] => {return []}
//
//const allTypes: {[key: string]: boolean} = { jpg: true, gif: true, png: true, mp4: false };
// const allPages: {[key:string]: PageSettings} = {
//     'asd':{page:PageName.settings, isSecure:false},
// }


export default class TicketsCore {

}