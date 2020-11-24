import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import { LOAD_SINGLE_POST_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { NextRouter, useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { RootState } from '../../reducers';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';


const post:React.FunctionComponent = () => {
  const { singlePost } = useSelector( (state:RootState) => state.post);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      {singlePost ?
        <PostCard key={id} postId={id} /> :
      ''}
    </div>
  );
};


export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps( async( context:any ) => {
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
  await context.store.sagaTask.toPromise();
  return { props: {
    pathname: '/post',
  } };
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