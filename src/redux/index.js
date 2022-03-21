import { createReducer } from 'react-use';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const useThunkReducer = createReducer(thunk, logger);

function reducer (state, action) {
  switch (action.type) {
    case 'init':
      return { count: 50, class: 'active' };
    case 'increment':
      return { count: state.count + 10, class: 'active' };
    case 'done':
      return { count: 100, class: 'success' };
    default:
      throw new Error();
  }
}

export {
  useThunkReducer,
  reducer
}
