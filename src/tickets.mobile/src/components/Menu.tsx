import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToggle,} from '@ionic/react';

import {useLocation} from 'react-router-dom';
import {bookmarkOutline, mailOutline, mailSharp, moonOutline, calendarNumber} from 'ionicons/icons';
import './Menu.css';

import { useAppSelector, useAppDispatch } from '../app/hooks'
import {setDarkMode, selectDarkMode} from '../features/darkmode/darkModeSlice'
import React from "react";
import {setPing} from "../features/LearningReactPatterns/FlashIcon/FlashIconEpic";
import {rootEpic} from "../app/store";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Counter',
    url: '/Counter',
    iosIcon: calendarNumber,
    mdIcon: calendarNumber
  }
];

const labels = ['Family'];

const Menu: React.FC = () => {
  const location = useLocation();
  const darkMode = useAppSelector(selectDarkMode)
  const isDarkModeEnabled = () => darkMode === 'dark'
  const dispatch = useAppDispatch();
  const toggleDarkMode = () => isDarkModeEnabled() ? dispatch(setDarkMode('light')) : dispatch(setDarkMode('dark'))
  
  const isPingStarted = useAppSelector(x => x.pingPong.isStarted)
  if (!isPingStarted)
    dispatch(setPing())
  
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
            );
          })}
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel onClick={() => toggleDarkMode()}>Dark Mode</IonLabel>
            <IonToggle content-id='mytoggle' checked={isDarkModeEnabled()} onClick={() => toggleDarkMode()}/>
          </IonItem>
          
        </IonList>
        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
              <IonItem lines="none" key={index}>
                <IonIcon slot="start" icon={bookmarkOutline}/>
                <IonLabel>{label}</IonLabel>
              </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;


