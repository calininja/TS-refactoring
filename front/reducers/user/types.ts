import {
  signUpRequestAction, // 사인업
  signUpSuccessAction,
  signUpFailureAction,
  signUpDoneAction, // 사인업 완료
  loginRequestAction, // 로그인
  loginSuccessAction, 
  loginFailureAction, 
  logoutRequestAction, // 로그아웃
  logoutSuccessAction, 
  loadUserRequestAction,  // 유저 로드
  loadUserSuccessAction, 
  loadUserFailureAction, 
} from "./actions"



// 액션 타입을 선언할 때 as const를 사용하여야 아래부분 사용가능
export type UserAction = 
| ReturnType<typeof signUpRequestAction>
| ReturnType<typeof signUpSuccessAction>
| ReturnType<typeof signUpFailureAction>
| ReturnType<typeof signUpDoneAction>
| ReturnType<typeof loginRequestAction>
| ReturnType<typeof loginSuccessAction>
| ReturnType<typeof loginFailureAction>
| ReturnType<typeof logoutRequestAction>
| ReturnType<typeof logoutSuccessAction>
| ReturnType<typeof loadUserRequestAction>
| ReturnType<typeof loadUserSuccessAction>
| ReturnType<typeof loadUserFailureAction>

// 상태에서 사용할 데이터 타입 정의(initialState)
export type UserState = {
  isLoggingOut: boolean,
  isLoggingIn: boolean,
  logInErrorReason: Error,
  isSignedUp: boolean,
  isSigningUp: boolean,
  signUpErrorReason: Error,
  me: {userId: string, password: string, id: number} ,
}
export type signUpType = {
  data:{
      userId: string,
      password: string,
  }
}

export type initialState = UserState[];
