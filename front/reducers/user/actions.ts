export const SIGN_UP_DONE = 'SIGN_UP_DONE' as const;

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



export const signUpDoneAction = ( ) => ({
    type:SIGN_UP_DONE,
})
export const signUpRequestAction = ( userId: string, password: number ) => ({
    type: SIGN_UP_REQUEST,
    data: {
        userId,
        password
    }
})
export const signUpSuccessAction = () => ({
    type: SIGN_UP_SUCCESS,
})
export const signUpFailureAction = ( error: Error ) => ({
    type: SIGN_UP_FAILURE,
    error
})
export const loginRequestAction = ( id: string, password: number ) => ({
    type:LOG_IN_REQUEST,
    data: {
        userId: id,
        password
    }
})
export const loginSuccessAction = ( id: string, password: number ) => ({
    type:LOG_IN_SUCCESS,
    data: {
        userId: id,
        password
    }
})
export const loginFailureAction = ( error: Error) => ({
    type:LOG_IN_FAILURE,
    error
})
export const logoutRequestAction = () => ({
    type:LOG_OUT_REQUEST,
})
export const logoutSuccessAction = () => ({
    type:LOG_OUT_SUCCESS,
})

export const loadUserRequestAction = () => ({
    type:LOAD_USER_REQUEST,
})
export const loadUserSuccessAction = ( data: string ) => ({
    type:LOAD_USER_SUCCESS,
    data
})
export const loadUserFailureAction = () => ({
    type:LOAD_USER_FAILURE,
})