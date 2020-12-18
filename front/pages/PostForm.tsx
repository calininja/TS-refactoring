import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserRequestAction } from '../reducers/user/actions';
import { 
    removeImageAction,
    addPostRequestAction,
    uploadImagesRequestAction
} from '../reducers/post/actions';
import { END } from 'redux-saga';
import wrapper, { SagaStore } from '../store/configureStore';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const PostForm: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const { imagePaths, postAdded } = useSelector( ( state: RootState ) => state.post);
    const imageInput:React.MutableRefObject<HTMLInputElement> = useRef();

    useEffect(() => {
        if ( postAdded ) {
            // 포스트 작성 완료 시 홈 이동 및 제목/내용 리셋.
            Router.push('/');
            setTitle('');
            setContent('');
        }
    }, [ postAdded ]);

    const onSubmit = useCallback(( e: React.FormEvent<HTMLFormElement> ) => {
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
        formData.append( 'title', title );
        formData.append( 'content', content );
        console.log( title, content, formData );
        dispatch(addPostRequestAction( formData ));
    }, [ title, content, imagePaths ]);

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle( e.target.value );
    }, []);
    const onChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent( e.target.value );
    }, []);

    const onChangeImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log( e.target.files );
        const imageFormData: FormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append( 'image', f );
        });
        dispatch(uploadImagesRequestAction( imageFormData ));
    }, []);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback(index => () => {
        dispatch(removeImageAction( index ));
    }, []);

    return (
        <>
            <form action="" onSubmit={onSubmit} className="postForm__container" encType="multipart/form-data">
                <textarea name="title" placeholder="제목" cols={93} rows={1.5} value={title} onChange={onChangeTitle}/>
                <div>
                    <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
                    <button type="button" className="imageUploadButton" onClick={onClickImageUpload}><img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt=""/></button>
                </div>
                <div>
                    <textarea name="content" title="내용 입력" cols={93} rows={28} value={content} onChange={onChangeContent}/>
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps( async( context ) => {
    const cookie = context.req ? context.req.headers.cookie : '';

    if ( context.req && cookie ) axios.defaults.headers.Cookie = cookie;
    context.store.dispatch(loadUserRequestAction());
    context.store.dispatch(END);
    await (context.store as SagaStore).sagaTask.toPromise();
    return { props: {
        pathname: '/PostForm',
    } };
});
// getInitialProps
// PostForm.getInitialProps = async ( context ) => {
//     const { pathname } = context;
//     return { pathname }
// };


export default PostForm;