import { 
  addPostRequestAction,
  addPostSuccessAction,
  addPostFailureAction, 
  removePostRequestAction, 
  removePostSuccessAction,
  removePostFailureAction,
  loadMainPostRequestAction,
  loadMainPostSuccessAction,
  loadMainPostFailureAction,
  uploadImagesRequestAction,
  currentPageNumberAction,
  updateStartEndPageAction
} from './actions';

// 액션 타입을 선언할 때 as const를 사용하여야 아래부분 사용가능
export type PostAction = 
| ReturnType<typeof addPostRequestAction>
| ReturnType<typeof addPostSuccessAction>
| ReturnType<typeof addPostFailureAction>

| ReturnType<typeof removePostRequestAction>
| ReturnType<typeof removePostSuccessAction>
| ReturnType<typeof removePostFailureAction>

| ReturnType<typeof loadMainPostRequestAction>
| ReturnType<typeof loadMainPostSuccessAction>
| ReturnType<typeof loadMainPostFailureAction>

| ReturnType<typeof uploadImagesRequestAction>
| ReturnType<typeof currentPageNumberAction>
| ReturnType<typeof updateStartEndPageAction>

// 상태에서 사용할 데이터 타입 정의(initialState)
export type PostState = {
  mainPosts: string[],
  mainPostsAll: string[],
  singlePost: null,
  postDeleted: boolean,
  imagePaths: string[],
  addingPostErrorReason: string,
  isAddingPost: boolean,
  postAdded: boolean,
  postLoaded: boolean,
  // hasMorePost: boolean,
  start: number,// pagination
  end: number,
  current: number,
}

export type initialState = PostState[];