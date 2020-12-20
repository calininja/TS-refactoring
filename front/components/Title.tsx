import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

type TitlePropType = {
  post: {
    id?: number,
    title?: string,
    User?: {userId:number},
    createdAt?: string,
  };
  keyword?: any,
}

const Title: React.FunctionComponent<TitlePropType> = memo(({ post, keyword }: TitlePropType) => {
  const { me } = useSelector( (state: RootState) => state.user );
  const preventAccess = useCallback(() => {
    alert('로그인이 필요합니다.');
  },[])
  const postId = post.id;
  const reg = new RegExp('('+keyword+')');
  const keywordText = keyword;
  
  return (
    <>
        <div className="title__container">
            { me ?
              <Link
                href={'/post/[postId]'}
                as={`/post/${postId}`}
                key={postId}
                prefetch
              >
                <a className="link__item">
                  {
                    keyword ?
                    post.title.split(reg).map((v)=>{
                      if(v.match(keywordText)){
                        return(
                          <span className="highlights">
                            {v}
                          </span>
                        )
                      }
                      return v;
                    })
                    :
                    <span>
                      {post.title}
                    </span>                  
                  }
                </a>
              </Link>
              :
              <a className="link__item" onClick={preventAccess}>
                {post.title} 
              </a>
           }
            <span>
              <div>{post.User.userId}</div>
              <em>{post.createdAt.slice(0,10)}</em> 
              {/* <em>{post.createdAt.slice(0,10)} {post.createdAt.slice(11,19)}</em>  */}
            </span>
        </div>
    </>
  );
});

export default Title;