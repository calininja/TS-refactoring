import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user/user';
import post from './post/reducer';

const rootReducer = ( state, action ) => {
  switch ( action.type ) {
    case HYDRATE:
      console.log('HYDRATE',action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer( state, action );
    }
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
