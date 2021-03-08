import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { loadUserRequestAction, signUpDoneAction } from '../reducers/user';
import { RootState } from '../reducers';
import { signUpRequestAction } from '../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper, { SagaStore } from '../store/configureStore';
import { GetServerSideProps } from 'next';

// 커스텀 훅
export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
};

const signup: React.FunctionComponent = () => {
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState();
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const { signUpErrorReason, isSignedUp } = useSelector((state: RootState) => state.user);
    // const { isSigningUp } = useSelector( state => state.user );

    // 커스텀 훅으로 코드 줄임
    // const [ id, setId ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const [ passwordCheck, setPasswordCheck ] = useState('');
    // const [ term, setTerm ] = useState('');
    // const onChangeId = e => {
    //     setId(e.target.value);
    // };
    // const onChangePassword = e => {
    //     setPassword(e.target.value);
    // };
    // const onChangePasswordCheck = e => {
    //     setPasswordCheck(e.target.value);
    // };
    // const onChangeTerm = e => {
    //     setTerm(e.target.value);
    // };

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        // 패스워드 & 약관 체크
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch(signUpRequestAction<string, string>(id, password));
    }, [id, password, passwordCheck, term])

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, [])
    useEffect(() => {
        if (signUpErrorReason) {
            alert('이미 사용중인 아이디입니다.');
            dispatch(signUpDoneAction())
        }
        if (isSignedUp) {
            alert("회원가입 했으니 메인페이지로 이동합니다.");
            Router.push("/");
            dispatch(signUpDoneAction())
        }
    }, [signUpErrorReason, isSignedUp]);

    return <>
        <div className="signup__container">
            <form onSubmit={onSubmit}>
                <div>아이디
                    <input type="text" value={id} required onChange={onChangeId} className="custom-input" />
                </div>
                <div>비밀번호
                    <input type="password" value={password} required onChange={onChangePassword} className="custom-input" />
                </div>
                <div>비밀번호 확인
                    <input type="password" value={passwordCheck} required onChange={onChangePasswordCheck} className="custom-input" />
                </div>
                {passwordError && (
                    <div className="invalid">비밀번호가 일치하지 않습니다.</div>
                )}
                <div className="term">
                    <label htmlFor="term__check">
                        <input type="checkbox" name="" value={term} required onChange={onChangeTerm} id="term__check"></input>
                        약관에 동의합니다.
                    </label>
                    {termError &&
                        <div>약관에 동의하셔야 합니다.</div>
                    }
                </div>
                <button type="submit" className="custom-button">가입하기</button>
            </form>
        </div>
    </>
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    const state = context.store.getState();

    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.user.me) context.store.dispatch(loadUserRequestAction());
    context.store.dispatch(END);
    await (context.store as SagaStore).sagaTask.toPromise();
    return {
        props: {
            pathname: '/signup',
        }
    };
})

export default signup;