import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';

import { RootState } from 'store';

import { getJoke } from 'services';

export type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

interface IJokeState {
  loading: boolean;
  data?: Joke;
}

const initialState: IJokeState = {
  loading: false,
  data: undefined,
};

export const getNewRandomJoke = createAsyncThunk(
  'admin/getPaginatedWaitlist',
  async () => {
    const joke = await getJoke();

    return joke;
  },
);

export const jokeSlice = createSlice({
  name: 'joke',

  initialState,

  reducers: {},

  // builder: ActionReducerMapBuilder<IJokeState>
  extraReducers: (builder: ActionReducerMapBuilder<IJokeState>) => {
    builder
      .addCase(getNewRandomJoke.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewRandomJoke.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

// Selectors

export const selectJoke = (state: RootState) => state.joke.data;
export const selectJokeLoading = (state: RootState) => state.joke.loading;

export default jokeSlice.reducer;
