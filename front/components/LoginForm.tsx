import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import Link from 'next/link';
import { loginRequestAction } from '../reducers/user';
import { useInput } from "../pages/signup";


const LoginForm: React.FunctionComponent = () => {
    const [ id, onChangeId ] = useInput("");
    const [ password, onChangePassword ] = useInput("");
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        dispatch(loginRequestAction<string, string>( id, password ));
    },[id, password])


    return (
        <form onSubmit={onSubmitForm} className="loginForm__container">
            <div className="identity">
                아이디
                <input type="text" value={id} onChange={onChangeId} required className="custom-input"/>
            </div>
            <div className="password">
                비밀번호
                <input type="password" value={password} onChange={onChangePassword} required className="custom-input"/>
            </div>
            <div className="buttons">
                <button type="submit" className="custom-button">로그인</button>
                <Link href="/signup"><a><button className="custom-button">회원가입</button></a></Link>
            </div>
        </form>
    );
};

export default LoginForm;