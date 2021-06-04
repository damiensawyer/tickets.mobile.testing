import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type darkModeValues = 'light'|'dark'
export interface DarkModeState {
  value: darkModeValues
}

const initialState: DarkModeState = {
  value: 'dark',
};

export const darkModelSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setDarkMode: (state, action:PayloadAction<darkModeValues>) => {
      state.value = action.payload;
    }
  },
});

export const { setDarkMode } = darkModelSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDarkMode = (state: RootState) => state.darkMode.value;

export default darkModelSlice.reducer;
