import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import {PageName} from "../app/ticketsCore";

const Page: React.FC = () => {
    
  const { name } = useParams<{ name: PageName; }>();
  
  return (
    <div>unsecured {name}</div>
  );
};

export default Page;
