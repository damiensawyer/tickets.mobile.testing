import {IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonNote, IonToggle,} from '@ionic/react';

import {Link, useLocation} from 'react-router-dom';
import {moonOutline} from 'ionicons/icons';
import './Menu.css';

import {useAppDispatch, useAppSelector} from '../app/hooks'
import {setDarkMode} from '../features/Settings/settingsSlice'
import React from "react";
import {EnvironmentFunctions} from "../app/ticketsCore.Tooling";
//import {appPages} from "./AppPages";
import {PageName, PageSettings} from "../app/ticketsCore.pageSettings"
import {$enum} from "ts-enum-util";
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
          {$enum(PageName).map((page, index) => {
            let s = PageSettings[page]
            return (
                <div>
                <Link to={s.url}>{s.title}</Link>
                  
                // <IonMenuToggle key={index} autoHide={false}>
                //   <IonItem className={location.pathname === s.url ? 'selected' : ''} 
                //            routerLink={s.url} 
                //            routerDirection="forward" 
                //            lines="none" detail={false}>
                //     <IonIcon slot="start" ios={s.iosIcon} md={s.mdIcon}/>
                //     <IonLabel>{`${s.title}`}</IonLabel>
                //    
                //   </IonItem>
                // </IonMenuToggle>
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


