// import React, { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import Title from '../components/Title';
import { 
    LOAD_MAIN_POSTS_REQUEST,
    CURRENT_PAGE_NUMBER,
    UPDATE_START_END_PAGE,
    POST_RESET_DONE 
} from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import axios from 'axios';
import styled from 'styled-components';
import { RootState } from '../reducers';
import { GetServerSideProps } from 'next';


const Home:React.FunctionComponent = () => {
    // const { me } = useSelector( (state:RootState) => state.user );
    const { mainPosts } = useSelector( (state:RootState) => state.post );
    // const { mainPosts } = useSelector<RootState,PostState>( state => state.post );
    const dispatch = useDispatch();

    useEffect(() => {
        // 홈 이동 시 페이지네이션 리셋.
        const start = 0;
        const end = 10;
        dispatch({
            type: UPDATE_START_END_PAGE,
            payload:  { start, end }
        });
        // 홈 이동 시 이미지 리셋.
        dispatch({
            type: POST_RESET_DONE,
        })
    },[])

    return (
        <>
            <div>
                 { mainPosts.map((item) => {
                     return (
                         <Title key={item.id} post={item}/>
                     );
                 }) }
                 <Title2>test</Title2>
             </div>
        </>
    );
};
const Title2 = styled.div`
  color: red;
`;

export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps( async( context:any ) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    if ( context.req && cookie ) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    })
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    })
    context.store.dispatch({
        type: CURRENT_PAGE_NUMBER,
        payload: 1
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

// getInitialProps
// Home.getInitialProps = async ( context ) => {
//     // console.log(context);
//     context.store.dispatch({
//       type: LOAD_MAIN_POSTS_REQUEST,
//     });
//     context.store.dispatch({
//         type: CURRENT_PAGE_NUMBER,
//         payload: 1
//     });
// };

export default Home;