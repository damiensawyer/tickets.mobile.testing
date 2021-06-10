import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import {PageName} from "../app/ticketsCore";
import * as core from "./..//app/ticketsCore";
import {SettingsPage} from "../features/Settings/SettingsPage";



type PageProps = { }

const Page: React.FC<PageProps> = () => {
    
  const  pageName  = useParams<{ name: string; }>().name;
  const pageSettings = core.PageSettings[pageName as PageName]
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{pageSettings.pageName}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageSettings.pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <pageSettings.$Template />
        
      </IonContent>
    </IonPage>
  );
};

export default Page;
