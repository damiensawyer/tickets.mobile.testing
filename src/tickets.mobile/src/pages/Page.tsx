import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import {useParams} from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import * as ps from "../app/ticketsCore.pageSettings";
import * as core from "./..//app/ticketsCore";
import {SettingsPage} from "../features/Settings/SettingsPage";
import {search} from "ionicons/icons";
import {routeProps} from "../Routes";
import {useAppSelector} from "../app/hooks";
import {Redirect} from "react-router-dom";


type PageProps = {pageName:string}

//const Page: React.FC<PageProps> = () => {
export const Page = ({pageName  }: PageProps) => {
    const pageSettings = ps.PageSettings[pageName as ps.PageName]
    const isLoggedIn = useAppSelector(x => x.loginSlice.isLoggedIn)
    if (!isLoggedIn && pageSettings.isSecure) return <Redirect to='page/Login'/>
    return (
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
};

export default Page;
