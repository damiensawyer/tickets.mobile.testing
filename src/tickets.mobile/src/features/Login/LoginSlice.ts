import * as core from './../../app/ticketsCore'
import {Environment} from './../../app/ticketsCore'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type darkModeValues = 'light'|'dark'

export interface LoginState {
    
}

const initialState: LoginState = {
  
};

export const LoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {

    setDarkMode: (state, action: PayloadAction<darkModeValues>) => {
      // state.darkMode = action.payload
    },
  },
});

// Export the actionCreators
 export const {  } = LoginSlice.actions;
// export const epics = [pingEpic, pongEpic]

// export the reducer
export default LoginSlice.reducer;
