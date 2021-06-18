import {IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToggle,} from '@ionic/react';

import {useLocation} from 'react-router-dom';
import {bookmarkOutline, mailOutline, mailSharp, moonOutline, calendarNumber} from 'ionicons/icons';
import './Menu.css';

import { useAppSelector, useAppDispatch } from '../app/hooks'
import {setDarkMode} from '../features/Settings/settingsSlice'
import React from "react";
import * as core from './../app/ticketsCore'

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  // {
  //   title: 'Settings',
  //   url: '/page/Settings',
  //   iosIcon: mailOutline,
  //   mdIcon: mailSharp
  // },
  // {
  //   title: 'Home',
  //   url: '/page/Home',
  //   iosIcon: mailOutline,
  //   mdIcon: mailSharp
  // },
  {
    title: 'Login',
    url: '/page/Login',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
    
  {
    title: 'Counter',
    url: '/study/Counter',
    iosIcon: calendarNumber,
    mdIcon: calendarNumber
  },
  // {
  //   title: 'PingPong',
  //   url: '/study/PingPong',
  //   iosIcon: calendarNumber,
  //   mdIcon: calendarNumber
  // }
  
];

const labels = ['Family'];

const Menu: React.FC = () => {
  const location = useLocation();
  const darkMode = useAppSelector(x=>x.settings.darkMode)
  const isDarkModeEnabled = () => darkMode === 'dark'
  const dispatch = useAppDispatch();
  const toggleDarkMode = () => isDarkModeEnabled() ? dispatch(setDarkMode('light')) : dispatch(setDarkMode('dark'))
  console.log('menu rendering')
  
  
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonItem>
          <IonImg className="" slot={'start'} src="assets/tickets-logo-colour-rgb.png" />
          
        </IonItem>
        <IonList id="inbox-list">
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
            <IonIcon slot="start" icon={moonOutline} />
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


