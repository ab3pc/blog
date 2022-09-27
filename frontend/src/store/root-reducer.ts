import {reducer as posts} from './posts/reducer';
import {reducer as auth} from './auth/reducer';

const rootReducer = {
  posts,
  auth
};

export { rootReducer };