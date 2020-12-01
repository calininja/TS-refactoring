import React from 'react';
import { loadUserRequestAction, LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'

const Profile:React.FunctionComponent = () => {
    return (
        <>
            <div>
                이름: 서영규
            </div>
            <div>
                직업: 풀스택 개발자인척하는 백엔드 개발자가 장래희망인 프론트엔드 개발자
            </div>
            <div>
                
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps( async ( context: object | any ) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context.query);
    console.log('pathname');
    if ( context.req && cookie ) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadUserRequestAction())
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {
        pathname: '/profile',
    } };
})
// getInitialProps
// Profile.getInitialProps = async ( context ) => {
// const { pathname } = context;
// console.log(pathname);
// console.log('pathname');
// return { pathname};
// };
  

export default Profile;