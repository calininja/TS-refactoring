import { all, fork, takeLatest, put, call, throttle, takeEvery }  from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    MODIFY_POST_REQUEST,
    MODIFY_POST_SUCCESS,
    MODIFY_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    LOAD_SINGLE_POST_REQUEST,
    LOAD_SINGLE_POST_SUCCESS,
    LOAD_SINGLE_POST_FAILURE,
    LOAD_SEARCH_POSTS_REQUEST,
    LOAD_SEARCH_POSTS_SUCCESS,
    LOAD_SEARCH_POSTS_FAILURE,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    // 액션 생성 함수
    addPostRequestAction,
    removePostRequestAction,
    modifyPostRequestAction,
    loadMainPostRequestAction,
    loadSinglePostRequestAction,
    loadSearchPostsRequestAction,
    uploadImagesRequestAction,
} from '../reducers/post/actions';

function addPostAPI( postData ) {
    return axios.post('/post', postData, {
        withCredentials: true,
    })
}
function* addPost( action: ReturnType<typeof addPostRequestAction> ) {
    try {
        const result = yield call(addPostAPI, action.data);
        // throw (new Error("Something went wrong"));
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function modifyPostAPI( modify ) {
    return axios.patch(
        "/post/modify",
        { modify },
        {
            withCredentials: true,
        }
    );
}
function* modifyPost( action: ReturnType<typeof modifyPostRequestAction> ) {
    try {
        const result = yield call(modifyPostAPI, action.data);
        yield put({
            type: MODIFY_POST_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        yield put({
            type: MODIFY_POST_FAILURE,
            error: e,
        });
    }
}
function* watchmodifyost() {
    yield takeLatest(MODIFY_POST_REQUEST, modifyPost);
}
function removePostAPI( postId ) {
    return axios.delete(`/post/${postId}`, {
      withCredentials: true,
    });
}
function* removePost( action: ReturnType<typeof removePostRequestAction> ) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
        type: REMOVE_POST_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
        type: REMOVE_POST_FAILURE,
        error: e,
        });
    }
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function loadMainPostsAPI( lastId = 0, limit = 10, offset = 0 ) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}&offset=${offset}`);
}
function* loadMainPosts( action: ReturnType<typeof loadMainPostRequestAction> ) {
    try {
        const result = yield call(loadMainPostsAPI, action.lastId, action.limit, action.offset);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        });
    }
}
function* watchLoadMainPosts() {
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}
function loadSinglePostAPI( postId ) {
    return axios.get(`/post/${postId}`);
}
function* loadSinglePost( action: ReturnType<typeof loadSinglePostRequestAction> ) {
    try {
        const result = yield call(loadSinglePostAPI, action.data);
        yield put({
        type: LOAD_SINGLE_POST_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        yield put({
        type: LOAD_SINGLE_POST_FAILURE,
        error: e,
        });
    }
}
function* watchLoadSinglePost() {
    yield takeLatest(LOAD_SINGLE_POST_REQUEST, loadSinglePost);
}
function loadSearchPostsAPI( keyword, lastId ) {
    return axios.get(`/search/${encodeURIComponent(keyword)}?lastId=${lastId}&limit=10`);
}
function* loadSearchPosts( action: ReturnType<typeof loadSearchPostsRequestAction> ) {
    try {
        const result = yield call(loadSearchPostsAPI, action.data, action.lastId);
        yield put({
        type: LOAD_SEARCH_POSTS_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        yield put({
        type: LOAD_SEARCH_POSTS_FAILURE,
        error: e,
        });
    }
}
function* watchLoadSearchPost() {
    yield takeLatest(LOAD_SEARCH_POSTS_REQUEST, loadSearchPosts);
}
function uploadImagesAPI( formData ) {
    return axios.post('/post/images', formData, {
        withCredentials: true,
    });
} 
function* uploadImages( action: ReturnType<typeof uploadImagesRequestAction> ) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
        type: UPLOAD_IMAGES_FAILURE,
        error: e,
        });
    }
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchLoadMainPosts),
        fork(watchLoadSinglePost),
        fork(watchLoadSearchPost),
        fork(watchUploadImages),
        fork(watchmodifyost),
    ]);
}