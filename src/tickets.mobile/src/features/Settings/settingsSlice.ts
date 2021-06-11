import * as core from './../../app/ticketsCore'
import {Environment} from './../../app/ticketsCore'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type darkModeValues = 'light'|'dark'

export interface SettingsState {
   activeSettings: core.EnvironmentSettings,
    darkMode: darkModeValues
}

const initialState: SettingsState = {
  activeSettings:core.GetEnvironmentSettings[Environment.local],
  darkMode : "light"
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setEnvironment: (state, action: PayloadAction<Environment>) => {
      state.activeSettings = core.GetEnvironmentSettings[action.payload]
    },
    setDarkMode: (state, action: PayloadAction<darkModeValues>) => {
      state.darkMode = action.payload
    },
  },
});

// Export the actionCreators
 export const { setEnvironment, setDarkMode } = settingsSlice.actions;
// export const epics = [pingEpic, pongEpic]

// export the reducer
export default settingsSlice.reducer;
