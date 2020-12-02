import React, { useEffect, useCallback, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { postDeleteDoneAction, removePostRequestAction } from '../reducers/post';
import { RootState } from '../reducers';
// import Rating from './Rating';

type PostCardType = {
    postId: {id: number};
}

const PostCard: React.FunctionComponent<PostCardType> = memo(({ postId }:PostCardType) => {
    const { singlePost, postDeleted } = useSelector( (state: RootState) => state.post);
    const { me } = useSelector( (state:RootState) => state.user);
    const dispatch = useDispatch();
    
    const menuRef:React.MutableRefObject<HTMLButtonElement> = useRef();
    const deleteRef:React.MutableRefObject<HTMLDivElement> = useRef();
    const modifyRef:React.MutableRefObject<HTMLDivElement> = useRef();

    useEffect(() =>{ // 삭제 완료 => 스테이트 초기화(false)
        if( postDeleted ) {
            Router.push('/');
            dispatch(postDeleteDoneAction())
        }
    },[ postDeleted, singlePost ])

    const showMenu = useCallback(() => { // 메뉴창 토글
        if ( me.id === singlePost.User.id ) {
            const activated = menuRef.current.classList.contains('active');
            if ( !activated ) {
                menuRef.current.classList.add('active');
            } else {
                menuRef.current.classList.remove('active');
            } 
        } else {
            menuRef.current.classList.remove('active');
        }
    },[ me.id, singlePost.User.id ])

    const showDeleteConfirm = useCallback(() => {
        if (confirm("정말 삭제하시겠습니까??") == true){ // 삭제 확인
            dispatch(removePostRequestAction( postId ))
        }else{ //취소
            return false;
        }
    },[ postId.id ])

    // const dummy = [
    //     {
    //     image: 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
    //     id: 1,
    //     content: 'Lorem1',
    //     rating: 4
    //     },
    // ]
    
    return (
            <div className="postCard__container">
                <section className="head">
                    <div className="head__headLine">
                        { singlePost.title }
                    </div>
                    <button className="head__menu custom-button" ref={ menuRef } onClick={showMenu}>
                            ...
                            <div>
                                <div className="remove" ref={ deleteRef } onClick={showDeleteConfirm}>삭제</div>
                                <div className="cancel" ref={ modifyRef }>수정</div>
                            </div>
                    </button>
                </section>
                <div className="userName">
                    { singlePost.User.userId }
                </div>
                <div className="imageRenderer">
                { singlePost.Images && singlePost.Images[0] && <img src={ `http://localhost:3065/${singlePost.Images[0].src}` } style={{ maxWidth: '100%' }} alt=""/> }
                </div>
                <div className="contnetRenderer">
                    { singlePost.content }
                </div>

                {/* {dummy.map((v) => {
                    return(
                        <div>
                            <div><img src={v.image} alt=""/></div>
                            <div>{v.id}</div>
                            <div>{v.content}</div>
                            <Rating star={v.rating} />
                        </div>
                    )
                })} */}
            </div>

    );
});


export default PostCard;