# TSX

Samples of some componets... clean this up

``` tsx
import {IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from "react";

const ShowFive: React.FC<number> = (x) => <div>goodbye {x}</div> // Don't thing that I could do this. 


const ShowNumber: React.FC<{ i: number, x: string }> = ({i, x}) => (<div>hello {x} {i}</div>)
type ObjectProps = { message: string, counter: number, age?: number }
const ShowObject = ({message, counter, age}: ObjectProps) => <div>{message} {counter} age:{age}</div>;

const ShowObjectB = ({message, counter, age}: ObjectProps) => {
    console.log('rendering object B')
    return <div>{message} {counter} age:{age}</div>;
}

// can optionally strongly type it??
const ShowObjectC: React.FC<ObjectProps> = ({message, counter, age}: ObjectProps) => {
    return <div>{message} {counter} age:{age}</div>;
}

const PingPong: React.FC = (b) =>
    <div>
        <h1>Ping Pong</h1>

        <ShowNumber i={100} x='damien'/>
        <ShowObject counter={300} message='hello world'/>
        <ShowObjectB counter={1000} message='hello object B'/>
        <ShowObjectC counter={2000} message='hello object C'/>
    </div>


export default PingPong
```


## LInks
[Functional Component Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)