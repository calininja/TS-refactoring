import * as React from 'react';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { loadMainPostRequestAction } from '../../reducers/post';
import { loadUserRequestAction } from '../../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper, { SagaStore } from '../../store/configureStore';
import Title from '../../components/Title';
import { RootState } from '../../reducers';
import { GetServerSideProps } from 'next';

const Page: React.FunctionComponent = () => {
  const { mainPosts } = useSelector((state: RootState) => state.post);
  const router = useRouter();
  // const { page, keyword } = router.query;
  return (
    <>
      {mainPosts.map((item) => {
        return (
          <Title key={item.id} post={item} />
          // <Title key={item.id} post={item} keyword={keyword} />
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const { page }: any = context.params;
  const getPage = (page - 1) * 10;
  const state = context.store.getState();

  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
  if (!state.user.me) context.store.dispatch(loadUserRequestAction());
  // context.store.dispatch(loadUserRequestAction());
  context.store.dispatch(loadMainPostRequestAction(getPage));
  // context.store.dispatch({
  //     type: LOAD_USER_REQUEST,
  // })
  // context.store.dispatch({
  //   type: LOAD_MAIN_POSTS_REQUEST,
  //   offset: (page-1)*10,
  // });
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
  return {
    props: {
      pathname: '/page',
    }
  };
});

export default Page;