import { configureStore, createSelector, createSlice } from '@reduxjs/toolkit';

// Redux Toolkit Setup
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

const CounterState = (state: any) => state.counter;

export const SelectCounter = CounterState((prop:any)=> prop.value);

export const { increment, decrement } = counterSlice.actions;
