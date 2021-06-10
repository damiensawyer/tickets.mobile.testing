import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {useAppSelector} from "./hooks";
import {setPing} from "../features/LearningReactPatterns/PingPong/PingPongSlice";
import {Dispatch} from "redux";
import {SettingsPage} from "../features/Settings/SettingsPage";
import {HomePage} from "../features/Home/HomePage";
import {FC} from "react";

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

export enum PageName {
    settings = "Settings",
    home = "Home"
}

export interface IDictionary<TValue> {
    [id: string]: TValue;
}


export type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

interface PageSettingsBase {
    isSecure: boolean,
}

interface PageSettings extends PageSettingsBase {
    pageName: PageName,
    $Template: FC<{}> // a non alpha first character lets you render it in JSX https://gist.github.com/mikeyamadeo/6bdbbfde7ff0e1c3cf3c 
}
const defaultSecurePage: PageSettingsBase = {isSecure: true}
const defaultUnsecuredPage: PageSettingsBase = {isSecure: false}

export const PageSettings: EnumDictionary<PageName, PageSettings> = {
    //[PageName.settings]: {...{pageName: PageName.settings, $Template: SettingsPage}, ...defaultSecurePage},
    [PageName.settings]: {...{pageName: PageName.settings, $Template: SettingsPage}, ...defaultSecurePage},
    [PageName.home]: {...{pageName: PageName.home, $Template: HomePage}, ...defaultUnsecuredPage},
};


export const RunSetup = () => {
    let dispatch = useDispatch()
    if (!useAppSelector(x => x.pingPong.isStarted))
        dispatch(setPing())


}