import { configureStore } from '@reduxjs/toolkit';
import { authApi, notification, postsApi, storage, tagsApi } from 'services/services';
import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  postsApi,
  tagsApi,
  authApi,
  notification,
  storage,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArgument,
      }
    }).concat(handleError),
});

export { extraArgument, store }