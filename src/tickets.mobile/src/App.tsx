import {IonApp, IonContent, IonList, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Menu from './components/Menu';

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
import * as core from "./app/ticketsCore";
import React from "react";
import {Routes} from "./Routes";
import {Link, Redirect, Route} from "react-router-dom";
import {HomePage} from "./features/Home/HomePage";
import {LoginPage} from "./features/Login/LoginPage";

const App: React.FC = () => {
        core.RunSetup()
        const isLoggedIn = useAppSelector(x => x.loginSlice.isLoggedIn)
        const darkMode = useAppSelector(x => x.settings.darkMode)
        return (
            <IonApp className={darkMode === 'dark' ? 'dark-theme' : ''}>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <IonRouterOutlet id="main">
                            <Route path="/page/Home" component={HomePage}/>
                            <Route path="/page/Login" component={LoginPage}/>
                            <Redirect exact from='/page/Counter' to='/page/Login'/>
                        </IonRouterOutlet>

                        <IonContent>
                            <IonList id="menu-list">
                                <div><Link  to={'/page/Home'}>Home</Link></div>
                                <div><Link to={'/page/Login'}>Login</Link></div>
                                <div><Link to={'/page/Counter'}>Counter</Link></div>
                            </IonList>
                        </IonContent>

                    </IonSplitPane>
                </IonReactRouter>
            </IonApp>
        );
    }
;

export default App;
