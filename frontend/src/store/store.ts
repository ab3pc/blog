import { configureStore } from '@reduxjs/toolkit';
import { postsApi, tagsApi } from 'services/services';
import { rootReducer } from './root-reducer';

const extraArgument = {
  postsApi,
  tagsApi
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArgument,
      }
    }),
});

export { extraArgument, store }