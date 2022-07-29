import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

/**
 *
 * @returns all middlewares needed for the development
 */
const getDevMiddlewares = () => {
    // if (process.env.REACT_APP_ENABLE_REDUX_LOG === `true`) {
    //     const { createLogger } = require(`redux-logger`);
    //     const logger = createLogger();
    //     return [logger];
    // }

    // only development
    const logger = createLogger();
    return [logger];
};

/**
 * Setup middleware
 *
 * This must be run after the [redux#applyMiddleware] function
 */
export const setupMiddleware = () => {
    sagaMiddleware.run(rootSaga);
};

const middleware = [sagaMiddleware, ...getDevMiddlewares()];

export default middleware;
