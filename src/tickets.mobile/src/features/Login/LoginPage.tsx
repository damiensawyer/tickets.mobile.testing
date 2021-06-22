import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {
    IonButton,
    IonCard, IonCardHeader, IonCardTitle,
    IonCol, IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonText, IonTitle,
    useIonToast
} from "@ionic/react";

import {
    processShortCode, requestShortCodeToEmail
} from './LoginSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fromNullable, isNone, isSome} from "fp-ts/Option";
import {BehaviorSubject} from "rxjs";
import {filter} from "rxjs/operators";
import {incrementAsync, selectCount} from "../LearningReactPatterns/Counter/counterSlice";
import {validateEmail} from "../../app/ticketsCore.Tooling";
import {TicketsAPI} from "../../data/user/tickets-auth-api";
import {RequestShortCodeToEmail} from "../../data/user/tickets-http-requests";
//import {routeState} from "../../Routes";
import {useLocation} from "react-router-dom";

// The type returned.  https://stackoverflow.com/a/65301990/494635 
type ErrorLabelRef = {
    setVisible: (status: boolean) => void
    setText: (text: string) => void
} | null;

type ErrorLabelProps = {
    children?: React.ReactNode | null;
};


// https://stackoverflow.com/a/55889638/494635
// https://www.tutorialspoint.com/reactjs-useimperativehandle-hook
// Need to do this so that we can render only the child component without rendering the parent. 
const LoginLabel = forwardRef<ErrorLabelRef, ErrorLabelProps>((props, ref) => {
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
    const [toastPresent, toastDismiss] = useIonToast(); // https://ionicframework.com/docs/api/toast
    const dispatch = useAppDispatch();
    const [shortCode, setShortCode] = useState('')
    const emailErrorLabel = useRef<ErrorLabelRef>(null);
    const shortTokenErrorLabel = useRef<ErrorLabelRef>(null);
    const activeEnvironment = useAppSelector(x =>x.loginSlice.activeEnvironment)
    const locationData:any = useLocation()
    const activeApi = new TicketsAPI(activeEnvironment) // need to pass param to show when to redo??
    useEffect(()=>()=>{activeApi.axiosCancellationSource.cancel()})
    
    let emailCapturedText = new BehaviorSubject<string>('')
    emailCapturedText.pipe(filter(b => b !== '')).subscribe(x => emailErrorLabel.current!.setVisible(false))
    let shortCodeCapturedText = new BehaviorSubject<string>('')
    
    shortCodeCapturedText.pipe(filter(b => b !== '')).subscribe(x => {
        setShortCode(x) // without this, when you switch between logged and not logged in, the text you entered resets.  
        dispatch(processShortCode(x))
        shortTokenErrorLabel.current!.setVisible(false)}
    )

    const requestEmail = () => {
        let data = fromNullable(emailCapturedText.value)
        if (isNone(data) || data.value === '' || !validateEmail(data.value)) {
            emailErrorLabel.current!.setVisible(true)
            emailErrorLabel.current!.setText('please enter a valid email')
        } else {
            let d = data.value // TypeScript didn't like referring to data.value below
            emailErrorLabel.current!.setVisible(false)
            RequestShortCodeToEmail(activeApi, data.value)()
                .then(x=>{
                    toastPresent({
                        buttons: [{ text: 'hide', handler: () => toastDismiss() }],
                        message: `Requested short code be emailed to ${d}`,
                        onDidDismiss: () => console.log('dismissed'),
                        onWillDismiss: () => console.log('will dismiss'),
                        duration:3000
                    })
                    // emailCapturedText.next('') // don't think this will work. Need a ref to the textbox.
                })
                .catch(x=>{
                    
                    
                })
            // dispatch(requestShortCodeToEmail(data.value))
            
        }
    }
    return <>
        <div className="login-logo">
            <IonImg class="small" src="assets/tickets-logo-colour-rgb.png"/>
        </div>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Step 1</IonCardTitle>
                <p>Please enter the email linked to your tickets.org.au account. If you logged in with Google or Facebook, use the email from that account. We will email you a login code which you can enter below.</p>

            </IonCardHeader>
            <IonList lines={'none'}>
                <IonItem>
                    <IonLabel position="floating" color="primary">Email Address</IonLabel>
                    <IonInput name="email" type="email" value={''} spellCheck={false} autocapitalize="off" onIonChange={e => emailCapturedText.next(e.detail.value!)}/>
                    <LoginLabel ref={emailErrorLabel}/>
                </IonItem>

                <IonRow className='ion-padding'>
                    <IonCol>
                        <IonButton expand="block" onClick={requestEmail}>Send Login Code</IonButton>
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
                    <IonInput name="shortCode" type="text" value={shortCode} spellCheck={false} autocapitalize="off" onIonChange={e => shortCodeCapturedText.next(e.detail.value!)}/>
                    <LoginLabel ref={shortTokenErrorLabel}/>
                </IonItem>

            </IonList>

        </IonCard>
    </>
};