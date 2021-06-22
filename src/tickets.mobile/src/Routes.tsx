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

type privateRouteProps = { path: string, exact: boolean, isLoggedIn: boolean }
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute: React.FC<privateRouteProps> = ({isLoggedIn, children, ...rest}) => {
    return (<Route
        {...rest}


        // Check this.....https://reactrouter.com/web/api/Route/render-func  do we have to use Render???

        render={({location}) => {
            console.log(`routes:`, location)
            // This totally did my head in. I was passing location to Redirect and it was causing an enedless loop. https://stackoverflow.com/questions/68030679/error-maximum-update-depth-exceeded-again
            // Note also that this PrivateRoute is still being called for non private routes. I think because of this https://reactrouter.com/web/api/match/null-matches.
            return isLoggedIn ? (
                children
            ) : (
                <>
                    <Redirect
                        to={{
                            pathname: "/page/Login"
                            //state:'hi!!'
                        }}
                        from={location.pathname}
                    />
                    <div>redirect damien {location.pathname}</div>
                </>
            )
        }}

    />)
};


// export const PrivateRoute2: React.FC<privateRouteProps> = ({path, isLoggedIn, children, ...rest}) => {
//     return (isLoggedIn
//             ? <Route {...rest} children={children} /> 
//             : <Route {...rest}><Redirect to={{pathname:"/page/Login"}} from={path} /></Route>
//     )}


export type routeProps = { isLoggedIn: boolean }

export const Routes = ({isLoggedIn}: routeProps) => {
    console.log(`rendering routes. Logged In ${isLoggedIn}`)
    // https://ionicframework.com/docs/react/navigation 
    // https://forum.ionicframework.com/t/best-practice-for-react-routing/192100/14
    return (
        <IonRouterOutlet id="main">

            <Route path="/page/Home" component={HomePage}/>
            <Route path="/page/Login" component={LoginPage}/>
            <Redirect exact from='/page/Counter' to='/page/Login'/>
            {/*<Redirect exact from='/' to='/page/Home' />*/}
            {/*<Route path="page/Counter" exact={true}>*/}
            {/*    */}
            {/*</Route>*/}

            {/*<Route path="/page/:name">*/}
            {/*    <Page  />*/}
            {/*</Route>*/}

            {/*{$enum(PageName).map((appPage, index) => {*/}
            {/*    let r = PageSettings[appPage]*/}
            {/*    return (*/}
            {/*             <Route path="/page/:name" exact={true}>*/}
            {/*                 false */}
            {/*                 ? <Page/>*/}
            {/*                 : <Redirect to={{pathname: "/page/Login" }} from={r.url} />*/}
            {/*            </Route>*/}


            {/*    )*/}
            {/*})}*/}

        </IonRouterOutlet>
    )
}
