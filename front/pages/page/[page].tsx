import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';
import { LOAD_MAIN_POSTS_REQUEST, UPDATE_START_END_PAGE } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { RootState } from '../../reducers';
import { GetServerSideProps, InferGetServerSidePropsType  } from 'next';

type State = {
  item: string | number | string[] | number[];
}

const Page:React.FunctionComponent<State> = () => {
  // const dispatch = useDispatch();
  const { mainPosts } = useSelector( ( state:RootState ) => state.post );
  const router = useRouter();
  const { page } = router.query;
  return (
    <>
      {mainPosts.map((item) => {
          return (
            <Title key={item.id} post={item} />
          );
      })}
    </>
  );
};

export const getServerSideProps:GetServerSideProps  = wrapper.getServerSideProps( async( context:any ) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const { page } = context.params;

  if ( context.req && cookie ) {
      axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
      type: LOAD_USER_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
    offset: (page-1)*10,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {
    pathname: '/page',
  } };
});


// // getInitialProps
// Page.getInitialProps = async ( context ) => {
//   const { page } = context.query;
//   context.store.dispatch({
//     type: LOAD_MAIN_POSTS_REQUEST,
//     offset: (page-1)*10,
//   });
//   // return { page: parseInt( page, 10)};
// };

Page.propTypes = {
  // goto: PropTypes.number.isRequired,
};

export default Page;