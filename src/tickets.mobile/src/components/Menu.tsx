import {IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonNote, IonToggle,} from '@ionic/react';

import {useLocation} from 'react-router-dom';
import {moonOutline} from 'ionicons/icons';
import './Menu.css';

import {useAppDispatch, useAppSelector} from '../app/hooks'
import {setDarkMode} from '../features/Settings/settingsSlice'
import React from "react";
import {EnvironmentFunctions} from "../app/ticketsCore.Tooling";
import {appPages} from "./AppPages";

type MenuProps = {isLoggedIn:boolean}
const Menu = ({isLoggedIn}:MenuProps) => {
  const location = useLocation();
  const darkMode = useAppSelector(x=>x.settings.darkMode)
  const isDarkModeEnabled = () => darkMode === 'dark'
  const dispatch = useAppDispatch();
  const toggleDarkMode = () => isDarkModeEnabled() ? dispatch(setDarkMode('light')) : dispatch(setDarkMode('dark'))

  console.log(`rendering menu. Logged In ${isLoggedIn}`)  
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonItem>
          <IonImg className="" slot={'start'} src="assets/tickets-logo-colour-rgb.png" />
          
        </IonItem>
        <IonList id="menu-list">
          <IonNote>{isLoggedIn ? 'logged in ....' : 'not logged in'} </IonNote>
          {appPages.map((appPage, index) => {
            return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} 
                           routerLink={appPage.url} 
                           routerDirection="none" 
                           lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                    <IonLabel>{`${appPage.title}`}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
            );
          })}
          
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}/>
            <IonLabel onClick={() => toggleDarkMode()}>Dark Mode</IonLabel>
            <IonToggle content-id='mytoggle' checked={isDarkModeEnabled()} onClick={() => toggleDarkMode()}/>
          </IonItem>
          
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;


