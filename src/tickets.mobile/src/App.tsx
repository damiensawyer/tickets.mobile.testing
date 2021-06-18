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


/*
On Auth
https://reactrouter.com/web/example/auth-workflow
https://usehooks.com/useAuth/
*/

import {useAppSelector} from './app/hooks'
//import {setEnvironment} from './features/Settings/settingsSlice'
import LearningPageWrapper, {TestPages} from "./features/LearningReactPatterns/LearningPageWrapper";
import * as core from "./app/ticketsCore";
import {createContext, ReactNode, useContext, useState} from "react";
import {EnvironmentFunctions} from "./app/ticketsCore.Tooling";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb: () => void) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: () => void) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute: React.FC<{ path:string, exact:boolean, children: ReactNode }> = ({children, ...rest}) => {
    let isLoggedIn = useAppSelector(x=>EnvironmentFunctions.isLoggedIn(x.loginSlice.activeEnvironment))
    console.log('rendering privateRoute')
    return (
        <Route
            {...rest}
            render={({location}) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/page/Login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

const App: React.FC = () => {
        core.RunSetup()
        const darkMode = useAppSelector(x => x.settings.darkMode)
        let routes =
            <IonRouterOutlet id="main">
                <Route path="/" exact={true}>
                    <Redirect to="/page/Login"/>
                </Route>
                {/*Note if I put a private route before this one, we got into an infinite loop when we because logged out*/}
                <Route path="/page/:name" exact={true}>
                    <Page/>
                </Route>
                
                <PrivateRoute path="/study/Counter" exact={true}>
                    <LearningPageWrapper page={TestPages.counter}/>
                </PrivateRoute>

                <PrivateRoute path="/study/PingPong" exact={true}>
                    <LearningPageWrapper page={TestPages.pingPong}/>
                </PrivateRoute>

                
            </IonRouterOutlet>

        return (
            <IonApp className={darkMode === 'dark' ? 'dark-theme' : ''}>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        {routes}
                        <Menu/>
                    </IonSplitPane>;
                </IonReactRouter>
            </IonApp>
        );
    }
;

export default App;
