import counterReducer, {
  DarkModeState,
} from './darkModeSlice';

describe('counter reducer', () => {
  const initialState: DarkModeState = {
    value: 'light',
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  // it('should handle darkmode on', () => {
  //   const actual = counterReducer(initialState, setDarkMode('light'));
  //   expect(actual.value).toEqual(4);
  // });

  
});
