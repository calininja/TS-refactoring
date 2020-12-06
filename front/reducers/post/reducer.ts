import produce from 'immer';
import { PostState, PostAction } from './types';
import { 
  ADD_POST_FAILURE, 
  ADD_POST_REQUEST, 
  ADD_POST_SUCCESS, 

  POST_RESET_DONE,
  POST_DELETE_DONE,

  LOAD_MAIN_POSTS_FAILURE, 
  LOAD_MAIN_POSTS_REQUEST, 
  LOAD_MAIN_POSTS_SUCCESS,

  LOAD_SINGLE_POST_REQUEST,
  LOAD_SINGLE_POST_SUCCESS,
  LOAD_SINGLE_POST_FAILURE,

  REMOVE_POST_FAILURE, 
  REMOVE_POST_REQUEST, 
  REMOVE_POST_SUCCESS,

  UPDATE_START_END_PAGE,
  CURRENT_PAGE_NUMBER,
  
  LOAD_SEARCH_POSTS_REQUEST,
  LOAD_SEARCH_POSTS_SUCCESS,
  LOAD_SEARCH_POSTS_FAILURE,

  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE,

  MODIFY_POST_REQUEST,
  MODIFY_POST_SUCCESS,
  MODIFY_POST_FAILURE,
  
} from './actions';

export const initialState: PostState = {
  mainPosts: [],
  mainPostsAll: null,
  singlePost: null,
  postDeleted: false,
  imagePaths: [],
  addingPostErrorReason: null,
  isAddingPost: false,
  postAdded: false,
  postLoaded: false,
  start: 0, // pagination
  end: 10,
  current: 1,
  hasMorePost: false,
}

export default ( state: PostState = initialState, action: PostAction ): PostState => {
  return produce ( state, (draft) => {
      switch ( action.type ) {

          case ADD_POST_REQUEST: {
              draft.isAddingPost = true;
              draft.addingPostErrorReason = null;
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
              draft.addingPostErrorReason = null;
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
          case MODIFY_POST_REQUEST: {
              break;
          }
          case MODIFY_POST_SUCCESS: {
            const index = draft.mainPosts.findIndex(v => v.id === action.data);
            draft.mainPosts.splice(index, 1);
            draft.postDeleted = true;
              break;
          }
          case MODIFY_POST_FAILURE: {
              break;
          }
          default: {
              break;
          }
      }
  });
};