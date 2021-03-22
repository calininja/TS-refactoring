import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import { loadSinglePostRequestAction, LOAD_SINGLE_POST_REQUEST } from '../../reducers/post';
import { loadUserRequestAction, LOAD_USER_REQUEST } from '../../reducers/user';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper, { SagaStore } from '../../store/configureStore';
import { RootState } from '../../reducers';
import { GetServerSideProps } from 'next';

const post: React.FunctionComponent = () => {
  const { singlePost } = useSelector((state: RootState) => state.post);
  const router = useRouter();
  const { post }: any = router.query;

  useEffect(() => {
    console.log(post);
  }, [post])

  return (
    <div>
      {singlePost ?
        <PostCard key={post} postId={post} /> :
        ''}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { post } = context.params;
  const cookie = context.req ? context.req.headers.cookie : '';
  const state = context.store.getState();

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
  if (!state.user.me) context.store.dispatch(loadUserRequestAction());
  context.store.dispatch(loadSinglePostRequestAction(post));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
  return {
    props: {
      pathname: '/post',
    }
  };
});

// getInitialProps
// contentRender.getInitialProps = async ( context ) => {
//   const { postId } = context.query;
//   const { pathname } = context;
//   context.store.dispatch({
//     type: LOAD_SINGLE_POST_REQUEST,
//     data: postId,
//   });
//   return { postId: parseInt( postId, 10), pathname};
// };


export default post;