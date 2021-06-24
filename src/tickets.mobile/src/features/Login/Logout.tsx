import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useHistory, Redirect} from "react-router-dom";
import {setLoggedOut} from "./LoginSlice";
import {none, some} from "fp-ts/Option";
import React, {useEffect, useState} from "react";
import {IonButton, IonIcon, IonItem} from "@ionic/react";
import {History} from 'history';
import {exit, happy, menu} from "ionicons/icons";
import {menuController} from '@ionic/core'
type logoutProps = {menuController:typeof menuController}

// I don't think that this menuController is actually passing down an instance. I suspect that it's ambient. There's this https://github.com/ionic-team/ionic-framework/blob/8e0e5da7407adecb7471b3a6b0ac059337761355/angular/src/providers/menu-controller.ts
// but I'm not sure if that's for Angular only....
// Looks like you can get instances with this menuController.getMenus().then(console.log)    
export const Logout = ({menuController}:logoutProps) => {
    const isLoggedIn = useAppSelector(x => x.loginSlice.isLoggedIn)
    const [confirmMode, setConfirmMode] = useState(false)
    const history = useHistory() // typing from https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
    const dispatch = useAppDispatch();

    return confirmMode
        ? <>
            <IonItem lines="none">
                <IonIcon slot="start" icon={exit}/>
                <IonButton
                    color="danger"
                    size="small"
                    fill="solid"
                    onClick={() => {
                        dispatch(setLoggedOut(none))
                        setConfirmMode(false)
                        history.push('/page/Login')
                        menuController.close().then()
                    }}>Confirm Log Out?</IonButton>
            </IonItem>
            <IonItem lines="none">
                <IonIcon slot="start" icon={happy}/>
                <IonButton
                    color="success"
                    size="small"
                    fill="solid"
                    onClick={() => {
                        setConfirmMode(false)
                    }}>Stay Logged In</IonButton>
            </IonItem>

        </>
        : <>
            <IonItem lines="none">
                <IonIcon slot="start" icon={exit}/>
                <IonButton
                    color="tertiary"
                    size="small"
                    fill="solid"
                    onClick={(e) => {
                        setConfirmMode(true)
                    }}>Log out</IonButton>
            </IonItem>
        </>

};
