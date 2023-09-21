import { combineReducers } from '@reduxjs/toolkit';

import jokeReducer from './jokeSlice';

const rootReducer = combineReducers({
  joke: jokeReducer,
});

export default rootReducer;
