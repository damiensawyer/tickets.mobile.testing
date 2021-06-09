import {IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './ExploreContainer.css';
import {useAppSelector} from "../app/hooks";
import {createSelector} from "@reduxjs/toolkit";
//import {selectPingMode} from "../features/LearningReactPatterns/FlashIcon/FlashIconEpic";


interface ContainerProps {
  name: string;
}
const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
    const pingMode = useAppSelector(x=>x.pingPong.value)
    const counter = useAppSelector(x=>x.pingPong.count)
    
  return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="container">
                    <IonImg class="small" src="assets/tickets-logo-colour-rgb.png"></IonImg>
                    <h1>Hello Counter</h1>

                    <p><strong>Ping State: {pingMode}</strong></p>
                    <p><strong>Count: {counter}</strong></p>
                    <strong>{name}</strong>
                    <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
                </div>
                
                
            </IonContent>
        </IonPage>
    );
      
      
      
      
      
      
    
  
};

export default ExploreContainer;
