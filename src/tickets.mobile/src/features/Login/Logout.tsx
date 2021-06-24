import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useHistory, Redirect} from "react-router-dom";
import {setLoggedOut} from "./LoginSlice";
import {none, some} from "fp-ts/Option";
import React, {useEffect, useState} from "react";
import {IonButton, IonIcon, IonItem} from "@ionic/react";
import {History} from 'history';
import {exit, happy} from "ionicons/icons";
//type logoutProps = {confirmMode:boolean}
export const Logout = () => {
    const isLoggedIn = useAppSelector(x => x.loginSlice.isLoggedIn)
    const [confirmMode, setConformMode] = useState(false)
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
                        setConformMode(false)
                        history.push('/page/Login')
                    }}>Confirm Log Out?</IonButton>
            </IonItem>
            <IonItem lines="none">
                <IonIcon slot="start" icon={happy}/>
                <IonButton
                    color="success"
                    size="small"
                    fill="solid"
                    onClick={() => {
                        setConformMode(false)
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
                    onClick={() => {
                        setConformMode(true)
                    }}>Log out</IonButton>
            </IonItem>
        </>

};
