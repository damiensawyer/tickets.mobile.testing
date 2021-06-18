import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import {useParams} from 'react-router';
import './Page.css';
import * as ps from "../app/ticketsCore.pageSettings";
import {search} from "ionicons/icons";
import {useMemo} from "react";


type PageProps = {}

const Page: React.FC<PageProps> = () => {
    const pageName = useParams<{ name: string; }>().name;
    const pageSettings = ps.PageSettings[pageName as ps.PageName]

    let r = (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>

                        <IonToolbar>
                            <IonButtons slot="primary">
                                <IonButton onClick={() => {}}>
                                    <IonIcon slot="icon-only" icon={search} />
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                        
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
                <div className="ion-padding">
                    <pageSettings.$Template/>
                </div>

            </IonContent>
        </IonPage>
    );
    return r
    //return useMemo(() => r, [pageName])  // Tried this to no avail 
};

export default Page
