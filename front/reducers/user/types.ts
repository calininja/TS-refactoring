import {
  signUpDoneAction, 

  signUpRequestAction, 
  signUpSuccessAction,
  signUpFailureAction,
  
  loginRequestAction, 
  loginSuccessAction, 
  loginFailureAction, 

  logoutRequestAction, 
  logoutSuccessAction, 

  loadUserRequestAction, 
  loadUserSuccessAction, 
  loadUserFailureAction, 
} from "./actions"



// 액션 타입을 선언할 때 as const를 사용하여야 아래부분 사용가능
export type UserAction = 
| ReturnType<typeof signUpDoneAction>

| ReturnType<typeof signUpRequestAction>
| ReturnType<typeof signUpSuccessAction>
| ReturnType<typeof signUpFailureAction>

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
  // logInErrorReason: boolean,
  logInErrorReason: string | any,
  isSignedUp: boolean,
  isSigningUp: boolean,
  // signUpErrorReason: boolean,
  signUpErrorReason: object | any,
  me: any,
}

export type initialState = UserState[];
