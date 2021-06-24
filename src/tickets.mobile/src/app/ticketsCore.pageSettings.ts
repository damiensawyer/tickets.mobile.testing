import {SettingsPage} from "../features/Settings/SettingsPage";
import {HomePage} from "../features/Home/HomePage";
import {FC} from "react";
import {EnumDictionary} from "./ticketsCore.Tooling";
import {LoginPage} from "../features/Login/LoginPage";
import Counter from "../features/LearningReactPatterns/Counter/Counter";
import PingPong from "../features/LearningReactPatterns/PingPong/PingPong";
import {home,cog,key, calendarNumber, mailOutline, mailSharp} from "ionicons/icons";
import {Logout} from "../features/Login/Logout";

export enum PageName {
    home = "Home",
    settings = "Settings",
    login = "Login",
    counter = "Counter",
    pingPong = "PingPong",
    //logOut = "Logout"
}

interface PageSettingsBase {
    isSecure: boolean,
    url: string,
    iosIcon: string,
    mdIcon: string,
    title: string,
    showIfLoggedOn: boolean
    showIfNotLoggedOn: boolean
}

interface PageSettings extends PageSettingsBase {
    pageName: PageName,
    $Template: FC<{}> // a non alpha first character lets you render it in JSX https://gist.github.com/mikeyamadeo/6bdbbfde7ff0e1c3cf3c 
}

//const defaultPage: Pick<PageSettings, 'requireLogin' | 'title'>  = {requireLogin:true, title:'blah'}  // demo for using multiple keys  
const defaultSecurePage: Pick<PageSettings, 'isSecure' | 'showIfLoggedOn' | 'showIfNotLoggedOn'> = {isSecure: true, showIfLoggedOn:true, showIfNotLoggedOn:false}
const defaultUnsecuredPage: Pick<PageSettings, 'isSecure'| 'showIfLoggedOn' | 'showIfNotLoggedOn'> = {isSecure: false, showIfLoggedOn:true, showIfNotLoggedOn:true}

export const PageSettings: EnumDictionary<PageName, PageSettings> = {
    [PageName.login]: {pageName: PageName.login, $Template: LoginPage, url:'/page/Login', iosIcon:key, mdIcon:key ,title:'Login', ...defaultUnsecuredPage, showIfLoggedOn:false},
    // [PageName.logOut]: {pageName: PageName.logOut, $Template: Logout, url:'/page/Logout', iosIcon:mailOutline, mdIcon:mailSharp ,title:'Logout', ...defaultUnsecuredPage, showIfLoggedOn:true, showIfNotLoggedOn:false},
    [PageName.settings]: {...{pageName: PageName.settings, $Template: SettingsPage, url:'/page/Settings', iosIcon:cog, mdIcon:cog ,title:'Settings'}, ...defaultUnsecuredPage},
    [PageName.home]: {...{pageName: PageName.home, $Template: HomePage, url:'/page/Home', iosIcon:home, mdIcon:home ,title:'Home'}, ...defaultUnsecuredPage},
    [PageName.counter]: {...{pageName: PageName.counter, $Template: Counter, url:'/page/Counter', iosIcon:calendarNumber, mdIcon:calendarNumber ,title:'Counter'}, ...defaultSecurePage},
    [PageName.pingPong]: {...{pageName: PageName.pingPong, $Template: PingPong, url:'/page/PingPong', iosIcon:calendarNumber, mdIcon:calendarNumber ,title:'Ping Pong'}, ...defaultSecurePage},
}

