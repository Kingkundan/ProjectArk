import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {Provider} from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export const { increment, decrement } = counterSlice.actions;

// React Query Setup
const queryClient = new QueryClient();

// App Component
const App: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className={`App ${theme}`}>
          <h1>Redux Toolkit and React Query App</h1>
          <div>
            <button onClick={() => store.dispatch(increment())}>Increment</button>
            <span>{store.getState().counter.value}</span>
            <button onClick={() => store.dispatch(decrement())}>Decrement</button>
          </div>
          <div>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
