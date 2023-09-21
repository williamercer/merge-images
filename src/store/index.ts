import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from 'redux-logger';

import rootReducer from 'store/slices';

export default function createStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        loggerMiddleware,
      ),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
}

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
