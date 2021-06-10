import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {useAppSelector} from './app/hooks'
//import {setEnvironment} from './features/Settings/settingsSlice'
import LearningPageWrapper, {TestPages} from "./features/LearningReactPatterns/LearningPageWrapper";
import * as core from "./app/ticketsCore";
import {PageName} from "./app/ticketsCore";

const App: React.FC = () => {
    core.RunSetup()
    const darkMode = useAppSelector(x=>x.settings.darkMode)
    return (
        <IonApp className={darkMode === 'dark' ? 'dark-theme' : ''}>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu/>
                    <IonRouterOutlet id="main">

                        <Route path="/" exact={true}>
                            <Redirect to="/page/Home"/>
                        </Route>

                        <Route path="/study/Counter" exact={true}>
                            <LearningPageWrapper page={TestPages.counter}/>
                        </Route>

                        <Route path="/study/PingPong" exact={true}>
                            <LearningPageWrapper page={TestPages.pingPong}/>
                        </Route>

                        <Route path="/page/:name" exact={true}>
                            <Page />
                        </Route>


                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
