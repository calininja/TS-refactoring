import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';
import { useRouter } from 'next/router'
import { loadSearchPostsRequestAction, LOAD_SEARCH_POSTS_REQUEST } from '../../reducers/post';
import { loadUserRequestAction, LOAD_USER_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper, { SagaStore } from '../../store/configureStore';
import { RootState } from '../../reducers';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { keyword } = router.query;
  const { mainPosts, hasMorePost } = useSelector( (state: RootState) => state.post );
  const seeMore = useCallback(() => {
      if ( hasMorePost ) {
        dispatch({
          type: LOAD_SEARCH_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length -1].id,
          data: keyword,
        })
      }
  },[ hasMorePost ])

  return (
    <div>
      { mainPosts.map((item) => {
            return (
                <Title key={item.id} post={item} keyword={keyword}/> 
            );
        }) }
      { hasMorePost ?
        <button onClick={seeMore} className="morePost">더 보기 +</button>
        :
        ''
      }
    </div>
  );
};


export const getServerSideProps = wrapper.getServerSideProps( async( context ) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const state = context.store.getState();
  const { keyword } = context.query;

  if ( context.req && cookie ) axios.defaults.headers.Cookie = cookie;
  if ( !state.user.me ) context.store.dispatch(loadUserRequestAction());
  context.store.dispatch(loadSearchPostsRequestAction(keyword));
  context.store.dispatch( END );
  await (context.store as SagaStore).sagaTask.toPromise();
  return { props: {
    pathname: '/search',
  } };
});

export default Search;