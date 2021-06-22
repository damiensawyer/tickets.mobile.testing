import {IonRouterOutlet} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Page from "./pages/Page";
import LearningPageWrapper, {TestPages} from "./features/LearningReactPatterns/LearningPageWrapper";
import {useAppSelector} from "./app/hooks";
import {PageName, PageSettings} from "./app/ticketsCore.pageSettings"
import {$enum} from "ts-enum-util";
import {home} from "ionicons/icons";
import {HomePage} from "./features/Home/HomePage";
import {LoginPage} from "./features/Login/LoginPage";
import {LocationState} from "@ionic/react-router/dist/types/ReactRouter/IonRouter";

// export type routeState = { fromLocation: LocationState }
type privateRouteProps = { path: string, exact: boolean, isLoggedIn: boolean }
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
// Do not delete.... didn't get this working... yet... but need to get something similar going.
// What's more, not sure if this works with Ionic's implementation of the router, or is better for later versions of standard react router. 
// See my question here https://forum.ionicframework.com/t/routerlink-not-firing-redirects/211412
const PrivateRoute: React.FC<privateRouteProps> = ({isLoggedIn, children, ...rest}) => {
    return (<Route
        {...rest}
        // Check this.....https://reactrouter.com/web/api/Route/render-func  do we have to use Render???
        render={({location:LocationState}) => {
            // This totally did my head in. I was passing location to Redirect and it was causing an enedless loop. https://stackoverflow.com/questions/68030679/error-maximum-update-depth-exceeded-again
            // Note also that this PrivateRoute is still being called for non private routes. I think because of this https://reactrouter.com/web/api/match/null-matches.
            return isLoggedIn
                ? children
                : <Redirect to={{
                    pathname: "/page/Login",
                }}
                />
        }}
    />)
};


export type routeProps = { isLoggedIn: boolean }

export const Routes = ({isLoggedIn}: routeProps) => {
    console.log(`rendering routes. Logged In ${isLoggedIn}`)
    // https://ionicframework.com/docs/react/navigation 
    // https://forum.ionicframework.com/t/best-practice-for-react-routing/192100/14
    return (<IonRouterOutlet id="main">
        <Route path="/" exact>
            <Redirect to="/page/Login"/>
        </Route>


        {$enum(PageName)
            .map(x => PageSettings[x])
            .map((appPage, index) =>
                (
                    appPage.isSecure
                        // See my comments on PrivateRoute. I'm going to leave this in, but also hide the links to private routes 
                        ? <PrivateRoute path={appPage.url} exact isLoggedIn={isLoggedIn}>
                            <Page pageName={appPage.pageName}/>
                        </PrivateRoute>
                        : <Route path={appPage.url}><Page pageName={appPage.pageName}/></Route>)
            )
        }


        {/*
            This is kind of crap in that it's basically removing a route if you don't have access to it. I fought with all this for a day. It should be ok for a phone, but not 
            for a web app, where, if they go to a route they don't have access to, they get redirected to login. See PrivateRoute above which is more like what I 'should' be using. Also See my question 
            here  https://forum.ionicframework.com/t/routerlink-not-firing-redirects/211412 which is more for Ionic.
        */}

        {$enum(PageName)
            .map(x => PageSettings[x])
            .filter(x => !x.isSecure)
            .map((appPage, index) =>
                (<Route path={appPage.url}><Page pageName={appPage.pageName}/></Route>))
        }

    </IonRouterOutlet>)
}
