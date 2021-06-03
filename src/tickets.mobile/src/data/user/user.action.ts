import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';


export const getUserData = async () => {
    const response = await Promise.all([
        Storage.get({ key: HAS_LOGGED_IN }),
        Storage.get({ key: HAS_SEEN_TUTORIAL }),
        Storage.get({ key: USERNAME })]);
    const isLoggedin = await response[0].value === 'true';
    const hasSeenTutorial = await response[1].value === 'true';
    const username = await response[2].value || undefined;
    const data = {
        isLoggedin,
        hasSeenTutorial,
        username
    }
    return data;
}


export interface DispatchObject {
    [key: string]: any,
    type: string
}

type PromiseResolveValue<T> = T extends Promise<infer R> ? R : T;
type EffectType<T extends (...args: any) => any> = ReturnType<ReturnType<T>>;

type EffectReturnValue<T extends (...args: any) => any> = PromiseResolveValue<EffectType<T>>;

export type ActionType<T extends (...args: any) => any> = ReturnType<T> extends DispatchObject ? ReturnType<T> : EffectReturnValue<T>

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
    const data = await getUserData();

}


export const setDarkMode = (darkMode: boolean) => ({
    type: 'set-dark-mode',
    darkMode
} as const);

export type UserActions =
    | ActionType<typeof setDarkMode>
