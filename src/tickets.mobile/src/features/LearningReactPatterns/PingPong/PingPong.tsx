import {IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
// import './PingPong.css';
import {useAppSelector} from "../../../app/hooks";
import {createSelector} from "@reduxjs/toolkit";
import Counter from "../Counter/Counter";
import React from "react";
//import {selectPingMode} from "../features/LearningReactPatterns/FlashIcon/FlashIconEpic";



const PingPong: React.FC = (b) =>{
    return (
        /*If I didn't put all this wrapping around IonHeader then it wouldn't navigate on click */
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Counter</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Title</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <h1>Ping Pong</h1>
                </div>
            </IonContent>
        </IonPage>
    );
}


export default PingPong