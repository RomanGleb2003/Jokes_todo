import { IJokes } from '../../module/IJoke';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJokes, fetchMoreJokes, fetchRefreshJoke } from './ActionCreaters';

type JokeStateType = {
  jokes: IJokes[];
  error: string;
  isLoading: boolean;
  isLoadingMore: boolean;
};

const initialState: JokeStateType = {
  jokes: [],
  error: '',
  isLoading: false,
  isLoadingMore: false,
};

export const jokeSlice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    removeJoke: (state, action: PayloadAction<number>) => {
      state.jokes = state.jokes.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchJokes.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchJokes.fulfilled.type]: (state, action: PayloadAction<IJokes[]>) => {
      state.isLoading = false;
      state.error = '';
      state.jokes = action.payload;
    },
    [fetchJokes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchMoreJokes.pending.type]: (state) => {
      state.isLoadingMore = true;
    },
    [fetchMoreJokes.fulfilled.type]: (
      state,
      action: PayloadAction<IJokes[]>
    ) => {
      state.isLoadingMore = false;
      state.error = '';
      state.jokes = [...state.jokes, ...action.payload];
    },
    [fetchMoreJokes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMore = true;
      state.error = action.payload;
    },
    [fetchRefreshJoke.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.error = '';
      const { data, arg1 } = action.payload;
      const itemIndex = state.jokes.findIndex((item) => item.id === arg1.id);
      if (itemIndex !== -1) {
        state.jokes[itemIndex] = data;
      }
    },
    [fetchRefreshJoke.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
    },
  },
});
export const { removeJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
