import {IonRouterOutlet} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Page from "./pages/Page";
import LearningPageWrapper, {TestPages} from "./features/LearningReactPatterns/LearningPageWrapper";
import {useAppSelector} from "./app/hooks";
import {PageName, PageSettings} from "./app/ticketsCore.pageSettings"
import {$enum} from "ts-enum-util";

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
    return (<IonRouterOutlet id="main">

        <Route path="/" exact={true}>
            <Redirect to="/page/Login"/>
        </Route>
        
        {$enum(PageName).map((appPage, index) => {
            return <Route path="/page/:name" exact={true}>
                <Page/>
                {/*<Redirect to={appPage.url} from={"/"}/>*/}
            </Route>

        })}

        {/*<PrivateRoute path="/study/Counter" exact={true} isLoggedIn={isLoggedIn}>*/}
        {/*    <LearningPageWrapper page={TestPages.counter}/>*/}
        {/*</PrivateRoute>*/}

        {/*<PrivateRoute path="/study/PingPong" exact={true}  isLoggedIn={isLoggedIn}>*/}
        {/*    <LearningPageWrapper page={TestPages.pingPong}/>*/}
        {/*</PrivateRoute>*/}

        {/*<Route path="/page/:name" exact={true}>*/}
        {/*    <Page/>*/}
        {/*</Route>*/}

        {/*<Route path="/" exact={true}>*/}
        {/*    <Redirect to="/page/Login" from={"/"}/>*/}
        {/*</Route>*/}


    </IonRouterOutlet>)
}
