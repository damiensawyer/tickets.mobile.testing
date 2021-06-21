import {calendarNumber, mailOutline, mailSharp} from "ionicons/icons";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    requireLogin: boolean;
}

//const defaultPage: Pick<AppPage, 'requireLogin' | 'title'>  = {requireLogin:true, title:'blah'}  // demo for using mutiple keyes  
const securePage: Pick<AppPage, 'requireLogin'> = {requireLogin: true}
const publicPage: Pick<AppPage, 'requireLogin'> = {requireLogin: true}

export const appPages: AppPage[] = [
    {
        ...publicPage,
        title: 'Settings',
        url: '/page/Settings',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
    },
    {
        ...publicPage,
        title: 'Home',
        url: '/page/Home',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        ...publicPage,
        title: 'Login',
        url: '/page/Login',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        ...securePage,
        title: 'Counter',
        url: '/study/Counter',
        iosIcon: calendarNumber,
        mdIcon: calendarNumber
    },
    {
        ...securePage,
        title: 'PingPong',
        url: '/study/PingPong',
        iosIcon: calendarNumber,
        mdIcon: calendarNumber
    }
];