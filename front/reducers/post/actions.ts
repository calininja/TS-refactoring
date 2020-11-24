
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST' as const;
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS' as const;
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE' as const;

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST' as const;
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS' as const;
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE' as const;

export const LOAD_SEARCH_POSTS_REQUEST = 'LOAD_SEARCH_POSTS_REQUEST' as const;
export const LOAD_SEARCH_POSTS_SUCCESS = 'LOAD_SEARCH_POSTS_SUCCESS' as const;
export const LOAD_SEARCH_POSTS_FAILURE = 'LOAD_SEARCH_POSTS_FAILURE' as const;

export const LOAD_SINGLE_POST_REQUEST = 'LOAD_SINGLE_POST_REQUEST' as const;
export const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS' as const;
export const LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE' as const;

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' as const;
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' as const;
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' as const;

export const REMOVE_IMAGE = 'REMOVE_IMAGE' as const;
export const POST_RESET_DONE = 'POST_RESET_DONE' as const;
export const POST_DELETE_DONE = 'POST_DELETE_DONE' as const;

export const CURRENT_PAGE_NUMBER = 'CURRENT_PAGE_NUMBER' as const;
export const CURRENT_PAGE_NUMBER_SUCCESS = 'CURRENT_PAGE_NUMBER_SUCCESS' as const;
export const CURRENT_PAGE_NUMBER_FAILURE = 'CURRENT_PAGE_NUMBER_FAILURE' as const;
export const UPDATE_START_END_PAGE = 'UPDATE_START_END_PAGE' as const;
export const GO_TO_BEGIN = 'GO_TO_BEGIN' as const;

// export type addPostRequest = {
//     type: typeof ADD_POST_REQUEST;
// }
// export type ADD_POST_SUCCESS = {
//     type: typeof ADD_POST_REQUEST;
//     data: PostState[];
// }
// export type ADD_POST_FAILURE = {
//     type: typeof ADD_POST_REQUEST;
//     error: Error;
// }
// export type REMOVE_POST_REQUEST = {
//     type: typeof REMOVE_POST_REQUEST;
// }
// export type REMOVE_POST_SUCCESS = {
//     type: typeof REMOVE_POST_SUCCESS;
//     data: PostState[];
// }
// export type REMOVE_POST_FAILURE = {
//     type: typeof REMOVE_POST_FAILURE;
// }
// export type POST_RESET_DONE = {
//     type: typeof POST_RESET_DONE;
// }
// export type POST_DELETE_DONE = {
//     type: typeof POST_DELETE_DONE;
// }
// export type LOAD_MAIN_POSTS_REQUEST = {
//     type: typeof LOAD_MAIN_POSTS_REQUEST;
// }
// export type LOAD_MAIN_POSTS_SUCCESS = {
//     type: typeof LOAD_MAIN_POSTS_SUCCESS;
//     data: PostState[];
// }
// export type LOAD_MAIN_POSTS_FAILURE = {
//     type: typeof LOAD_MAIN_POSTS_FAILURE;
// }
// export type LOAD_SINGLE_POST_REQUEST = {
//     type: typeof LOAD_SINGLE_POST_REQUEST;
// }
// export type LOAD_SINGLE_POST_SUCCESS = {
//     type: typeof LOAD_SINGLE_POST_SUCCESS;
//     data: PostState[];
// }
// export type LOAD_SINGLE_POST_FAILURE = {
//     type: typeof LOAD_SINGLE_POST_FAILURE;
// }

// export type LOAD_SEARCH_POSTS_REQUEST = {
//     type: typeof LOAD_SEARCH_POSTS_REQUEST;
// }
// export type LOAD_SEARCH_POSTS_SUCCESS = {
//     type: typeof LOAD_SEARCH_POSTS_SUCCESS;
//     data: PostState[];
// }
// export type LOAD_SEARCH_POSTS_FAILURE = {
//     type: typeof LOAD_SEARCH_POSTS_FAILURE;
// }
// export type UPDATE_START_END_PAGE = {
//     type: typeof UPDATE_START_END_PAGE;
// }
// export type CURRENT_PAGE_NUMBER = {
//     type: typeof CURRENT_PAGE_NUMBER;
// }
// export type UPLOAD_IMAGES_REQUEST = {
//     type: typeof UPLOAD_IMAGES_REQUEST;
// }
// export type UPLOAD_IMAGES_SUCCESS = {
//     type: typeof UPLOAD_IMAGES_SUCCESS;
//     data: PostState[];
// }
// export type UPLOAD_IMAGES_FAILURE = {
//     type: typeof UPLOAD_IMAGES_FAILURE;
// }
// export type REMOVE_IMAGE = {
//     type: typeof REMOVE_IMAGE;
// }


// 액션 생성 함수

// export type addPostRequestType = {
//     type: typeof ADD_POST_REQUEST,
//     data: FormData
// }
// export type AsyncState<T> = {
//     type: typeof REMOVE_POST_SUCCESS,
//     data: T,
// }

export const addPostRequestAction = ( formData: FormData ) => ({
    type: ADD_POST_REQUEST,
    data: formData,
})
export const addPostSuccessAction = ( data: string ) => ({
    type: ADD_POST_SUCCESS,
    data
})
export const addPostFailureAction = () => ({
    type: ADD_POST_FAILURE,
})

export const postResetDoneAction = () => ({
    type: POST_RESET_DONE,
})
export const postDeleteDoneAction = () => ({
    type: POST_DELETE_DONE,
})

export const removePostRequestAction = () => ({
    type: REMOVE_POST_REQUEST,
})
export const removePostSuccessAction = ( data ) => ({
    type: REMOVE_POST_SUCCESS,
    data
})
export const removePostFailureAction = () => ({
    type: REMOVE_POST_FAILURE,
})

export const loadMainPostRequestAction = () => ({
    type: LOAD_MAIN_POSTS_REQUEST,
})
export const loadMainPostSuccessAction = ( data: any ) => ({
    type: LOAD_MAIN_POSTS_SUCCESS,
    data: data.posts
})
export const loadMainPostFailureAction = () => ({
    type: LOAD_MAIN_POSTS_FAILURE,
})

export const loadSearchPostsRequestAction = () => ({
    type: LOAD_SEARCH_POSTS_REQUEST,
})
export const loadSearchPostsSuccessAction = ( data: string[] ) => ({
    type: LOAD_SEARCH_POSTS_SUCCESS,
    data
})
export const loadSearchPostsFailureAction = () => ({
    type: LOAD_SEARCH_POSTS_FAILURE,
})

export const loadSinglePostRequestAction = () => ({
    type: LOAD_SINGLE_POST_REQUEST,
})
export const loadSinglePostSuccessAction = ( data: any ) => ({
    type: LOAD_SINGLE_POST_SUCCESS,
    data: data.posts
})
export const loadSinglePostFailureAction = () => ({
    type: LOAD_SINGLE_POST_FAILURE,
})

export const uploadImagesRequestAction = ( imageFormData: FormData ) => ({
    type: UPLOAD_IMAGES_REQUEST,
    data: imageFormData,
})
export const currentPageNumberAction = ( val: number ) => ({
    type: CURRENT_PAGE_NUMBER,
    payload: val,
})
export const updateStartEndPageAction = ( start: number, end: number ) => ({
    type: UPDATE_START_END_PAGE,
    payload: { start, end },
})