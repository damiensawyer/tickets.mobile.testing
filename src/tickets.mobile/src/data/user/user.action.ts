// DAMIEN - this is from original demo.... not wired up yet... 

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

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
    const data = await getUserData();

}

