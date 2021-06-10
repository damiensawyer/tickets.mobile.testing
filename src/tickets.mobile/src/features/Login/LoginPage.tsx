import {useParams} from 'react-router';
import {useState} from "react";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonCol, IonContent,
    IonDatetime,
    IonHeader,
    IonIcon, IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText, IonTitle,
    IonToggle,
    IonToolbar
} from "@ionic/react";
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!username) {
            setUsernameError(true);
        }
        if (!password) {
            setPasswordError(true);
        }

        if (username && password) {
            // await setIsLoggedIn(true);
            // await setUsernameAction(username);
        }
    };

    return (
        <>

            <div className="login-logo">
                <IonImg class="small" src="assets/tickets-logo-colour-rgb.png"></IonImg>
            </div>

            <form noValidate onSubmit={login}>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked" color="primary">Username</IonLabel>
                        <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                                  required>
                        </IonInput>
                    </IonItem>

                    {formSubmitted && usernameError && <IonText color="danger">
                        <p className="ion-padding-start">
                            Username is required
                        </p>
                    </IonText>}

                    <IonItem>
                        <IonLabel position="stacked" color="primary">Password</IonLabel>
                        <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                        </IonInput>
                    </IonItem>

                    {formSubmitted && passwordError && <IonText color="danger">
                        <p className="ion-padding-start">
                            Password is required
                        </p>
                    </IonText>}
                </IonList>

                <IonRow>
                    <IonCol>
                        <IonButton type="submit" expand="block">Login</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
                    </IonCol>
                </IonRow>
            </form>
        </>

    );
};