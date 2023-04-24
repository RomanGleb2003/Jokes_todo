import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IJokes, IJokesRefresh } from '../../module/IJoke';
import { arraysHaveSameIds } from '../../helpers/functions.helpers';

const MAX_RETRIES = 15;
export const fetchJokes = createAsyncThunk(
  'jokes/fetchAll',
  async (localJokes: IJokes[], thunkAPI) => {
    try {
      let retries = 0;
      while (retries < MAX_RETRIES) {
        const response = await axios.get<IJokes[]>(
          'https://official-joke-api.appspot.com/jokes/ten'
        );
        const uniqueJokes = arraysHaveSameIds(localJokes, response.data);
        if (!uniqueJokes) {
          return localJokes.length > 0
            ? [...localJokes, ...response.data.slice(localJokes.length)]
            : response.data;
        } else {
          retries++;
        }
      }
      return alert('No unique jokes found');
    } catch (e) {
      return thunkAPI.rejectWithValue('e');
    }
  }
);
export const fetchMoreJokes = createAsyncThunk(
  'jokesMore/fetchAll',
  async (prevJoke: IJokes[], thunkAPI) => {
    try {
      let retries = 0;
      while (retries < MAX_RETRIES) {
        let response = await axios.get<IJokes[]>(
          'https://official-joke-api.appspot.com/jokes/ten'
        );
        const uniqueJokes = arraysHaveSameIds(prevJoke, response.data);
        if (!uniqueJokes) {
          return response.data;
        } else {
          retries++;
        }
      }
      return alert('No unique jokes found');
    } catch (e) {
      return thunkAPI.rejectWithValue('No unique jokes found');
    }
  }
);

export const fetchRefreshJoke = createAsyncThunk(
  'joke/fetchOne',
  async (args: IJokesRefresh, thunkAPI) => {
    try {
      let retries = 0;
      while (retries < MAX_RETRIES) {
        let { arg1, arg2 } = args;
        const { data } = await axios.get<IJokes>(
          'https://official-joke-api.appspot.com/jokes/random'
        );
        const uniqueJokes = arraysHaveSameIds([data], arg2);
        if (!uniqueJokes) {
          return { data, arg1 };
        } else {
          retries++;
        }
      }
      return alert('No unique jokes found');
    } catch (e) {
      return thunkAPI.rejectWithValue('e');
    }
  }
);
