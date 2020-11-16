import produce from 'immer';
import onSubmit from '../pages/PostForm';
import onChangeImages from '../pages/PostForm';
import updateCurrentPage from '../components/Pagination';
import updateStartEndPage from '../components/Pagination';

export const initialState = {
    mainPosts: [],
    mainPostsAll: [],
    singlePost: null,
    postDeleted: false,
    imagePaths: [],
    addingPostErrorReason: '',
    isAddingPost: false,
    postAdded: false,
    postLoaded: false,
    
    // pagination
    start: 0,
    end: 10,
    current: 1,
}
export type PostState = {
    mainPosts: String[],
    mainPostsAll: String[],
    singlePost: null,
    postDeleted: boolean,
    imagePaths: String[],
    addingPostErrorReason: String,
    isAddingPost: boolean,
    postAdded: boolean,
    postLoaded: boolean,
    
    // pagination
    start: Number,
    end: Number,
    current: Number,
}

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

export type PostAction = 
| ReturnType<typeof onSubmit>
| ReturnType<typeof onChangeImages>
| ReturnType<typeof updateCurrentPage>
| ReturnType<typeof updateStartEndPage>


export const addPostRequestAction = ( formData ) => ({
    type: ADD_POST_REQUEST,
    data: formData,
})
export const uploadImagesRequestAction = ( imageFormData ) => ({
    type: UPLOAD_IMAGES_REQUEST,
    data: imageFormData,
})

export const currentPageNumberAction = ( val ) => ({
    type: CURRENT_PAGE_NUMBER,
    payload: val,
})
export const updateStartEndPageAction = ( start, end ) => ({
    type: UPDATE_START_END_PAGE,
    payload: { start, end },
})



export default ( state:PostState = initialState, action: PostAction ):PostState => {
    return produce ( state, (draft) => {
        switch (action.type) {

            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                draft.mainPosts = [action.data, ...state.mainPosts]
                draft.postAdded = true;
                break;
            }
            case ADD_POST_FAILURE: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case REMOVE_POST_REQUEST: {
                break;
            }
            case REMOVE_POST_SUCCESS: {
                const index = draft.mainPosts.findIndex(v => v.id === action.data);
                draft.mainPosts.splice(index, 1);
                draft.postDeleted = true;
                break;
            }
            case REMOVE_POST_FAILURE: {
                break;
            }
            case POST_RESET_DONE: {
                draft.imagePaths = [];
            }
            case POST_DELETE_DONE: {
                draft.postDeleted = false;
                break;
            }
            case LOAD_MAIN_POSTS_REQUEST:{
                draft.mainPosts = [];
                draft.postAdded = false;
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS: {
                draft.mainPosts = action.data.posts;
                draft.mainPostsAll = action.data.postsAll.length;
                break;
            }
            case LOAD_MAIN_POSTS_FAILURE:{
                break;
            }
            case LOAD_SINGLE_POST_REQUEST: {
                break;
            }
            case LOAD_SINGLE_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }
            case LOAD_SINGLE_POST_FAILURE: {
                break;
            }
            case LOAD_SEARCH_POSTS_REQUEST: {
                draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_SEARCH_POSTS_SUCCESS: {
                action.data.forEach((d) => {
                    draft.mainPosts.push(d);
                });
                draft.hasMorePost = action.data.length === 10;
                break;
            }
            case LOAD_SEARCH_POSTS_FAILURE: {
                break;
            }

            case UPDATE_START_END_PAGE: {
                draft.start = action.payload.start;
                draft.end = action.payload.end;
                // draft.current = action.payload.start;
                break;
            }
            case CURRENT_PAGE_NUMBER: {
                draft.current = action.payload;
                break;
            }
            case UPLOAD_IMAGES_REQUEST: {
                break;
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.imagePaths.push(p);
                });
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }
            case REMOVE_IMAGE: {
                const index = draft.imagePaths.findIndex((v, i) => i === action.index);
                draft.imagePaths.splice(index, 1);
                break;
            }
            default: {
                break;
            }
        }
    });
};