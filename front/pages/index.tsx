// import React, { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { useEffect } from 'react';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';
import wrapper, { SagaStore } from '../store/configureStore';
import axios from 'axios';
import {
    postResetDoneAction,
    loadMainPostRequestAction,
    currentPageNumberAction,
    updateStartEndPageAction
} from '../reducers/post/actions';
import { loadUserRequestAction } from '../reducers/user/actions';
import styled from 'styled-components';
import { useRouter } from 'next/router'


const Home: React.FunctionComponent = () => {
    const { mainPosts } = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch();
    const router = useRouter();
    const { keyword } = router.query;

    useEffect(() => {
        // 홈 이동 시 페이지네이션 리셋.
        const start: number = 0;
        const end: number = 10;
        dispatch(updateStartEndPageAction(start, end));
        // 홈 이동 시 이미지 리셋.
        dispatch(postResetDoneAction())
    }, [])

    return (
        <>
            <div>
                {mainPosts.map((item) => {
                    return (
                        <Title key={item.id} post={item} keyword={keyword} />
                    );
                })}
                {/* <Title2>test</Title2> */}
            </div>
        </>
    );
};
const Title2 = styled.div`
  color: red;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

    const state = context.store.getState();
    const isServer: boolean = !!context.req;
    const cookie = isServer ? context.req.headers.cookie : '';
    // console.log(context, '여기여기');

    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.user.me) context.store.dispatch(loadUserRequestAction());
    context.store.dispatch(loadMainPostRequestAction());
    context.store.dispatch(currentPageNumberAction(1));
    context.store.dispatch(END);
    await (context.store as SagaStore).sagaTask.toPromise();
    // await context.store.sagaTask.toPromise();
});

export default Home;