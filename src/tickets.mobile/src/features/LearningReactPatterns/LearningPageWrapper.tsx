import React from "react";
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Counter from "./Counter/Counter";
import PingPong from "./PingPong/PingPong";

export enum TestPages {
    counter = "Counter",
    pingPong = "Ping Pong"
};

const LearningPageWrapper: React.FC<{ page: TestPages }> = (p) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{p.page}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container ion-padding">
                    {(p.page === TestPages.counter && <Counter/>)
                    || (p.page === TestPages.pingPong && <PingPong/>)
                    || <div>no match</div>
                    }
                </div>
            </IonContent>
        </IonPage>
    );
}

export default LearningPageWrapper