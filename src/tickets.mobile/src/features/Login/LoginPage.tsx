import {forwardRef, useImperativeHandle, useRef, useState} from "react";
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

//export const LoginLabel: React.FC<{visible:boolean, text:string}> = ({visible, text}) => visible ?  <IonText color="danger"><p className="ion-padding-start">{text}</p></IonText> : null


// https://stackoverflow.com/a/55889638/494635
// https://www.tutorialspoint.com/reactjs-useimperativehandle-hook

const LoginLabel = forwardRef((props, ref) => {
    const [visible, _setVisible] = useState(false);
    const [text, _setText] = useState('');

    useImperativeHandle(ref, () => {
        return {
            setVisible: _setVisible,
            setText: _setText

        }
    });

    return visible ? <IonText color="danger">{text}</IonText> : <IonText>&nbsp;</IonText>
});

export const LoginPage: React.FC = (b) => {
    console.log('LOGIN RENDERING???')

    enum modes {enterEmail, enterShortSCode}

    const [mode, setMode] = useState(modes.enterEmail);
    //const [emailError, setEmailError] = useState(false);

    const [shortCodeError, setShortCodeErrror] = useState(false);
    //const [eE, setEE] = useState(false);
    //const [email, setEmail] = useState('');
    let emailCapturedText = ''
    let shortCodeCapturedText = ''
    const [instanceKey, setInstanceKey] = useState(0)

    const emailInput = useRef<HTMLIonInputElement | null>(null);
    const emailErrorLabel = useRef<typeof LoginLabel>(null);
    const shortTokenErrorLabel = useRef<typeof LoginLabel>(null);
    const requestEmail = () => {
        let data = fromNullable(emailCapturedText)
        if (isNone(data) || data.value === '') {
            let l = (emailErrorLabel.current! as any);
            l.setVisible(true)
            l.setText('please enter an email')
        } else {
            (emailErrorLabel.current! as any).setVisible(false)
        }
    }
    const submitShortCode = () => {
        let data = fromNullable(shortCodeCapturedText)
        if (isNone(data) || data.value === '') {
            let l = (shortTokenErrorLabel.current! as any);
            l.setVisible(true)
            l.setText('please enter code')
        } else {
            (shortTokenErrorLabel.current! as any).setVisible(false)
            
        }
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

            <IonList lines={'none'}>
                <IonItem>
                    <IonLabel position="floating" color="primary">Email Address</IonLabel>
                    <IonInput name="email" type="email" value={''} ref={emailInput} spellCheck={false} autocapitalize="off" onIonChange={e => emailCapturedText = e.detail.value!}> </IonInput>
                    <LoginLabel ref={emailErrorLabel}/>
                </IonItem>

                <IonRow className='ion-padding'>
                    <IonCol>
                        <IonButton expand="block" onClick={requestEmail}>Request Login Code via Email</IonButton>
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
                    <IonInput name="email" type="email" value={''} ref={emailInput} spellCheck={false} autocapitalize="off" onIonChange={e => shortCodeCapturedText = e.detail.value!}></IonInput>
                    <LoginLabel ref={shortTokenErrorLabel}/>
                </IonItem>

                <IonRow className='ion-padding'>
                    <IonCol>
                        <IonButton expand="block" onClick={submitShortCode}>Login with Code</IonButton>
                    </IonCol>
                </IonRow>
            </IonList>

        </IonCard>
    </>

    return (
        <Login/>
    )
};