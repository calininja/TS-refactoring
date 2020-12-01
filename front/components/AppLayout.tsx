import React from 'react';
import Link from 'next/link';
import UserProfile from '../components/UserProfile';
import LoginForm from './LoginForm';
import SearchInput from './SearchInput';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';


const AppLayout: React.FunctionComponent = ({ children }) => {
  const { me } = useSelector( (state: RootState) => state.user );

  return (
    <>
      <header className="navigation" role="header">
        <div className="home"><Link href="/"><a>HOME</a></Link></div>
        <div className="profile"><Link href="/profile"><a>프로필</a></Link></div>
        <SearchInput  />
      </header>
      <section className="content">
        <div className="privateMenu">
          { me
            ? <UserProfile />
            : <LoginForm />
          }
        </div>
        <div className="main" role="main">
          {children}
        </div>
      </section>
    </>
  );
};

export default AppLayout;
