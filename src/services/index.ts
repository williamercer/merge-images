import axios from 'axios';

import { Joke } from 'store/slices/jokeSlice';

export async function getJoke(): Promise<Joke | undefined> {
  try {
    const { data } = await axios.get(
      'https://official-joke-api.appspot.com/jokes/random',
    );

    return data as Joke;
  } catch (error) {
    return undefined;
  }
}
