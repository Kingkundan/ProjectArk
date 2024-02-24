import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux';
import { store, increment, decrement, SelectCounter } from './store';
import { useDispatch } from 'react-redux';

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
        <MainPanel theme={theme} Toggle={toggleTheme} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

type GT = {theme:string,Toggle: () => void};

const MainPanel = ({theme,Toggle}:GT) => {
  const CounterValue:any = useSelector(SelectCounter);
  const dispatch = useDispatch(); 

  return (
    <div className={`App ${theme}`}>
      <h1>Redux Toolkit and React Query App</h1>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{CounterValue}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <div>
        <button onClick={Toggle}>Toggle Theme</button>
      </div>
    </div>
  );
}

