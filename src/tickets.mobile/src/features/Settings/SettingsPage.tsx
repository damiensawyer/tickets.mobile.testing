import {useParams} from 'react-router';
import React, {useState} from "react";
import {IonDatetime, IonItem, IonLabel, IonList, IonSelect, IonSelectOption} from "@ionic/react";

const selectOptions = {
    header: 'Select a Location'
};

export const SettingsPage: React.FC = (b) => {
    
    const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');

    return (<IonList lines="none">
        <IonItem>
            <IonLabel>
                Location
            </IonLabel>
            <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                <IonSelectOption value="madison">Madison, WI</IonSelectOption>
                <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
            </IonSelect>
        </IonItem>
    </IonList>)
}