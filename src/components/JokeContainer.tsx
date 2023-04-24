import JokeItem from './JokeItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { IJokes } from '../module/IJoke';
import { removeJoke } from '../store/reducers/JokeSlice';
import {
  fetchMoreJokes,
  fetchRefreshJoke,
} from '../store/reducers/ActionCreaters';
import Loader from './Loader';

const JokeContainer = () => {
  const [favoriteJokes, setFavoriteJokes] = useState(() => {
    const storedArray = localStorage.getItem('favoriteJokes');
    return storedArray ? JSON.parse(storedArray) : [];
  });
  const { jokes, error, isLoadingMore } = useAppSelector(
    (state) => state.jokeReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (favoriteJokes.length > 0) {
      localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes));
    }
  }, [favoriteJokes]);
  const deleteJokeHandler = (joke: IJokes) => {
    const updatedItems = favoriteJokes.filter(
      (item: IJokes) => item.id !== joke.id
    );
    setFavoriteJokes(updatedItems);
    localStorage.removeItem('favoriteJokes');
    dispatch(removeJoke(joke.id));
  };
  const favoriteJokeHandler = (joke: any) => {
    setFavoriteJokes([...favoriteJokes, joke]);
  };
  const refreshJokeHandler = async (joke: IJokes) => {
    const updatedItems = favoriteJokes.filter(
      (item: IJokes) => item.id !== joke.id
    );
    setFavoriteJokes(updatedItems);
    localStorage.removeItem('favoriteJokes');
    dispatch(fetchRefreshJoke({ arg1: joke, arg2: jokes }));
  };
  const moreJokeHandler = () => {
    dispatch(fetchMoreJokes(jokes));
  };
  const isAlreadyAdded = (joke: IJokes) => {
    return favoriteJokes.some((jokeItem: IJokes) => jokeItem.id === joke.id);
  };
  return (
    <>
      {error && <h1>error</h1>}
      <Grid container spacing={2}>
        {jokes &&
          jokes.map((joke: IJokes) => (
            <JokeItem
              {...{
                joke,
                isAlreadyAdded,
                deleteJokeHandler,
                refreshJokeHandler,
                favoriteJokeHandler,
              }}
              key={joke.id}
            />
          ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Button variant="contained" onClick={moreJokeHandler}>
          {isLoadingMore ? (
            <Loader size="small" loaderColor="info" />
          ) : (
            'Load More'
          )}
        </Button>
      </Box>
    </>
  );
};
export default JokeContainer;
