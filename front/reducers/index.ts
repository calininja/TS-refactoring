import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';

import user from './user/reducer';
import post from './post/reducer';
import { UserState } from './user';
import { PostState } from './post';

export type State = {
  user: UserState;
  post: PostState;
};

const rootReducer = ( state: State, action: AnyAction ): State => {
  switch ( action.type ) {
    case HYDRATE:
      console.log('HYDRATE',action);
      return action.payload;
    default: {
      const combineReducer = combineReducers<{
        user: UserState,
        post: PostState,
      }>({
        user,
        post,
      });
      return combineReducer( state, action );
    }
  }
};
// const rootReducer = combineReducers({
//   user,
//   post,
// });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
