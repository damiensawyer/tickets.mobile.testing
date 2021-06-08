import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';



import ExploreContainer from "../../../components/ExploreContainer";
import {IonButton, IonButtons, IonHeader, IonInput, IonLabel} from "@ionic/react";

//export function Counter() {
export const Counter: React.FC = (b) =>{
const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <h3 className="ion-align-items-center ion-padding-bottom">Counter using Redux-Toolkit with Redux Thunk</h3>
      <div>
        <IonButton
          className="ion-padding-horizontal"
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement());
          }}
        >-</IonButton>
        <span>{count}</span>
        
        <IonButton
          className="ion-padding-horizontal"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >+</IonButton>
      </div>
      <div>
        <IonInput
                          

          className="ion-padding-vertical"
         
          aria-label="Set increment amount"
          value={incrementAmount}
          onIonChange={e => setIncrementAmount(e.detail.value!)}
        />
        <IonButton
            fill="outline"
            onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </IonButton>
        <IonButton
            fill="outline"
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add With Delay
        </IonButton>
        <IonButton
            fill="outline"
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </IonButton>
      </div>
    </div>
  );
}

export default Counter;