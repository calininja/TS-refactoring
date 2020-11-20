import produce from 'immer';
import onLogOut from '../../components/UserProfile';
import onSubmitForm from '../../components/LoginForm';
import updateCurrentPage from '../../components/Pagination';
import updateStartEndPage from '../../components/Pagination';


export const initialState: UserState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내 정보
};
export type UserState = {
    isLoggingOut: boolean,
    isLoggingIn: boolean,
    logInErrorReason: string,
    isSignedUp: boolean,
    isSigningUp: boolean,
    signUpErrorReason: string,
    me: any,
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' as const;
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS' as const;
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE' as const;

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const; // 액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const; // 액션의 이름

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' as const;
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' as const;
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' as const;

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST' as const;
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS' as const;
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE' as const;

export const SIGN_UP_DONE = 'SIGN_UP_DONE';

export const signUpRequestAction = ( id: string, password:string ) => ({
    type: SIGN_UP_REQUEST,
    data: {
        userId: id,
        password
    }
})
export const signUpDoneAction = ( ) => ({
    type:SIGN_UP_DONE,
})

export const loginRequestAction = ( id:string, password:string ) => ({
    type:LOG_IN_REQUEST,
    data:{
        userId: id,
        password
    }
})
export const logoutRequestAction = ( ) => ({
    type:LOG_OUT_REQUEST,
})

export type UserAction = 
| ReturnType<typeof signUpRequestAction>
| ReturnType<typeof signUpDoneAction>
| ReturnType<typeof loginRequestAction>
| ReturnType<typeof logoutRequestAction>
// | ReturnType<typeof onLogOut>
// | ReturnType<typeof onSubmitForm>
// | ReturnType<typeof updateCurrentPage>
// | ReturnType<typeof updateStartEndPage>


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
            // case LOAD_USER_REQUEST: {
            //     break;
            // }
            // case LOAD_USER_SUCCESS: {
            //     draft.me = action.data;
            //     break;
            // }
            // case LOAD_USER_FAILURE: {
            //     break;
            // }
            default: {
                break;
            }
        }
    })
}
