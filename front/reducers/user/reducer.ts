import produce from 'immer';
import { UserState, UserAction } from './types';
import { 
  LOAD_USER_FAILURE, 
  LOAD_USER_REQUEST, 
  LOAD_USER_SUCCESS, 
  LOG_IN_FAILURE, 
  LOG_IN_REQUEST, 
  LOG_IN_SUCCESS, 
  LOG_OUT_REQUEST, 
  LOG_OUT_SUCCESS, 
  SIGN_UP_DONE, 
  SIGN_UP_FAILURE, 
  SIGN_UP_REQUEST, 
  SIGN_UP_SUCCESS 
} from "./actions";

export const initialState: UserState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내 정보
};


export default ( state:UserState = initialState, action: UserAction ):UserState => {
  return produce( state, (draft ) => {
      switch ( action.type ) {
          // immer 안쓸때
          // case SIGN_IN_REQUEST: {
          //     return {
          //         ...state,
          //         isSignedUp: false,
          //         isSigningUp: true,
          //         signUpErrorReason: '',
          //     };
          // }
          case SIGN_UP_DONE: {
              draft.isSigningUp = false;
              draft.isSignedUp = false;
              draft.signUpErrorReason = '';
              break;
          }
          case SIGN_UP_REQUEST: {
              draft.isSigningUp = true;
              draft.isSignedUp = false;
              draft.signUpErrorReason = '';
              break;
          }
          case SIGN_UP_SUCCESS: {
              draft.isSigningUp = false;
              draft.isSignedUp = true;
              break;
          }
          case SIGN_UP_FAILURE: {
              draft.isLoggingIn = false;
              draft.isSignedUp = false;
              draft.signUpErrorReason = action.error;
              draft.me = null;
              break;
          }
          case LOG_IN_REQUEST: {
              draft.isLoggingIn = true;
              draft.logInErrorReason = '';
              break;
          }
          case LOG_IN_SUCCESS: {
              draft.isLoggingIn = false;
              draft.me = action.data;
              break;
          }
          case LOG_IN_FAILURE: {
              draft.isLoggingIn = false;
              draft.logInErrorReason = action.reason;
              draft.me = null;
              break;
          }
          case LOG_OUT_REQUEST: {
              draft.isLoggingOut = true;
              break;
          }
          case LOG_OUT_SUCCESS: {
              draft.isLoggingOut = false;
              draft.me = null;
              break;
          }
          case LOAD_USER_REQUEST: {
              break;
          }
          case LOAD_USER_SUCCESS: {
              draft.me = action.data;
              break;
          }
          case LOAD_USER_FAILURE: {
              break;
          }
          default: {
              break;
          }
      }
  })
}