import {SettingsPage} from "../features/Settings/SettingsPage";
import {HomePage} from "../features/Home/HomePage";
import {FC} from "react";
import {EnumDictionary} from "./ticketsCore.Tooling";
import {LoginPage} from "../features/Login/LoginPage";

export enum PageName {
    settings = "Settings",
    home = "Home",
    login = "Login"
}


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
    
    [PageName.login]: {...{pageName: PageName.login, $Template: LoginPage}, ...defaultSecurePage},
    [PageName.settings]: {...{pageName: PageName.settings, $Template: SettingsPage}, ...defaultSecurePage},
    [PageName.home]: {...{pageName: PageName.home, $Template: HomePage}, ...defaultUnsecuredPage},
}
