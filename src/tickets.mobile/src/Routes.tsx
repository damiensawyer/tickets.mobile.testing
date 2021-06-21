
import {IonRouterOutlet} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Page from "./pages/Page";
import LearningPageWrapper, {TestPages} from "./features/LearningReactPatterns/LearningPageWrapper";
import {useAppSelector} from "./app/hooks";
import {EnvironmentFunctions} from "./app/ticketsCore.Tooling";

type privateRouteProps = { path: string, exact: boolean, isLoggedIn:boolean }
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute: React.FC<privateRouteProps> = ({isLoggedIn, children, ...rest}) => {
    return (<Route
        {...rest}
        render={({location}) => {
            console.log(`routes:`,location)
            // This totally did my head in. I was passing location to Redirect and it was causing an enedless loop. https://stackoverflow.com/questions/68030679/error-maximum-update-depth-exceeded-again
            // Note also that this PrivateRoute is still being called for non private routes. I think because of this https://reactrouter.com/web/api/match/null-matches.
            return isLoggedIn ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/page/Login"
                        //state:'hi!!'
                    }}
                />
            )
        }}

    />)
};

type routeProps = {isLoggedIn:boolean}

export const Routes = ({isLoggedIn}:routeProps) =>
    (<IonRouterOutlet id="main">
        <Route path="/page/:name" exact={true}>
            <Page/>
        </Route>

        <Route path="/" exact={true}>
            <Redirect to="/page/Login"/>
        </Route>

        <PrivateRoute path="/study/Counter" exact={true} isLoggedIn={isLoggedIn}>
            <LearningPageWrapper page={TestPages.counter}/>
        </PrivateRoute>

        <PrivateRoute path="/study/PingPong" exact={true}  isLoggedIn={isLoggedIn}>
            <LearningPageWrapper page={TestPages.pingPong}/>
        </PrivateRoute>
    </IonRouterOutlet>)
