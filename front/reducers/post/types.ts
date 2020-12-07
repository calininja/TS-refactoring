import { 
  addPostRequestAction, // 포스트 추가
  addPostSuccessAction,
  addPostFailureAction,
  postResetDoneAction, // 포스트 완료
  removePostRequestAction, // 포스트 삭제
  removePostSuccessAction,
  removePostFailureAction,
  postDeleteDoneAction, // 포스트 삭제 완료
  loadMainPostRequestAction, // 메인포스트 로드
  loadMainPostSuccessAction,
  loadMainPostFailureAction,
  loadSearchPostsRequestAction, // 검색포스트 로드
  loadSearchPostsSuccessAction,
  loadSearchPostsFailureAction,
  loadSinglePostRequestAction, // 개별포스틑 로드
  loadSinglePostSuccessAction,
  loadSinglePostFailureAction,
  uploadImagesRequestAction, // 이미지 업로드
  uploadImagesSuccessAction,
  uploadImagesFailureAction,
  removeImageAction, // 이미지 제거
  currentPageNumberAction, // 현재 페이지넘버
  updateStartEndPageAction,
  modifyPostRequestAction,
  modifyPostSuccessAction,
  modifyPostFailureAction, // 시작, 끝 페이지 업데이트
} from './actions';

// 액션 타입을 선언할 때 as const를 사용하여야 아래부분 사용가능
export type PostAction = 
| ReturnType<typeof addPostRequestAction>
| ReturnType<typeof addPostSuccessAction>
| ReturnType<typeof addPostFailureAction>
| ReturnType<typeof postResetDoneAction>
| ReturnType<typeof postDeleteDoneAction>
| ReturnType<typeof removePostRequestAction>
| ReturnType<typeof removePostSuccessAction>
| ReturnType<typeof removePostFailureAction>
| ReturnType<typeof loadMainPostRequestAction>
| ReturnType<typeof loadMainPostSuccessAction>
| ReturnType<typeof loadMainPostFailureAction>
| ReturnType<typeof loadSearchPostsRequestAction>
| ReturnType<typeof loadSearchPostsSuccessAction>
| ReturnType<typeof loadSearchPostsFailureAction>
| ReturnType<typeof loadSinglePostRequestAction>
| ReturnType<typeof loadSinglePostSuccessAction>
| ReturnType<typeof loadSinglePostFailureAction>
| ReturnType<typeof uploadImagesRequestAction>
| ReturnType<typeof uploadImagesSuccessAction>
| ReturnType<typeof uploadImagesFailureAction>
| ReturnType<typeof removeImageAction>
| ReturnType<typeof currentPageNumberAction>
| ReturnType<typeof updateStartEndPageAction>
| ReturnType<typeof modifyPostRequestAction>
| ReturnType<typeof modifyPostSuccessAction>
| ReturnType<typeof modifyPostFailureAction>



// 상태에서 사용할 데이터 타입 정의(initialState)
export type PostState = {
  mainPosts: {
    id?: number,
    title?: string,
    User?: {userId:number},
    createdAt?: string,
  }[],
  singlePost: {
    title?: string,
    User?: {userId: number, id: number},
    Images?: string | object,
    content?: string,
  },
  mainPostsAll: number,
  postDeleted: boolean,
  imagePaths: string[],
  addingPostErrorReason: string,
  isAddingPost: boolean,
  postAdded: boolean,
  postLoaded: boolean,
  start: number,// pagination
  end: number,
  current: number,
  hasMorePost: boolean,
  postModify: boolean
}




export type initialState = PostState[];