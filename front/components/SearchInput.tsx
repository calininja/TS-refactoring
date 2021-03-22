import * as React from 'react';
import { useRef, useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';

const SearchInput = () => {
  const enterRef: React.MutableRefObject<HTMLInputElement> = useRef();
  const [keyword, setKeyword] = useState("");
  const onChangeSearch = useCallback((e) => {
    setKeyword(e.target.value);
  }, [keyword])

  return (
    <div className="search">
      <input type="text" placeholder="검색어를 입력해주세요."
        className="custom-input" value={keyword}
        onChange={onChangeSearch}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          event.key == "Enter" ? enterRef.current.click() : '';
        }}
      />
      <Link
        href={'/search/[keyword]'}
        as={`/search/${keyword}`}
      >
        <button className="custom-button" ref={enterRef} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          setKeyword('');
        }}>검색</button>
      </Link>
    </div>
  );
};

export default SearchInput;