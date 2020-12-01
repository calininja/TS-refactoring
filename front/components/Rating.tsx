import React, { useEffect } from 'react';
// import styled from 'styled-components';

type starPropType = {
  star: {
    image: string,
    id: number,
    content: string,
    rating: number,
  }
}

const Rating: React.FunctionComponent = ({ star }: starPropType) => {

  const active = [];
  const frame = [];
  for ( let i=0; i < 5+1; i++ ) {
      if ( i < star ) {
        active.push( i );
      }
      else if ( i > star ) {
        frame.push( i );
      }
  }

  return (
    <>
      {active.map( val  => (
        <em className='active frame' key={val}></em>
      ))}
      {frame.map( val  => (
        <em className='frame' key={val}></em>
      ))}
    </>
  );
};

export default Rating;