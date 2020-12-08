import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';
import reducer, { RootState } from '../reducers';
import rootSaga from '../sagas';

export interface SagaStore extends Store {
  sagaTask: Task;
  err: {
    statusCode: Error;
  };
}

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore: MakeStore<RootState> = ( context: Context ) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  // ( store as SagaStore ).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;