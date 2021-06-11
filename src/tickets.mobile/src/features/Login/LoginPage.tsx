import {useRef, useState} from "react";
import {
    IonButton,
    IonCard, IonCardHeader, IonCardTitle,
    IonCol, IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonText, IonTitle
} from "@ionic/react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fromNullable, isNone, isSome} from "fp-ts/Option";

const selectOptions = {
    //header: 'Select a Location'
};


export const LoginPage: React.FC = (b) => {

    enum modes {enterEmail, enterShortSCode}

    const [mode, setMode] = useState(modes.enterEmail);
    const [emailError, setEmailError] = useState(false);
    const [shortCodeError, setShortCodeErrror] = useState(false);
    const [email, setEmail] = useState('');
    let eee = ''
    
    const emailInput = useRef<HTMLIonInputElement | null>(null);
    
    const requestEmail = () => {
        
        let data = fromNullable(eee.toString())
        console.log('request email')
        if (isNone(data) || data.value === '') {
            setEmailError(true)
        } else {
            setEmailError(false)
        }

    }
    const submitShortCode = () => {
    }
    const Login = () => <>
        <div className="login-logo">
            <IonImg class="small" src="assets/tickets-logo-colour-rgb.png"></IonImg>
        </div>
        <IonTitle><h1>Login</h1></IonTitle>

        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Step 1</IonCardTitle>
                <p>Please enter the email associated with your tickets.org.au account. If you logged in with Google or Facebook, please use the email asscociated with that account. If we find an account associated with that address we will email you a login code which you can enter below.</p>

            </IonCardHeader>

            <IonList>
                <IonItem>
                    <IonLabel position="floating" color="primary">Email Address</IonLabel>
                    <IonInput name="email" type="email" value={email} ref={emailInput} spellCheck={false} autocapitalize="off" onIonChange={e => eee = e.detail.value!}

                              required>
                    </IonInput>
                </IonItem>
                
                {emailError && <IonText color="danger">
                    <p className="ion-padding-start">
                        Email is required
                    </p>
                </IonText>}

                <IonRow className='ion-padding'>
                    <IonCol>
                        <IonButton expand="block" onClick={() => {
                            requestEmail()
                        }}>Request Login Code via Email</IonButton>
                    </IonCol>
                </IonRow>
            </IonList>
        </IonCard>

        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Step 2</IonCardTitle>
                <p>Please enter the login code you received via email in step 1 </p>
            </IonCardHeader>

            <IonList>
                <IonItem>
                    <IonLabel position="floating" color="primary">Login Code</IonLabel>
                    <IonInput name="email" type="email" value={email} ref={emailInput} spellCheck={false} autocapitalize="off"

                              required>
                    </IonInput>
                </IonItem>

                {shortCodeError && <IonText color="danger">
                    <p className="ion-padding-start">
                        Email is required
                    </p>
                </IonText>}

                <IonRow className='ion-padding'>
                    <IonCol>
                        <IonButton expand="block" onClick={() => {
                            submitShortCode()
                        }}>Login with Code</IonButton>
                    </IonCol>
                </IonRow>
            </IonList>

        </IonCard>


    </>

    return (
        <Login/>
    )
        ;
};