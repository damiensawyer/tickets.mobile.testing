import { IonImg } from '@ionic/react';
import './ExploreContainer.css';
import {useAppSelector} from "../app/hooks";
import {selectPingMode} from "../features/FlashIcon/FlashIconEpic";


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const pingMode = useAppSelector(selectPingMode)
  return (
    <div className="container">
      <IonImg class="small" src="assets/tickets-logo-colour-rgb.png"></IonImg>
      <h1>Hello Sienna!</h1>
        <p><strong>PingMode: {pingMode}</strong></p>
        <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
