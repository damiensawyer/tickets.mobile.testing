import {IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {createSelector} from "@reduxjs/toolkit";

type ObjectProps = { message: string }
const getFifthVal = (i: number) => i % 5 === 0 ? i : i - i % 5

const myAppState = (state: RootState) => {
    const c = state.pingPong.count
    return {counter: getFifthVal(c)}
}


/// this is a component which is using the standard useAppSelector as opposed to the one from `Reselector` library. I think that useAppselector is wrapping the standard useSelector that comes with Redux  
const ShowEveryFifthCountWithUseSelect: React.FC<ObjectProps> = function ({message}: ObjectProps) {
    // If you did this, it's bad. the method you pass to useAppSelector returns a different count each time and therefore causes extra renders on the component. One every time.
    // let number = getFifthVal(useAppSelector(x=>x.pingPong.count))

    // If you do this, it's ok, because the method you pass to useAppSelector returns the same value each time. Therefore it is memoized.
    // Actually - I'm not sure if that's the full story, see https://react-redux.js.org/api/hooks#useselector "When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render."
    // see https://react-redux.js.org/api/hooks#equality-comparisons-and-updates. It talks about how returning a new object (from the store?) each time will always force a re-render by default
    let number = (useAppSelector(x => getFifthVal(x.pingPong.count)))

    console.log('rendering ShowEveryFifthCountWithUseSelect')
    return <div>{message}: {number}</div>;
};


type Return = (state: RootState) => string | number;

const memoizedFifthVal = (): Return =>
    createSelector(
        [(state: RootState) => state.pingPong],
        (pingPong) => getFifthVal(pingPong.count)
    );


const ShowEveryFifthCountWithReselector: React.FC<ObjectProps> = function ({message}: ObjectProps) {
    let number = useAppSelector(memoizedFifthVal)
    console.log(`rendering ShowEveryFifthCountWithReselector ${number}`)
    return <div>{message}: {number}</div>;
};

const PingPong: React.FC = (b) =>
    <div>
        <h1>Ping Pong</h1>
        {/*<ShowEveryFifthCountWithUseSelect message={'using useSelector'}/>*/}
        <ShowEveryFifthCountWithReselector message={'using reselector'}/>

    </div>


export default PingPong
