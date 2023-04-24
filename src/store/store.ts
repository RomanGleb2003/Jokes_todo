import { combineReducers, configureStore } from '@reduxjs/toolkit';
import jokeReducer from './reducers/JokeSlice';

const rootReducer = combineReducers({
  jokeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
