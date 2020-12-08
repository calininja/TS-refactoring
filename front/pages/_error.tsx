import React from 'react';
import PropTypes from 'prop-types';
import { GetServerSideProps } from 'next';
import wrapper, { SagaStore } from '../store/configureStore';

const MyError: React.FunctionComponent = ({ statusCode }: any) => {
  type contextError = {
    context: {
      err: Error;
    }
  }
  return (
    <div>
      <h1>{statusCode} 에러 발생</h1>
    </div>
  );
};

MyError.propTypes = {
  statusCode: PropTypes.number,
};

MyError.defaultProps = {
  statusCode: 400,
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps( async( context ) => {
  const statusCode = context.res ? context.res.statusCode : (context.store as SagaStore).err ? (context.store as SagaStore).err.statusCode : null;
  return { statusCode };
});
// MyError.getInitialProps = async (context) => {
//   const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : null;
//   return { statusCode };
// };

export default MyError;
