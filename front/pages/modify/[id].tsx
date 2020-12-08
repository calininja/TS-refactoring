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

const modify:React.FunctionComponent = () => {
  const { singlePost } = useSelector( (state: RootState) => state.post);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id }: any = router.query;
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const { imagePaths, postModify } = useSelector( ( state: RootState ) => state.post);
  // const imageInput:React.MutableRefObject<HTMLInputElement> = useRef();

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle( e.target.value );
  }, []);

  const onChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent( e.target.value );
  }, []);

  const modifyPost = useCallback(( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault();
      dispatch(modifyPostRequestAction(title, content, id));
      if ( postModify ) {
        router.push(`/post/${id}`);
      }
  }, [ title, content, id, postModify ]);



  return (
    <>
      <form onSubmit={modifyPost} className="postForm__container">
          <textarea name="title" cols={93} rows={1.5} value={ title || (singlePost && singlePost.title) } onChange={onChangeTitle}/>
          {/* <div>
              <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
              <button type="button" className="imageUploadButton" onClick={onClickImageUpload}><img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt=""/></button>
          </div> */}
          <div>
              <textarea name="content" cols={93} rows={28} value={ content || (singlePost && singlePost.content) } onChange={onChangeContent}/>
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