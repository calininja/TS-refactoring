import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from '../reducers/user';
import Router from 'next/router';
import { RootState } from '../reducers';
const UserProfile: React.FunctionComponent = () => {

    const { me } = useSelector( ( state: RootState ) => state.user );
    const dispatch = useDispatch();
    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
        Router.push( '/' );
    },[])
    return (
        <div className="userProfile__container">
         <div className="identification">{ me.userId }</div>
         <div className="logOut"><button onClick={onLogOut} className="custom-button">로그아웃</button></div>
        </div>
    );
};

export default UserProfile;