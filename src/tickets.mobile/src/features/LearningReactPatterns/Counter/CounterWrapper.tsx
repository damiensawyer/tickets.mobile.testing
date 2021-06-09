import React from "react";
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Counter from "./Counter";

export const CounterWrapper: React.FC = (b) =>{
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
                <Counter />
              </div>
          </IonContent>
      </IonPage>
  );
}

