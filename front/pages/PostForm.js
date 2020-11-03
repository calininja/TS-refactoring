import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { 
    ADD_POST_REQUEST,
    UPLOAD_IMAGES_REQUEST,
    REMOVE_IMAGE,
} from '../reducers/post';

import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const PostForm = () => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const { imagePaths, postAdded } = useSelector(state => state.post);
    const imageInput = useRef();

    useEffect(() => {
        if ( postAdded ) {
            // 포스트 작성 완료 시 홈 이동 및 제목/내용 리셋.
            Router.push('/');
            setTitle('');
            setContent('');
        }
    }, [ postAdded ]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if ( !title || !title.trim()){
            return alert('제목을 작성하세요.');
        }
        if ( !content || !content.trim()){
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('title', title);
        formData.append('content', content);
        console.log(title, content, formData);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })
    }, [ title, content, imagePaths ]);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        });
    }, []);

    return (
        <>
            <form action="" onSubmit={onSubmit} className="postForm__container" encType="multipart/form-data">
                <textarea type="text" placeholder="제목" cols="93" rows="1.5" value={title} onChange={onChangeTitle}/>
                <div>
                    <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
                    <button type="button" className="imageUploadButton" onClick={onClickImageUpload}><img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt=""/></button>
                </div>
                <div>
                    <textarea type="text" name="content" title="내용 입력" cols="93" rows="28" value={content} onChange={onChangeContent}/>
                </div>
                <div>
                    <button type="submit" className="submitButton custom-button">제출하기</button>
                </div>
                <div>
                    {imagePaths.map(( v, i ) => (
                        <div key={v}>
                            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                            <div>
                                <button className="custom-button" onClick={onRemoveImage(i)}>제거</button>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps( async( context ) => {
    const cookie = context.req ? context.req.headers.cookie : '';

    if ( context.req && cookie ) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    })
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {
        pathname: '/PostForm',
    } };
});

// getInitialProps
// PostForm.getInitialProps = async ( context ) => {
//     const { pathname } = context;
//     return { pathname }
// };
PostForm.propTypes = {
    
}

export default PostForm;