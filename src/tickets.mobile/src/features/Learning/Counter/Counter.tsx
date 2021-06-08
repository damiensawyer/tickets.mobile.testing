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

import styles from './Counter.module.css';

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
      <IonHeader>Counter using Redux-Toolkit with Redux Thunk</IonHeader>
      <div className={styles.row}>
        <IonButton
          className="ion-padding-horizontal"
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement());
          }}
        >-</IonButton>
        <span className={styles.value}>{count}</span>
        
        <IonButton
          className="ion-padding-horizontal"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >+</IonButton>
      </div>
      <div className={styles.row}>
        <IonInput
          className="ion-padding-vertical"
          aria-label="Set increment amount"
          value={incrementAmount}
          onIonChange={e => setIncrementAmount(e.detail.value!)}
        />
        <IonButton
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </IonButton>
        <IonButton
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </IonButton>
        <IonButton
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </IonButton>
      </div>
    </div>
  );
}

export default Counter;