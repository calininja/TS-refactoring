import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SINGLE_POST_REQUEST, modifyPostRequestAction } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper, { SagaStore } from '../../store/configureStore';
import { RootState } from '../../reducers';
import { GetServerSideProps } from 'next';
import Router from 'next/router';

const modify:React.FunctionComponent = ( postId ) => {
  const { singlePost } = useSelector( (state: RootState) => state.post);
  const router = useRouter();
  const { id }: any = router.query;
  const postId2 = postId;
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const { imagePaths, postAdded, postModify } = useSelector( ( state:RootState ) => state.post);
  // const imageInput:React.MutableRefObject<HTMLInputElement> = useRef();

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle( e.target.value );
  }, []);
  const onChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent( e.target.value );
  }, []);

  const modifyPost = useCallback(( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault();
      // const result = {title, content};
      dispatch(modifyPostRequestAction(title, content, id));

  }, [title, content, id ]);

  useEffect(() => {
      if ( postAdded ) {
          // 포스트 작성 완료 시 홈 이동 및 제목/내용 리셋.
          Router.push('/');
          setTitle('');
          setContent('');
      }
  }, [ postAdded ]);
  useEffect(() => {
    if ( postModify ) {
        // 포스트 작성 완료 시 홈 이동 및 제목/내용 리셋.
        router.push('/');
    }
  }, [ postModify ]);
  return (
    <>
      <form onSubmit={modifyPost} className="postForm__container">
          <textarea name="title" placeholder="제목" cols={93} rows={1.5} value={title || (singlePost && singlePost.title)} onChange={onChangeTitle}/>
          {/* <div>
              <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
              <button type="button" className="imageUploadButton" onClick={onClickImageUpload}><img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt=""/></button>
          </div> */}
          <div>
              <textarea name="content" title="내용 입력" cols={93} rows={28} value={content || (singlePost && singlePost.content)} onChange={onChangeContent}/>
          </div>
          <div>
              <button type="submit" className="submitButton custom-button">제출하기</button>
          </div>
          {/* <div>
              {imagePaths.map(( v, i ) => (
                  <div key={v}>
                      <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                      <div>
                          <button className="custom-button" onClick={onRemoveImage(i)}>제거</button>
                      </div>
                  </div>
              ))}
          </div> */}
      </form>
    </>
  );
};


export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps( async( context ) => {
  const { id } = context.params;
  const cookie = context.req ? context.req.headers.cookie : '';
  if ( context.req && cookie ) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: id,
  });
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
  return { props: {
    pathname: '/post',
  } };
});

export default modify;