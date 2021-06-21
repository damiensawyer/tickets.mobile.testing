import {SettingsPage} from "../features/Settings/SettingsPage";
import {HomePage} from "../features/Home/HomePage";
import {FC} from "react";
import {EnumDictionary} from "./ticketsCore.Tooling";
import {LoginPage} from "../features/Login/LoginPage";
import Counter from "../features/LearningReactPatterns/Counter/Counter";
import PingPong from "../features/LearningReactPatterns/PingPong/PingPong";
import {calendarNumber, mailOutline, mailSharp} from "ionicons/icons";

export enum PageName {
    settings = "Settings",
    home = "Home",
    login = "Login",
    counter = "Counter",
    pingPong = "PingPong"
}

interface PageSettingsBase {
    isSecure: boolean,
    url: string,
    iosIcon: string,
    mdIcon: string,
    title: string,
}

interface PageSettings extends PageSettingsBase {
    pageName: PageName,
    $Template: FC<{}> // a non alpha first character lets you render it in JSX https://gist.github.com/mikeyamadeo/6bdbbfde7ff0e1c3cf3c 
}
// const defaultSecurePage: PageSettingsBase = {isSecure: true}
// const defaultUnsecuredPage: PageSettingsBase = {isSecure: false}
const defaultSecurePage: Pick<PageSettings, 'isSecure'> = {isSecure: true}
const defaultUnsecuredPage: Pick<PageSettings, 'isSecure'> = {isSecure: false}

export const PageSettings: EnumDictionary<PageName, PageSettings> = {
    [PageName.login]: {...{pageName: PageName.login, $Template: LoginPage, url:'/page/Login', iosIcon:mailOutline, mdIcon:mailSharp ,title:'Login'}, ...defaultSecurePage},
    [PageName.settings]: {...{pageName: PageName.settings, $Template: SettingsPage, url:'/page/Settings', iosIcon:mailOutline, mdIcon:mailSharp ,title:'Settings'}, ...defaultSecurePage},
    [PageName.home]: {...{pageName: PageName.home, $Template: HomePage, url:'/page/Home', iosIcon:mailOutline, mdIcon:mailSharp ,title:'Home'}, ...defaultUnsecuredPage},
    [PageName.counter]: {...{pageName: PageName.counter, $Template: Counter, url:'/page/Counter', iosIcon:calendarNumber, mdIcon:calendarNumber ,title:'Counter'}, ...defaultUnsecuredPage},
    [PageName.pingPong]: {...{pageName: PageName.pingPong, $Template: PingPong, url:'/page/PingPong', iosIcon:calendarNumber, mdIcon:calendarNumber ,title:'Ping Pong'}, ...defaultUnsecuredPage},
}

