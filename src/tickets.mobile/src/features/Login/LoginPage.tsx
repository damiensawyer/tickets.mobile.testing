import {useParams} from 'react-router';
import React, {useState} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonDatetime, IonIcon, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonToggle} from "@ionic/react";
import {Environment} from "../../app/ticketsCore";
import {$enum} from "ts-enum-util";
import {bookmarkOutline, mailOutline, mailSharp, moonOutline, calendarNumber, airplane} from 'ionicons/icons';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {
    setEnvironment
} from '../Settings/settingsSlice';

const selectOptions = {
    //header: 'Select a Location'
};


export const LoginPage: React.FC = (b) => {
    let activeSettings = (useAppSelector(x => x.settings.activeSettings))
    let dispatch = useAppDispatch()
    return (
        <>
            <IonItem>
                <IonCard color='secondary'>
                    <IonCardContent color='primary'>
                        Note that some of these settings will just be for testing. I'll hide non appropraite ones  away for production builds
                    </IonCardContent>
                </IonCard>
                
                
            </IonItem>
            
            <IonItem>
                <IonIcon slot="start" icon={airplane}></IonIcon>
                


                <IonList slot="end" lines="none">
                    <IonItem>
                        <IonSelect value={activeSettings.environment} interfaceOptions={selectOptions} onIonChange={(e) => dispatch(setEnvironment(e.detail.value))}>
                            {$enum(Environment).map(x => (
                                <IonSelectOption key={x} value={x}>{x.toString()}</IonSelectOption>

                            ))}
                        </IonSelect>
                    </IonItem>

                </IonList>
            </IonItem>
        </>)
}