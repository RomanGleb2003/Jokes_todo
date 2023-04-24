import React, { useEffect } from 'react';
import './App.css';
import JokeContainer from './components/JokeContainer';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchJokes } from './store/reducers/ActionCreaters';
import Loader from './components/Loader';

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.jokeReducer);
  useEffect(() => {
    const storedArray = localStorage.getItem('favoriteJokes');
    dispatch(fetchJokes(storedArray ? JSON.parse(storedArray) : []));
  }, []);

  return <div>{isLoading ? <Loader size="large" /> : <JokeContainer />}</div>;
}

export default App;
